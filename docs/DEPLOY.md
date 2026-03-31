# 🚀 Guía de Deploy – Pizzería Horeb's

## Arquitectura de Despliegue

```
┌──────────────┐     push      ┌──────────────┐    auto-pull    ┌──────────────────┐
│  Local DDEV  │ ───────────▶  │    GitHub     │ ─────────────▶ │   Hostinger      │
│  (desarrollo)│               │  (repo main)  │                │  (public_html)   │
└──────────────┘               └──────────────┘                └──────────────────┘
                                      │
                                      ▼
                               GitHub Actions
                               (CI: lint PHP,
                                validar archivos)
```

## Flujo de trabajo

1. Desarrollo local con DDEV
2. Commit y push a `main`
3. GitHub Actions valida sintaxis PHP y archivos críticos
4. Hostinger detecta el push y hace `git pull` automático en `public_html`
5. Se ejecuta `deploy.sh` post-pull (si está configurado)

---

## Configuración Inicial (Paso a Paso)

### PASO 1 – Generar clave SSH en Hostinger

1. Ve a **hPanel → Avanzado → Acceso SSH**
2. Si no tienes acceso SSH habilitado, actívalo
3. Ve a **hPanel → Avanzado → Clave SSH** y genera un nuevo par de claves:
   - Haz clic en **"Generar nuevo par de claves SSH"**
   - Nombre: `github-deploy-key`
   - Descarga la clave **privada** (la necesitarás para Hostinger)
   - Copia la clave **pública** (la necesitarás para GitHub)

> ⚠️ **Alternativa**: Si Hostinger genera la clave automáticamente al configurar el repo Git, usa esa clave pública.

### PASO 2 – Agregar Deploy Key en GitHub

1. Ve a **GitHub → Repositorio → Settings → Deploy keys**
2. Haz clic en **"Add deploy key"**
3. Configuración:
   - **Title**: `Hostinger – Pizzería Horeb's`
   - **Key**: Pega la clave **pública** de Hostinger
   - **Allow write access**: ❌ NO marcar (solo necesita lectura)
4. Haz clic en **"Add key"**

### PASO 3 – Configurar repositorio Git en Hostinger

1. Ve a **hPanel → Avanzado → Git**
2. Haz clic en **"Crear nuevo repositorio"** o **"Manage"**
3. Configuración:

| Campo | Valor |
|---|---|
| **Repositorio** | `git@github.com:jorge-maikel-sierra/pizzeria-horebs.git` |
| **Rama** | `main` |
| **Directorio** | `domains/pizzeriahorebs.shop/public_html` |

> ⚠️ **NOTA**: WordPress corre en el dominio principal `pizzeriahorebs.shop`. La ruta del repo es `domains/pizzeriahorebs.shop/public_html`. El dominio `pizzeriahorebs.com` redirige a `.shop` vía `.htaccess`.

4. Haz clic en **"Crear"**
5. Hostinger hará el primer `git clone` automáticamente

> 🔴 **IMPORTANTE**: Hostinger requiere que `public_html` esté **VACÍO** para hacer el clone. Ver el paso 3.1 abajo.

### PASO 3.1 – Primer deploy (método git remote swap)

Si ya hay un WordPress funcionando con un repo Git anterior, el método más seguro es cambiar el remote:

```bash
# 1. Conectar vía SSH a Hostinger
ssh -p 65002 u613240431@88.223.85.198

# 2. Ir al directorio de WordPress
cd ~/domains/pizzeriahorebs.shop/public_html

# 3. Backup de archivos críticos
cp wp-config.php ~/wp-config-backup
cp .htaccess ~/htaccess-prod-backup

# 4. Cambiar remote al nuevo repo
git remote set-url origin git@github.com:jorge-maikel-sierra/pizzeria-horebs.git

# 5. Fetch y reset
git fetch origin main
git reset --hard origin/main

# 6. Restaurar archivos de producción
cp ~/wp-config-backup wp-config.php
cp ~/htaccess-prod-backup .htaccess
chmod 600 wp-config.php

# 7. Ejecutar post-deploy
chmod +x deploy.sh
./deploy.sh
```

> ⚠️ **Si public_html está vacío** (hosting nuevo), usa el panel Git de hPanel directamente:
> 1. Ve a **hPanel → Avanzado → Git → Crear repositorio**
> 2. Hostinger hará `git clone` automáticamente
> 3. Después restaura `wp-config.php` y ejecuta `deploy.sh`

### PASO 4 – Verificar wp-config.php en producción

Después del primer clone, `wp-config.php` **NO estará** (está en `.gitignore`). Si usaste el script de preparación, `restore.sh` ya lo habrá restaurado.

**Si el sitio deja de funcionar:**

1. Conéctate vía SSH a Hostinger:
   ```bash
   ssh -p 65002 u613240431@88.223.85.198
   ```

2. Restaura `wp-config.php` desde tu backup:
   ```bash
   cd ~/domains/pizzeriahorebs.shop/public_html
   # Si lo tienes en backup:
   cp ~/wp-config-backup ./wp-config.php
   # O desde backups de deploy:
   ls -t ~/domains/pizzeriahorebs.shop/deploy-backups/wp-config.php.*
   cp ~/domains/pizzeriahorebs.shop/deploy-backups/wp-config.php.ULTIMO ./wp-config.php
   chmod 600 wp-config.php
   ```

3. O créalo manualmente con los datos de tu hosting:
   ```php
   <?php
   define('DB_NAME', 'u123456789_pizzeria');
   define('DB_USER', 'u123456789_admin');
   define('DB_PASSWORD', 'TU_PASSWORD_SEGURO');
   define('DB_HOST', 'localhost');
   define('DB_CHARSET', 'utf8mb4');
   define('DB_COLLATE', '');
   
   // Salts (genera nuevas en https://api.wordpress.org/secret-key/1.1/salt/)
   // ... pegar aquí ...
   
   $table_prefix = 'wp_';
   define('WP_DEBUG', false);
   
   if ( ! defined('ABSPATH') ) {
       define('ABSPATH', __DIR__ . '/');
   }
   require_once ABSPATH . 'wp-settings.php';
   ```

### PASO 5 – Ejecutar deploy.sh post-pull

Después del primer clone, ejecuta manualmente:

```bash
cd ~/domains/pizzeriahorebs.shop/public_html
chmod +x deploy.sh
./deploy.sh
```

Para auto-ejecución en futuros deploys, configura un **cron job** que detecte cambios y ejecute deploy.sh:

```bash
# Cron que ejecuta deploy.sh si hubo git pull reciente (cada 5 minutos)
*/5 * * * * cd ~/domains/pizzeriahorebs.shop/public_html && git pull origin main --ff-only 2>/dev/null && git log --since="5 minutes ago" --oneline | grep -q . && ./deploy.sh >> /tmp/deploy-cron.log 2>&1
```

### PASO 6 – Configurar Auto-Deploy (Webhook)

Para que Hostinger haga pull automáticamente al hacer push:

1. En **hPanel → Git → tu repositorio**, busca la opción **"Auto deploy"** o **"Webhook URL"**
2. Copia la URL del webhook de Hostinger
3. Ve a **GitHub → Repositorio → Settings → Webhooks → Add webhook**:
   - **Payload URL**: La URL de Hostinger
   - **Content type**: `application/json`
   - **Events**: Solo `push`
4. Guarda el webhook

---

## Estrategia de Plugins

### Plugins versionados en Git (custom/personalizados)

| Plugin | Razón |
|---|---|
| `kiosko/` | Plugin custom del POS |

### Plugins gestionados en producción (NO en Git actualmente)

| Plugin | Razón |
|---|---|
| `elementor/` | Plugin de terceros, actualizaciones desde WP Admin |
| `elementor-pro/` | Licencia comercial, se activa en producción |
| `woocommerce/` | Core de e-commerce, actualizar desde WP Admin |
| `woocommerce-mercadopago/` | Gateway de pago |
| `woocommerce-point-of-sale/` | YITH POS |
| `wordpress-seo/` | Yoast SEO |
| `wordpress-seo-premium/` | Yoast SEO Premium |
| `wpseo-local/` | Yoast Local SEO |
| `wpseo-woocommerce/` | Yoast WooCommerce SEO |
| `wp-mail-smtp-pro/` | SMTP Pro |
| `litespeed-cache/` | Caché del servidor |
| `mailin/` | Sendinblue |
| `all-in-one-wp-migration/` | Migración (solo temporal) |
| Otros... | Ver lista completa en wp-content/plugins/ |

> **⚠️ DECISIÓN IMPORTANTE**: Actualmente TODOS los plugins están en Git. Si quieres manejar plugins de terceros solo desde producción, descomenta las líneas correspondientes en `.gitignore` y haz `git rm --cached` para cada uno.

### Migrar a plugins-de-terceros-fuera-de-Git (opcional)

```bash
# Ejemplo: sacar WooCommerce del repo
git rm --cached -r wp-content/plugins/woocommerce/
git rm --cached -r wp-content/plugins/elementor/
git rm --cached -r wp-content/plugins/elementor-pro/
# ... repetir para cada plugin de terceros
git commit -m "chore: mover plugins de terceros fuera del versionado"
```

---

## Estructura de archivos del deploy

```
public_html/                          ← Hostinger clona aquí
├── deploy.sh                         ← Script post-deploy
├── .htaccess                         ← Versionado (reglas WordPress)
├── index.php                         ← Core WordPress
├── wp-load.php                       ← Core WordPress
├── wp-config.php                     ← ⛔ SOLO EN PRODUCCIÓN (no en Git)
├── wp-content/
│   ├── themes/
│   │   ├── hello-elementor-child/    ← ✅ Tema custom (Git)
│   │   ├── kiosko/                   ← ✅ Tema custom (Git)
│   │   ├── hello-elementor/          ← Theme padre (Git)
│   │   └── twentytwenty*/            ← Themes default (Git)
│   ├── plugins/
│   │   ├── kiosko/                   ← ✅ Plugin custom (Git)
│   │   ├── woocommerce/              ← Plugin terceros (Git o producción)
│   │   └── .../                      ← Otros plugins
│   └── uploads/                      ← ⛔ SOLO PRODUCCIÓN (no en Git)
└── wp-includes/                      ← Core WordPress
```

---

## Rollback de emergencia

### Rollback rápido (último deploy)

```bash
# En Hostinger vía SSH:
cd ~/domains/pizzeriahorebs.shop/public_html

# Ver commits recientes
git log --oneline -5

# Revertir al commit anterior
git revert HEAD --no-edit

# O forzar a un commit específico
git reset --hard <commit-hash>
git push origin main --force
```

### Rollback de archivos críticos

```bash
# Restaurar .htaccess
cp ~/domains/pizzeriahorebs.shop/deploy-backups/.htaccess.YYYYMMDD-HHMMSS ~/domains/pizzeriahorebs.shop/public_html/.htaccess

# Restaurar wp-config.php
cp ~/domains/pizzeriahorebs.shop/deploy-backups/wp-config.php.YYYYMMDD-HHMMSS ~/domains/pizzeriahorebs.shop/public_html/wp-config.php
```

### Rollback completo (desde backup de Hostinger)

1. Ve a **hPanel → Archivos → Copias de seguridad**
2. Restaura la última copia funcional

---

## Estrategia de Staging (futuro)

### Opción 1: Subdominio en Hostinger

1. Crear subdominio: `staging.pizzeriahorebs.shop`
2. Crear rama `staging` en Git
3. Configurar segundo repo Git en Hostinger apuntando a:
   - Rama: `staging`
   - Directorio: `public_html/staging` (o subdominio)
4. Flujo: `feature-branch` → PR a `staging` → probar → PR a `main`

### Opción 2: Local con DDEV (actual)

El flujo actual con DDEV ya funciona como staging local:
1. Desarrollo y pruebas en DDEV
2. Push a `main` cuando está listo
3. Deploy automático a producción

---

## Checklist Post-Deploy

- [ ] El sitio carga correctamente: `https://pizzeriahorebs.shop`
- [ ] WooCommerce funciona (agregar producto al carrito, checkout)
- [ ] Mercado Pago responde (hacer prueba de pago)
- [ ] Las imágenes cargan (uploads/ intacto)
- [ ] El POS (YITH) funciona
- [ ] No hay errores en `wp-content/debug.log`
- [ ] El tema hello-elementor-child se ve correcto
- [ ] SEO: Yoast sin errores
- [ ] SSL funcionando (https)

---

## Solución de problemas

### "El sitio muestra error 500 después del deploy"

```bash
# 1. Verificar wp-config.php
ls -la ~/domains/pizzeriahorebs.shop/public_html/wp-config.php

# 2. Verificar permisos
cd ~/domains/pizzeriahorebs.shop/public_html
find . -type d -not -path './.git/*' -exec chmod 755 {} \;
find . -type f -not -path './.git/*' -exec chmod 644 {} \;
chmod 600 wp-config.php

# 3. Verificar .htaccess (debe tener reglas LiteSpeed + redirect)
wc -l .htaccess  # Debe ser ~600+ líneas, NO ~16

# 4. Si .htaccess es muy pequeño, restaurar desde backup
cp ~/htaccess-prod-backup .htaccess

# 5. Activar debug temporalmente
# En wp-config.php, agregar:
# define('WP_DEBUG', true);
# define('WP_DEBUG_LOG', true);
# Revisar: ~/domains/pizzeriahorebs.shop/public_html/wp-content/debug.log
```

### "Faltan plugins después del deploy"

Si un plugin no está en Git, debe instalarse manualmente en producción:
1. Ve a **WP Admin → Plugins → Añadir nuevo**
2. Instala y activa el plugin
3. Los archivos del plugin vivirán solo en producción

### "Las imágenes no cargan"

```bash
# Verificar que uploads existe y tiene permisos
ls -la ~/domains/pizzeriahorebs.shop/public_html/wp-content/uploads/
chmod -R 755 ~/domains/pizzeriahorebs.shop/public_html/wp-content/uploads/
```

---

## Comandos útiles

```bash
# SSH a Hostinger
ssh -p 65002 u613240431@88.223.85.198

# Ver estado del repo en producción
cd ~/domains/pizzeriahorebs.shop/public_html && git status

# Pull manual (si auto-deploy no funciona)
cd ~/domains/pizzeriahorebs.shop/public_html && git pull origin main --ff-only

# Ejecutar deploy.sh manualmente
cd ~/domains/pizzeriahorebs.shop/public_html && ./deploy.sh

# Ver logs de deploy
ls -la /tmp/pizzeria-horebs-deploy-*
cat /tmp/pizzeria-horebs-deploy-*.log | tail -50
```
