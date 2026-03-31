# Workflows de Desarrollo — Pizzería Horeb's

## Prerrequisitos

- [DDEV](https://ddev.readthedocs.io/) instalado
- [Git](https://git-scm.com/) configurado
- Node.js >= 20 (para MCP servers)
- Python 3.x + venv (para analytics)
- Variable de entorno `HOSTINGER_API_TOKEN` exportada en tu shell

---

## Levantar el entorno local

```bash
# 1. Clonar el repo
git clone https://github.com/jorge-maikel-sierra/pizzeriahorebs.git
cd pizzeriahorebs

# 2. Iniciar DDEV
ddev start

# 3. Acceder al sitio
# → https://pizzeria-horebs.ddev.site

# 4. Importar base de datos (si es primera vez)
ddev import-db --file=backup.sql.gz

# 5. Para analytics (si aplica)
python -m venv .venv && source .venv/bin/activate
pip install -r analytics/requirements.txt
```

---

## Workflow: Nueva feature WordPress

```bash
# 1. Crear rama feature
git checkout -b feat/nombre-descriptivo

# 2. Abrir entorno DDEV
ddev start

# 3. Editar wp-content/themes/hello-elementor-child/functions.php
#    (usar prompt: /.github/prompts/new-woocommerce-feature.prompt.md)

# 4. Validar PHP
ddev exec php -l wp-content/themes/hello-elementor-child/functions.php

# 5. Probar en browser: https://pizzeria-horebs.ddev.site

# 6. Commit y push
git add wp-content/themes/hello-elementor-child/functions.php
git commit -m "feat(theme): descripción de la feature

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git push origin feat/nombre-descriptivo

# 7. Crear PR → merge a main → deploy automático
```

---

## Workflow: Corregir un bug

```bash
# 1. Activar debug (solo en DDEV, nunca en producción)
ddev wp config set WP_DEBUG true
ddev wp config set WP_DEBUG_LOG true
ddev wp config set WP_DEBUG_DISPLAY false

# 2. Ver logs
ddev logs                              # logs del contenedor
tail -f wp-content/debug.log           # errores PHP

# 3. Usar Xdebug para debugging interactivo
ddev xdebug on
# → F5 en VS Code con configuración "Listen for Xdebug"
# → poner breakpoint en el archivo relevante

# 4. Al terminar: apagar Xdebug y debug mode
ddev xdebug off
ddev wp config set WP_DEBUG false

# 5. Usar prompt: /.github/prompts/fix-bug.prompt.md para guiar el fix
```

---

## Workflow: Tarea de Analytics

```bash
# Activar entorno Python
source .venv/bin/activate

# Ejecutar fases individuales (en orden)
python analytics/data_loader.py          # FASE 1: cargar datos
python analytics/metrics.py             # FASE 2: calcular métricas
python analytics/combo_generator.py     # FASE 4: generar combos
python analytics/campaign_strategy.py  # FASE 5: estrategia de campaña

# Dashboard completo
streamlit run analytics/main.py         # → http://localhost:8501

# Usar prompt: /.github/prompts/analytics-task.prompt.md para nuevas tareas
```

---

## Workflow: Deploy a producción

```bash
# 1. Ejecutar checklist pre-deploy
#    (usar prompt: /.github/prompts/deploy-checklist.prompt.md)

# 2. Verificar que CI pasa localmente (opcional pero recomendado)
# PHP lint del tema:
find wp-content/themes/hello-elementor-child/ -name "*.php" -exec php -l {} \;
find wp-content/plugins/kiosko/ -name "*.php" -exec php -l {} \;

# 3. Asegurar que wp-config.php NO está en staging
git status  # verificar que wp-config.php no aparece

# 4. Push a main → deploy automático
git push origin main

# 5. Verificar en Hostinger que el auto-pull se ejecutó
# (Panel Hostinger → Git → ver historial de deploys)

# 6. Verificar sitio de producción
curl -I https://tu-dominio.com  # debe retornar 200
```

---

## Workflow: Rollback

```bash
# Ver últimos commits
git log --oneline -10

# Rollback al commit anterior
./rollback.sh

# Rollback a un commit específico
./rollback.sh abc1234

# Si el rollback requiere sincronizar GitHub:
git push origin main --force
```

---

## Comandos DDEV de referencia rápida

```bash
ddev start                    # Iniciar entorno
ddev stop                     # Detener entorno
ddev restart                  # Reiniciar
ddev ssh                      # Shell en contenedor PHP
ddev wp <comando>             # WP-CLI en contenedor
ddev exec <comando>           # Ejecutar comando en contenedor
ddev import-db --file=<sql>   # Importar BD
ddev export-db > backup.sql   # Exportar BD
ddev xdebug on/off            # Xdebug
ddev logs                     # Logs del contenedor
ddev describe                 # Info del proyecto
```

---

## Variables de entorno requeridas

| Variable | Uso | Cómo configurar |
|---|---|---|
| `HOSTINGER_API_TOKEN` | MCP Server de Hostinger en VS Code | `export HOSTINGER_API_TOKEN=xxx` en `~/.zshrc` o usar direnv |

Ver `docs/mcp-hostinger.md` para instrucciones detalladas.

---

## Herramientas de Copilot disponibles

| Prompt | Comando en VS Code | Cuándo usar |
|---|---|---|
| Nueva feature WooCommerce | `/new-woocommerce-feature` | Crear hooks, shortcodes, filtros |
| Fix Bug | `/fix-bug` | Debug PHP o Python |
| Code Review | `/code-review` | Antes de hacer commit |
| Tarea Analytics | `/analytics-task` | Agregar lógica al pipeline |
| Deploy Checklist | `/deploy-checklist` | Antes de hacer push a main |
