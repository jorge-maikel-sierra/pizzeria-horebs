#!/bin/bash
# ==============================================================================
# Pizzería Horeb's – Script de Rollback
# Uso: ./rollback.sh [commit-hash]
# Sin argumento: revierte al commit anterior
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PUBLIC_HTML="$(cd "$(dirname "$0")" && pwd)"
BACKUP_DIR="${PUBLIC_HTML}/../deploy-backups"

log() { echo -e "${GREEN}[ROLLBACK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo ""
log "═══════════════════════════════════════════════════════════"
log "ROLLBACK – Pizzería Horeb's"
log "═══════════════════════════════════════════════════════════"
echo ""

cd "${PUBLIC_HTML}"

# Mostrar commits recientes
log "Últimos 5 commits:"
echo ""
git log --oneline -5
echo ""

if [ -n "${1:-}" ]; then
    TARGET_COMMIT="$1"
    log "Rollback a commit específico: ${TARGET_COMMIT}"
else
    TARGET_COMMIT="HEAD~1"
    log "Rollback al commit anterior (HEAD~1)"
fi

# Confirmar
echo ""
warn "⚠️  Esto revertirá los archivos en producción."
warn "Los uploads/ y wp-config.php NO serán afectados."
echo ""
read -p "¿Continuar? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    log "Rollback cancelado."
    exit 0
fi

# Backup antes de rollback
log "Creando backup pre-rollback..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p "${BACKUP_DIR}"

if [ -f "${PUBLIC_HTML}/.htaccess" ]; then
    cp "${PUBLIC_HTML}/.htaccess" "${BACKUP_DIR}/.htaccess.pre-rollback.${TIMESTAMP}"
fi

# Ejecutar rollback
log "Ejecutando git reset..."
git reset --hard "${TARGET_COMMIT}"

# Restaurar .htaccess de producción si fue sobrescrito
HTACCESS_PROD="${HOME}/htaccess-prod-backup"
if [ -f "${HTACCESS_PROD}" ]; then
    CURRENT_SIZE=$(stat -c%s "${PUBLIC_HTML}/.htaccess" 2>/dev/null || stat -f%z "${PUBLIC_HTML}/.htaccess" 2>/dev/null || echo "0")
    PROD_SIZE=$(stat -c%s "${HTACCESS_PROD}" 2>/dev/null || stat -f%z "${HTACCESS_PROD}" 2>/dev/null || echo "0")
    if [ "${CURRENT_SIZE}" -lt "${PROD_SIZE}" ] 2>/dev/null; then
        cp "${HTACCESS_PROD}" "${PUBLIC_HTML}/.htaccess"
        log "🔄 .htaccess de producción restaurado (${PROD_SIZE} bytes)"
    fi
elif [ -f "${BACKUP_DIR}/.htaccess.pre-rollback.${TIMESTAMP}" ]; then
    cp "${BACKUP_DIR}/.htaccess.pre-rollback.${TIMESTAMP}" "${PUBLIC_HTML}/.htaccess"
    log "🔄 .htaccess restaurado desde backup pre-rollback"
fi

# Re-ejecutar permisos
log "Reajustando permisos..."
find "${PUBLIC_HTML}" -type d -not -path "*/uploads/*" -not -path "*/.git/*" -exec chmod 755 {} \; 2>/dev/null || true
find "${PUBLIC_HTML}" -type f -not -path "*/uploads/*" -not -path "*/.git/*" -exec chmod 644 {} \; 2>/dev/null || true

if [ -f "${PUBLIC_HTML}/wp-config.php" ]; then
    chmod 600 "${PUBLIC_HTML}/wp-config.php"
fi

# Verificar
log "Estado actual:"
git log --oneline -1
echo ""

# Limpiar caché
if command -v wp &> /dev/null; then
    wp cache flush --quiet 2>/dev/null || true
fi

log "═══════════════════════════════════════════════════════════"
log "✅ Rollback completado"
log "═══════════════════════════════════════════════════════════"
echo ""
warn "IMPORTANTE: Si necesitas sincronizar con GitHub:"
warn "  git push origin main --force"
warn "Esto forzará el repositorio remoto al estado actual."
