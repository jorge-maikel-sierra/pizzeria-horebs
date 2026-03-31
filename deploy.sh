#!/bin/bash
# ==============================================================================
# Pizzería Horeb's – Script Post-Deploy
# Se ejecuta automáticamente después de cada git pull en Hostinger.
# ==============================================================================

set -euo pipefail

# ─── Configuración ───────────────────────────────────────────────────────────
DEPLOY_LOG="/tmp/pizzeria-horebs-deploy-$(date +%Y%m%d-%H%M%S).log"
PUBLIC_HTML="$(cd "$(dirname "$0")" && pwd)"
BACKUP_DIR="${PUBLIC_HTML}/../deploy-backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# ─── Colores para output ─────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[DEPLOY]${NC} $1" | tee -a "$DEPLOY_LOG"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$DEPLOY_LOG"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$DEPLOY_LOG"
}

# ==============================================================================
# INICIO DEL DEPLOY
# ==============================================================================

log "═══════════════════════════════════════════════════════════"
log "Deploy iniciado: $(date)"
log "Directorio: ${PUBLIC_HTML}"
log "═══════════════════════════════════════════════════════════"

# ─── PASO 0: Crear backup rápido de archivos críticos ────────────────────────
log "Creando backup pre-deploy..."
mkdir -p "${BACKUP_DIR}"

# Backup del .htaccess actual (producción puede tener reglas extra)
if [ -f "${PUBLIC_HTML}/.htaccess" ]; then
    cp "${PUBLIC_HTML}/.htaccess" "${BACKUP_DIR}/.htaccess.${TIMESTAMP}"
    log "Backup .htaccess → deploy-backups/.htaccess.${TIMESTAMP}"
fi

# Backup de wp-config.php (nunca debe sobrescribirse)
if [ -f "${PUBLIC_HTML}/wp-config.php" ]; then
    cp "${PUBLIC_HTML}/wp-config.php" "${BACKUP_DIR}/wp-config.php.${TIMESTAMP}"
    log "Backup wp-config.php → deploy-backups/wp-config.php.${TIMESTAMP}"
fi

# Limpiar backups antiguos (mantener últimos 10)
ls -t "${BACKUP_DIR}"/.htaccess.* 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
ls -t "${BACKUP_DIR}"/wp-config.php.* 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
log "Backups antiguos limpiados (se mantienen los últimos 10)"

# ─── PASO 0.5: Restaurar .htaccess de producción ────────────────────────────
# CRÍTICO: git pull sobrescribe .htaccess con la versión del repo (básica).
# Producción necesita el .htaccess con reglas de LiteSpeed, redirect .com→.shop, etc.
# Si existe un backup reciente, restaurarlo automáticamente.
HTACCESS_PROD="${HOME}/htaccess-prod-backup"
if [ -f "${HTACCESS_PROD}" ]; then
    REPO_HTACCESS_SIZE=$(stat -c%s "${PUBLIC_HTML}/.htaccess" 2>/dev/null || stat -f%z "${PUBLIC_HTML}/.htaccess" 2>/dev/null || echo "0")
    PROD_HTACCESS_SIZE=$(stat -c%s "${HTACCESS_PROD}" 2>/dev/null || stat -f%z "${HTACCESS_PROD}" 2>/dev/null || echo "0")
    
    # Si el .htaccess actual es mucho más pequeño que el de producción, fue sobrescrito por Git
    if [ "${REPO_HTACCESS_SIZE}" -lt "${PROD_HTACCESS_SIZE}" ] 2>/dev/null; then
        cp "${HTACCESS_PROD}" "${PUBLIC_HTML}/.htaccess"
        log "🔄 .htaccess restaurado desde backup de producción (${PROD_HTACCESS_SIZE} bytes)"
    fi
elif [ -n "$(ls -t "${BACKUP_DIR}"/.htaccess.* 2>/dev/null | head -1)" ]; then
    # Si no hay htaccess-prod-backup pero sí hay backups de deploy anteriores
    LATEST_BACKUP=$(ls -t "${BACKUP_DIR}"/.htaccess.* 2>/dev/null | head -1)
    REPO_HTACCESS_SIZE=$(stat -c%s "${PUBLIC_HTML}/.htaccess" 2>/dev/null || stat -f%z "${PUBLIC_HTML}/.htaccess" 2>/dev/null || echo "0")
    BACKUP_HTACCESS_SIZE=$(stat -c%s "${LATEST_BACKUP}" 2>/dev/null || stat -f%z "${LATEST_BACKUP}" 2>/dev/null || echo "0")
    
    if [ "${REPO_HTACCESS_SIZE}" -lt "${BACKUP_HTACCESS_SIZE}" ] 2>/dev/null; then
        cp "${LATEST_BACKUP}" "${PUBLIC_HTML}/.htaccess"
        log "🔄 .htaccess restaurado desde último backup (${BACKUP_HTACCESS_SIZE} bytes)"
    fi
fi

# ─── PASO 1: Verificar que wp-config.php existe ─────────────────────────────
if [ ! -f "${PUBLIC_HTML}/wp-config.php" ]; then
    error "¡wp-config.php NO encontrado! WordPress no funcionará."
    error "Restaura desde backup: cp ${BACKUP_DIR}/wp-config.php.* ${PUBLIC_HTML}/wp-config.php"
    # No salir con error — el deploy de Git ya se completó
    warn "Continuando deploy sin wp-config.php..."
fi

# ─── PASO 2: Verificar que uploads existe (NO debe ser tocado por Git) ───────
if [ ! -d "${PUBLIC_HTML}/wp-content/uploads" ]; then
    warn "Directorio uploads/ no encontrado. Creándolo..."
    mkdir -p "${PUBLIC_HTML}/wp-content/uploads"
    chmod 755 "${PUBLIC_HTML}/wp-content/uploads"
fi

# ─── PASO 3: Permisos seguros ────────────────────────────────────────────────
log "Ajustando permisos..."

# Directorios: 755
find "${PUBLIC_HTML}" -type d -not -path "*/uploads/*" -not -path "*/.git/*" -exec chmod 755 {} \; 2>/dev/null || true

# Archivos: 644
find "${PUBLIC_HTML}" -type f -not -path "*/uploads/*" -not -path "*/.git/*" -exec chmod 644 {} \; 2>/dev/null || true

# wp-config.php: más restrictivo
if [ -f "${PUBLIC_HTML}/wp-config.php" ]; then
    chmod 600 "${PUBLIC_HTML}/wp-config.php"
fi

# deploy.sh debe ser ejecutable
chmod 755 "${PUBLIC_HTML}/deploy.sh"

log "Permisos actualizados"

# ─── PASO 4: Limpiar archivos que no deben estar en producción ───────────────
log "Limpiando archivos de desarrollo..."

# Eliminar archivos de desarrollo que Git puede haber traído
declare -a DEV_FILES=(
    "${PUBLIC_HTML}/.deployignore"
    "${PUBLIC_HTML}/README.md"
    "${PUBLIC_HTML}/.github"
)

for dev_file in "${DEV_FILES[@]}"; do
    if [ -e "$dev_file" ]; then
        rm -rf "$dev_file"
        log "Eliminado: $(basename $dev_file)"
    fi
done

# ─── PASO 5: Limpiar caché de WordPress ─────────────────────────────────────
log "Limpiando caché..."

# LiteSpeed Cache (plugin activo en Hostinger)
if [ -d "${PUBLIC_HTML}/wp-content/litespeed" ]; then
    rm -rf "${PUBLIC_HTML}/wp-content/litespeed/cssjs/"* 2>/dev/null || true
    rm -rf "${PUBLIC_HTML}/wp-content/litespeed/htmlc/"* 2>/dev/null || true
    log "Caché LiteSpeed limpiado"
fi

# Caché general de wp-content
if [ -d "${PUBLIC_HTML}/wp-content/cache" ]; then
    find "${PUBLIC_HTML}/wp-content/cache" -type f -name "*.html" -delete 2>/dev/null || true
    find "${PUBLIC_HTML}/wp-content/cache" -type f -name "*.css" -delete 2>/dev/null || true
    find "${PUBLIC_HTML}/wp-content/cache" -type f -name "*.js" -delete 2>/dev/null || true
    log "Caché general limpiado"
fi

# WP-CLI (si está disponible en Hostinger)
if command -v wp &> /dev/null; then
    log "WP-CLI detectado, ejecutando flush..."
    cd "${PUBLIC_HTML}"
    wp cache flush --quiet 2>/dev/null || warn "wp cache flush falló (no crítico)"
    wp rewrite flush --quiet 2>/dev/null || warn "wp rewrite flush falló (no crítico)"
    wp transient delete --all --quiet 2>/dev/null || warn "wp transient delete falló (no crítico)"
    log "Caché de WordPress limpiado vía WP-CLI"
else
    warn "WP-CLI no disponible. Limpia caché manualmente desde wp-admin."
fi

# ─── PASO 6: Verificación básica de salud ────────────────────────────────────
log "Ejecutando verificación de salud..."

HEALTH_OK=true

# Verificar archivos críticos de WordPress
declare -a CRITICAL_FILES=(
    "index.php"
    "wp-load.php"
    "wp-settings.php"
    "wp-blog-header.php"
    "wp-content/themes/hello-elementor-child/functions.php"
    "wp-content/themes/hello-elementor-child/style.css"
)

for critical in "${CRITICAL_FILES[@]}"; do
    if [ ! -f "${PUBLIC_HTML}/${critical}" ]; then
        error "Archivo crítico faltante: ${critical}"
        HEALTH_OK=false
    fi
done

# Verificar sintaxis PHP de archivos custom
if command -v php &> /dev/null; then
    log "Verificando sintaxis PHP..."
    
    # Verificar tema hijo
    for php_file in "${PUBLIC_HTML}"/wp-content/themes/hello-elementor-child/*.php; do
        if [ -f "$php_file" ]; then
            if ! php -l "$php_file" &>/dev/null; then
                error "Error de sintaxis PHP: $(basename $php_file)"
                HEALTH_OK=false
            fi
        fi
    done
    
    # Verificar tema kiosko
    for php_file in "${PUBLIC_HTML}"/wp-content/themes/kiosko/*.php; do
        if [ -f "$php_file" ]; then
            if ! php -l "$php_file" &>/dev/null; then
                error "Error de sintaxis PHP: kiosko/$(basename $php_file)"
                HEALTH_OK=false
            fi
        fi
    done
    
    # Verificar plugin kiosko
    for php_file in "${PUBLIC_HTML}"/wp-content/plugins/kiosko/*.php; do
        if [ -f "$php_file" ]; then
            if ! php -l "$php_file" &>/dev/null; then
                error "Error de sintaxis PHP: plugins/kiosko/$(basename $php_file)"
                HEALTH_OK=false
            fi
        fi
    done
    
    log "Verificación de sintaxis PHP completada"
fi

# ─── RESULTADO ────────────────────────────────────────────────────────────────
echo ""
log "═══════════════════════════════════════════════════════════"
if [ "$HEALTH_OK" = true ]; then
    log "✅ DEPLOY EXITOSO: $(date)"
else
    error "⚠️  DEPLOY CON ADVERTENCIAS: $(date)"
    error "Revisa los errores arriba. Considera hacer rollback."
fi
log "Log completo: ${DEPLOY_LOG}"
log "═══════════════════════════════════════════════════════════"
