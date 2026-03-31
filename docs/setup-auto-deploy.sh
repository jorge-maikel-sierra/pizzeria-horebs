#!/bin/bash
# ==============================================================================
# Setup Auto-Deploy para Pizzería Horeb's en Hostinger
#
# Este script configura un cron job que:
# 1. Hace git pull cada 2 minutos
# 2. Si hay cambios nuevos, ejecuta deploy.sh automáticamente
# 3. Restaura wp-config.php y .htaccess si fueron alterados
#
# USO: Ejecutar UNA VEZ en el servidor Hostinger vía SSH:
#   ssh -p 65002 u613240431@88.223.85.198
#   bash ~/domains/pizzeriahorebs.shop/public_html/docs/setup-auto-deploy.sh
# ==============================================================================

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[SETUP]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

PUBLIC_HTML="${HOME}/domains/pizzeriahorebs.shop/public_html"
DEPLOY_SCRIPT="${PUBLIC_HTML}/deploy.sh"
AUTO_DEPLOY_SCRIPT="${HOME}/auto-deploy.sh"
DEPLOY_LOG="${HOME}/auto-deploy.log"

# ─── Verificaciones ──────────────────────────────────────────────────────────
log "Verificando entorno..."

if [ ! -d "${PUBLIC_HTML}/.git" ]; then
    error "No se encontró repositorio Git en ${PUBLIC_HTML}"
    exit 1
fi

if [ ! -f "${DEPLOY_SCRIPT}" ]; then
    error "No se encontró deploy.sh en ${PUBLIC_HTML}"
    exit 1
fi

log "✅ Repo Git encontrado"
log "✅ deploy.sh encontrado"

# ─── Guardar backup permanente del .htaccess de producción ────────────────────
if [ ! -f "${HOME}/htaccess-prod-backup" ] && [ -f "${PUBLIC_HTML}/.htaccess" ]; then
    cp "${PUBLIC_HTML}/.htaccess" "${HOME}/htaccess-prod-backup"
    log "✅ Backup permanente de .htaccess creado en ~/htaccess-prod-backup"
elif [ -f "${HOME}/htaccess-prod-backup" ]; then
    log "✅ Backup permanente de .htaccess ya existe"
fi

# ─── Crear script de auto-deploy ─────────────────────────────────────────────
log "Creando script de auto-deploy..."

cat > "${AUTO_DEPLOY_SCRIPT}" << 'SCRIPT'
#!/bin/bash
# Auto-deploy: git pull + deploy.sh si hay cambios
# Ejecutado por cron cada 2 minutos

PUBLIC_HTML="${HOME}/domains/pizzeriahorebs.shop/public_html"
LOCK_FILE="/tmp/pizzeria-auto-deploy.lock"
LOG_FILE="${HOME}/auto-deploy.log"

# Evitar ejecuciones concurrentes
if [ -f "${LOCK_FILE}" ]; then
    LOCK_AGE=$(( $(date +%s) - $(stat -c%Y "${LOCK_FILE}" 2>/dev/null || stat -f%m "${LOCK_FILE}" 2>/dev/null || echo "0") ))
    if [ "${LOCK_AGE}" -lt 300 ]; then
        exit 0  # Otra instancia corriendo (< 5 min)
    fi
    rm -f "${LOCK_FILE}"  # Lock viejo, limpiar
fi

touch "${LOCK_FILE}"
trap "rm -f ${LOCK_FILE}" EXIT

cd "${PUBLIC_HTML}" || exit 1

# Guardar el hash actual
OLD_HEAD=$(git rev-parse HEAD 2>/dev/null)

# Backup de archivos de producción ANTES del fetch+reset
[ -f wp-config.php ] && cp wp-config.php /tmp/.wp-config-pre-deploy
[ -f .htaccess ] && cp .htaccess /tmp/.htaccess-pre-deploy

# Fetch + reset --hard (robusto: no falla con untracked files como --ff-only)
FETCH_OUTPUT=$(git fetch origin main 2>&1)
FETCH_EXIT=$?

if [ "${FETCH_EXIT}" -ne 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR en git fetch: ${FETCH_OUTPUT}" >> "${LOG_FILE}"
    rm -f /tmp/.wp-config-pre-deploy /tmp/.htaccess-pre-deploy
    exit 1
fi

REMOTE_HEAD=$(git rev-parse origin/main 2>/dev/null)

# Solo actuar si hay cambios nuevos
if [ "${OLD_HEAD}" != "${REMOTE_HEAD}" ]; then
    # Reset hard al nuevo commit (sobrescribe todo incluyendo untracked conflicts)
    RESET_OUTPUT=$(git reset --hard origin/main 2>&1)
    RESET_EXIT=$?
    
    NEW_HEAD=$(git rev-parse HEAD 2>/dev/null)
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deploy: ${OLD_HEAD:0:8} → ${NEW_HEAD:0:8}" >> "${LOG_FILE}"
    
    if [ "${RESET_EXIT}" -ne 0 ]; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR en git reset: ${RESET_OUTPUT}" >> "${LOG_FILE}"
        exit 1
    fi
    
    # Restaurar wp-config.php (NUNCA debe venir de Git)
    if [ -f /tmp/.wp-config-pre-deploy ]; then
        cp /tmp/.wp-config-pre-deploy "${PUBLIC_HTML}/wp-config.php"
        chmod 600 "${PUBLIC_HTML}/wp-config.php"
    elif [ ! -f "${PUBLIC_HTML}/wp-config.php" ]; then
        LATEST_CONFIG=$(ls -t "${PUBLIC_HTML}/../deploy-backups"/wp-config.php.* 2>/dev/null | head -1)
        if [ -n "${LATEST_CONFIG}" ]; then
            cp "${LATEST_CONFIG}" "${PUBLIC_HTML}/wp-config.php"
            chmod 600 "${PUBLIC_HTML}/wp-config.php"
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] wp-config.php restaurado desde backup" >> "${LOG_FILE}"
        fi
    fi
    
    # Restaurar .htaccess de producción (tiene reglas LiteSpeed + redirects)
    if [ -f "${HOME}/htaccess-prod-backup" ]; then
        cp "${HOME}/htaccess-prod-backup" "${PUBLIC_HTML}/.htaccess"
    elif [ -f /tmp/.htaccess-pre-deploy ]; then
        cp /tmp/.htaccess-pre-deploy "${PUBLIC_HTML}/.htaccess"
    fi
    
    # Ejecutar deploy.sh
    if [ -x "${PUBLIC_HTML}/deploy.sh" ]; then
        "${PUBLIC_HTML}/deploy.sh" >> "${LOG_FILE}" 2>&1
    else
        chmod +x "${PUBLIC_HTML}/deploy.sh"
        "${PUBLIC_HTML}/deploy.sh" >> "${LOG_FILE}" 2>&1
    fi
    
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] deploy.sh ejecutado" >> "${LOG_FILE}"
    echo "---" >> "${LOG_FILE}"
fi

# Limpiar temporales
rm -f /tmp/.wp-config-pre-deploy /tmp/.htaccess-pre-deploy

# Mantener log manejable (últimas 500 líneas)
if [ -f "${LOG_FILE}" ] && [ "$(wc -l < "${LOG_FILE}")" -gt 1000 ]; then
    tail -500 "${LOG_FILE}" > "${LOG_FILE}.tmp"
    mv "${LOG_FILE}.tmp" "${LOG_FILE}"
fi
SCRIPT

chmod +x "${AUTO_DEPLOY_SCRIPT}"
log "✅ Script creado en ${AUTO_DEPLOY_SCRIPT}"

# ─── Configurar cron job ─────────────────────────────────────────────────────
log "Configurando cron job..."

CRON_LINE="*/2 * * * * ${AUTO_DEPLOY_SCRIPT}"

# Verificar si ya existe
EXISTING_CRON=$(crontab -l 2>/dev/null || true)
if echo "${EXISTING_CRON}" | grep -q "auto-deploy.sh"; then
    warn "Ya existe un cron de auto-deploy. Reemplazando..."
    EXISTING_CRON=$(echo "${EXISTING_CRON}" | grep -v "auto-deploy.sh")
fi

# Agregar cron
(echo "${EXISTING_CRON}"; echo "${CRON_LINE}") | crontab -
log "✅ Cron job configurado (cada 2 minutos)"

# ─── Verificar ───────────────────────────────────────────────────────────────
echo ""
log "═══════════════════════════════════════════════════════════"
log "✅ AUTO-DEPLOY CONFIGURADO EXITOSAMENTE"
log "═══════════════════════════════════════════════════════════"
echo ""
log "Resumen:"
log "  • Cron: cada 2 minutos ejecuta ~/auto-deploy.sh"
log "  • Pull: git pull --ff-only (sin merge conflicts)"
log "  • Post-pull: deploy.sh (permisos, caché, .htaccess)"
log "  • Log: ~/auto-deploy.log"
echo ""
log "Cron actual:"
crontab -l 2>/dev/null | grep -v "^#" | grep -v "^$"
echo ""
log "Para verificar que funciona:"
log "  1. Haz un push desde local"
log "  2. Espera 2 minutos"
log "  3. Revisa: tail -20 ~/auto-deploy.log"
echo ""
log "Para desactivar auto-deploy:"
log "  crontab -l | grep -v auto-deploy | crontab -"
