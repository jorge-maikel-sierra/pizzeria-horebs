#!/bin/bash
# ==============================================================================
# Pizzería Horeb's – Preparación para primer deploy con Hostinger Git
# 
# PROBLEMA: Hostinger requiere que public_html esté vacío para hacer git clone.
# SOLUCIÓN: Mover archivos actuales a backup, dejar que Hostinger clone,
#           y luego restaurar archivos que NO están en Git.
#
# USO: Ejecutar vía SSH en el servidor de Hostinger
#   1. Subir este script al HOME del servidor (~/)
#   2. chmod +x ~/prepare-git-deploy.sh
#   3. ./prepare-git-deploy.sh
#
# ⚠️  EJECUTAR SOLO UNA VEZ – antes del primer git clone de Hostinger
# ==============================================================================

set -euo pipefail

# ─── Configuración ───────────────────────────────────────────────────────────
HOME_DIR="$HOME"
PUBLIC_HTML="${HOME_DIR}/public_html"
BACKUP_DIR="${HOME_DIR}/pre-git-backup-$(date +%Y%m%d-%H%M%S)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[⚠️ ]${NC} $1"; }
error(){ echo -e "${RED}[❌]${NC} $1"; }
info() { echo -e "${CYAN}[ℹ️ ]${NC} $1"; }

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Preparación para Hostinger Git – Pizzería Horeb's${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""

# ─── Verificaciones previas ──────────────────────────────────────────────────
if [ ! -d "${PUBLIC_HTML}" ]; then
    error "No se encontró ${PUBLIC_HTML}. ¿Estás en el servidor correcto?"
    exit 1
fi

if [ ! -f "${PUBLIC_HTML}/wp-config.php" ]; then
    error "No se encontró wp-config.php. ¿WordPress está instalado?"
    exit 1
fi

# Mostrar tamaño actual
info "Tamaño actual de public_html:"
du -sh "${PUBLIC_HTML}" 2>/dev/null || true
echo ""

info "Tamaño de uploads (se preservará):"
du -sh "${PUBLIC_HTML}/wp-content/uploads" 2>/dev/null || echo "  No hay uploads"
echo ""

# ─── Confirmación ────────────────────────────────────────────────────────────
warn "Este script va a:"
echo "  1. Crear backup COMPLETO de public_html → ${BACKUP_DIR}"
echo "  2. Mover archivos críticos a un lugar seguro"
echo "  3. Vaciar public_html (para que Hostinger pueda hacer git clone)"
echo "  4. Darte instrucciones para restaurar después del clone"
echo ""
warn "El sitio estará CAÍDO temporalmente durante este proceso."
echo ""
read -p "¿Continuar? (escribe 'SI' en mayúsculas): " confirm

if [ "$confirm" != "SI" ]; then
    log "Cancelado. No se hizo ningún cambio."
    exit 0
fi

# ==============================================================================
# FASE 1: BACKUP COMPLETO
# ==============================================================================
echo ""
log "FASE 1: Creando backup completo..."

mkdir -p "${BACKUP_DIR}"

# Backup completo de public_html
cp -a "${PUBLIC_HTML}" "${BACKUP_DIR}/public_html_full"
log "Backup completo creado en: ${BACKUP_DIR}/public_html_full"

# ─── Guardar archivos críticos por separado (fácil acceso) ───────────────────
mkdir -p "${BACKUP_DIR}/restore"

# wp-config.php (CRÍTICO – no está en Git)
cp "${PUBLIC_HTML}/wp-config.php" "${BACKUP_DIR}/restore/wp-config.php"
log "Guardado: wp-config.php"

# .htaccess (puede tener reglas custom de producción)
if [ -f "${PUBLIC_HTML}/.htaccess" ]; then
    cp "${PUBLIC_HTML}/.htaccess" "${BACKUP_DIR}/restore/.htaccess"
    log "Guardado: .htaccess"
fi

# uploads completo (imágenes, archivos subidos)
if [ -d "${PUBLIC_HTML}/wp-content/uploads" ]; then
    cp -a "${PUBLIC_HTML}/wp-content/uploads" "${BACKUP_DIR}/restore/uploads"
    log "Guardado: wp-content/uploads/ ($(du -sh "${PUBLIC_HTML}/wp-content/uploads" | cut -f1))"
fi

# cache y archivos dinámicos
if [ -d "${PUBLIC_HTML}/wp-content/cache" ]; then
    cp -a "${PUBLIC_HTML}/wp-content/cache" "${BACKUP_DIR}/restore/cache"
    log "Guardado: wp-content/cache/"
fi

# Guardar lista de plugins activos (para verificar después)
if command -v wp &> /dev/null; then
    cd "${PUBLIC_HTML}"
    wp plugin list --status=active --format=csv > "${BACKUP_DIR}/restore/active-plugins.csv" 2>/dev/null || true
    log "Guardado: lista de plugins activos"
fi

echo ""
log "Backup completo en: ${BACKUP_DIR}"
echo ""

# ==============================================================================
# FASE 2: VACIAR public_html
# ==============================================================================
log "FASE 2: Vaciando public_html..."

# Eliminar TODO el contenido de public_html
rm -rf "${PUBLIC_HTML:?}"/*
rm -rf "${PUBLIC_HTML}"/.[!.]* 2>/dev/null || true

# Verificar que está vacío
FILE_COUNT=$(ls -A "${PUBLIC_HTML}" 2>/dev/null | wc -l)
if [ "$FILE_COUNT" -eq 0 ]; then
    log "public_html está vacío ✅"
else
    error "public_html aún tiene ${FILE_COUNT} archivos. Revisar manualmente."
    ls -la "${PUBLIC_HTML}"
    exit 1
fi

# ==============================================================================
# FASE 3: CREAR SCRIPT DE RESTAURACIÓN
# ==============================================================================
log "FASE 3: Creando script de restauración..."

cat > "${BACKUP_DIR}/restore.sh" << 'RESTORE_SCRIPT'
#!/bin/bash
# ==============================================================================
# Script de restauración post git-clone
# Ejecutar DESPUÉS de que Hostinger haga el git clone en public_html
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_HTML="$HOME/public_html"
RESTORE_DIR="${SCRIPT_DIR}/restore"

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[OK]${NC} $1"; }
error(){ echo -e "${RED}[❌]${NC} $1"; }

echo ""
echo "═══════════════════════════════════════════════════"
echo "  Restauración post git-clone"
echo "═══════════════════════════════════════════════════"
echo ""

# Verificar que el clone se hizo
if [ ! -f "${PUBLIC_HTML}/wp-load.php" ]; then
    error "wp-load.php no encontrado. ¿Se completó el git clone?"
    exit 1
fi

# 1. Restaurar wp-config.php
if [ -f "${RESTORE_DIR}/wp-config.php" ]; then
    cp "${RESTORE_DIR}/wp-config.php" "${PUBLIC_HTML}/wp-config.php"
    chmod 600 "${PUBLIC_HTML}/wp-config.php"
    log "Restaurado: wp-config.php"
else
    error "wp-config.php no encontrado en backup. ¡Crear manualmente!"
fi

# 2. Restaurar uploads
if [ -d "${RESTORE_DIR}/uploads" ]; then
    # Asegurar que el directorio destino existe
    mkdir -p "${PUBLIC_HTML}/wp-content/uploads"
    cp -a "${RESTORE_DIR}/uploads/"* "${PUBLIC_HTML}/wp-content/uploads/" 2>/dev/null || true
    cp -a "${RESTORE_DIR}/uploads/".* "${PUBLIC_HTML}/wp-content/uploads/" 2>/dev/null || true
    chmod -R 755 "${PUBLIC_HTML}/wp-content/uploads"
    log "Restaurado: wp-content/uploads/ ($(du -sh "${PUBLIC_HTML}/wp-content/uploads" | cut -f1))"
else
    echo "  ⚠️  No hay uploads en el backup"
    mkdir -p "${PUBLIC_HTML}/wp-content/uploads"
fi

# 3. Restaurar .htaccess (si el de Git no tiene reglas custom de producción)
# NOTA: El .htaccess del repo tiene las reglas básicas de WordPress.
# Si producción tenía reglas adicionales (LiteSpeed, etc.), descomenta esto:
# if [ -f "${RESTORE_DIR}/.htaccess" ]; then
#     cp "${RESTORE_DIR}/.htaccess" "${PUBLIC_HTML}/.htaccess"
#     log "Restaurado: .htaccess (versión de producción)"
# fi

# 4. Ajustar permisos generales
find "${PUBLIC_HTML}" -type d -exec chmod 755 {} \; 2>/dev/null || true
find "${PUBLIC_HTML}" -type f -exec chmod 644 {} \; 2>/dev/null || true
chmod 600 "${PUBLIC_HTML}/wp-config.php" 2>/dev/null || true
chmod 755 "${PUBLIC_HTML}/deploy.sh" 2>/dev/null || true
chmod 755 "${PUBLIC_HTML}/rollback.sh" 2>/dev/null || true

log "Permisos ajustados"

# 5. Ejecutar deploy.sh si existe
if [ -x "${PUBLIC_HTML}/deploy.sh" ]; then
    echo ""
    log "Ejecutando deploy.sh..."
    cd "${PUBLIC_HTML}"
    ./deploy.sh
fi

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Restauración completada"
echo ""
echo "  VERIFICAR:"
echo "    1. Abrir el sitio en el navegador"
echo "    2. Verificar que WooCommerce funciona"
echo "    3. Verificar que las imágenes cargan"
echo "    4. Verificar el admin de WordPress"
echo "═══════════════════════════════════════════════════"
RESTORE_SCRIPT

chmod +x "${BACKUP_DIR}/restore.sh"
log "Script de restauración creado: ${BACKUP_DIR}/restore.sh"

# ==============================================================================
# RESULTADO
# ==============================================================================
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ FASE 1-3 COMPLETADAS${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "  public_html está vacío y listo para Hostinger Git."
echo ""
echo -e "  ${YELLOW}AHORA DEBES:${NC}"
echo ""
echo "  PASO 1: Ir a hPanel → Avanzado → Git"
echo "  PASO 2: Crear repositorio con:"
echo "          Repo: git@github.com:jorge-maikel-sierra/pizzeria-horebs.git"
echo "          Rama: main"
echo "          Directorio: (vacío)"
echo "  PASO 3: Esperar a que Hostinger haga el git clone"
echo "  PASO 4: Ejecutar el script de restauración:"
echo ""
echo -e "          ${CYAN}${BACKUP_DIR}/restore.sh${NC}"
echo ""
echo "  BACKUP COMPLETO EN:"
echo "          ${BACKUP_DIR}/"
echo ""
echo -e "  ${RED}⚠️  Si algo sale mal, restaurar backup completo:${NC}"
echo "          rm -rf ${PUBLIC_HTML}/*"
echo "          cp -a ${BACKUP_DIR}/public_html_full/* ${PUBLIC_HTML}/"
echo ""
