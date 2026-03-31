---
description: 'Checklist pre-deploy y validación antes de hacer push a main'
agent: 'ask'
---

# Checklist Pre-Deploy — Pizzería Horeb's

Revisa el estado actual del repositorio y responde cada punto del checklist.

## 🔍 Verificación de código

### PHP
- [ ] `ddev exec php -l wp-content/themes/hello-elementor-child/functions.php` sin errores
- [ ] `ddev exec php -l wp-content/plugins/kiosko/*.php` sin errores
- [ ] No hay `var_dump()`, `print_r()` o `error_log()` de debug en archivos PHP
- [ ] `wp-config.php` NO está en el staging de git (`git status`)

### Archivos críticos presentes
- [ ] `index.php`
- [ ] `wp-load.php`
- [ ] `wp-settings.php`
- [ ] `wp-content/themes/hello-elementor-child/functions.php`
- [ ] `wp-content/themes/hello-elementor-child/style.css`
- [ ] `deploy.sh`

### Archivos que NO deben estar en el commit
- [ ] `wp-config.php` → no versionado
- [ ] `wp-content/uploads/` → no versionado
- [ ] `.env` → no versionado
- [ ] `analytics/` → no versionado
- [ ] `.ddev/` → no versionado

## 🔐 Seguridad

- [ ] No hay tokens, contraseñas o API keys hardcodeados en el código commiteado
- [ ] `.vscode/mcp.json` usa `${env:HOSTINGER_API_TOKEN}` (no token en texto plano)

## 📋 Commit y push

Formato de commit recomendado:
```
tipo(scope): descripción breve en español

Descripción detallada si es necesario.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `deploy`

## ✅ Post-deploy

Después del push, verificar en Hostinger:
1. El auto-pull se ejecutó (revisar logs de Hostinger Git)
2. El sitio responde: `https://pizzeria-horebs.ddev.site` (local) o la URL de producción
3. No hay errores PHP en los logs
4. WooCommerce checkout funciona correctamente
5. Si algo falla: `./rollback.sh` para revertir
