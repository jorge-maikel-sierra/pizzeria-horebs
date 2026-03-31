---
name: 'Deploy & CI'
description: 'Reglas para scripts de deploy, rollback y workflows de GitHub Actions'
applyTo: '{deploy.sh,rollback.sh,.github/workflows/**}'
---

# Estándares de Deploy — Pizzería Horeb's

## Flujo de deploy

```
git push origin main
  → GitHub valida CI (.github/workflows/validate-deploy.yml)
  → Hostinger auto-pull en public_html
  → deploy.sh se ejecuta automáticamente post-pull
```

## deploy.sh — responsabilidades

El script maneja en orden:
1. Backup de `.htaccess` y `wp-config.php` (guarda últimos 10)
2. Restaurar `.htaccess` de producción si el del repo es más pequeño (LiteSpeed rules)
3. Verificar existencia de `wp-config.php` y `wp-content/uploads/`
4. Permisos: directorios `755`, archivos `644`, `wp-config.php` `600`, `deploy.sh` `755`
5. Limpiar caches: LiteSpeed (`cssjs/`, `htmlc/`), WP-CLI flush
6. Validación PHP de archivos del tema y plugins personalizados

**Al modificar `deploy.sh`:**
- Mantener la lógica de backup antes de cualquier operación destructiva
- No usar `wp-cli` sin verificar que está disponible (`command -v wp`)
- Preservar los logs en `/tmp/pizzeria-horebs-deploy-YYYYMMDD-HHMMSS.log`

## rollback.sh — responsabilidades

- Muestra últimos 5 commits antes de actuar
- Requiere confirmación explícita del usuario (y/N)
- Hace `git reset --hard <target>`
- Restaura `.htaccess` desde backup si es necesario
- Reaplica permisos

**Al modificar `rollback.sh`:**
- Nunca omitir la confirmación del usuario
- Siempre hacer backup del `.htaccess` actual antes del reset

## GitHub Actions CI

El workflow `validate-deploy.yml` valida en cada push/PR a `main`:
- PHP lint de `hello-elementor-child/` y `kiosko/` (tema y plugin personalizados)
- Existencia de 9 archivos críticos (index.php, wp-load.php, deploy.sh, etc.)
- **`wp-config.php` NO debe estar en el repo** — el workflow falla si está presente
- **`wp-content/uploads/` NO debe estar en el repo**

**Al modificar el workflow:**
- No agregar pasos que requieran servidor WordPress activo (no WP-CLI, no HTTP requests al sitio)
- Los pasos deben ser rápidos — el runner no tiene DDEV ni base de datos
- Mantener las verificaciones de seguridad (wp-config.php, uploads)

## Archivos que NUNCA se versionan

```
wp-config.php
wp-config-ddev.php
wp-content/uploads/
.ddev/
analytics/
.env
.venv/
export_wp_database_full/
```

## Secrets y variables de entorno

- Tokens de API: usar `${env:VARIABLE}` en `.vscode/mcp.json`
- Credenciales de producción: solo en Hostinger (no en repo ni en CI)
- Variables de desarrollo DDEV: definidas por DDEV automáticamente (no necesitan .env)
