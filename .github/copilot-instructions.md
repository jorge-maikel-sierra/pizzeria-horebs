# Copilot Instructions — Pizzería Horeb's

## Proyecto

Sitio web de e-commerce de pizzería colombiana construido con **WordPress + WooCommerce**, desplegado en Hostinger. Acepta pagos en **COP (pesos colombianos)** vía Mercado Pago. También incluye un pipeline de análisis de datos independiente en Python/Streamlit (`analytics/`).

**Stack principal:**
- PHP 8.3 + WordPress 6.x + WooCommerce
- Tema: `hello-elementor-child` (extiende Hello Elementor)
- Constructor visual: Elementor Pro
- Pagos: Mercado Pago (COP, sin decimales)
- POS presencial: YITH Point of Sale
- SEO: Yoast SEO + Local SEO
- Email: Sendinblue / WP Mail SMTP Pro
- Entorno local: DDEV (`https://pizzeria-horebs.ddev.site`)
- Deploy: Hostinger Git (push a `main` → auto-pull en `public_html`)

**Stack analytics (independiente):**
- Python 3 + Pandas + Streamlit
- Directorio: `analytics/` (no se versiona en este repo)

---

## Arquitectura — Dos sistemas independientes

### Sistema 1: WordPress (raíz del repo)
```
wp-content/
  themes/hello-elementor-child/   ← TEMA ACTIVO
    functions.php                  ← personalizaciones PHP aquí
    style.css                      ← CSS personalizado aquí
  plugins/
    kiosko/                        ← plugin POS personalizado
    [plugins terceros]
deploy.sh                          ← ejecuta automáticamente en Hostinger post-git-pull
rollback.sh                        ← rollback manual
.github/workflows/validate-deploy.yml ← CI: lint PHP + verificar archivos
```

### Sistema 2: Analytics Python (directorio `analytics/`)
```
FASE 1: data_loader.py  →  df_orders, df_order_items, df_customers, df_products
FASE 2: metrics.py      →  ticket_promedio, top_productos, horas_pico, RFM, LTV, Apriori
FASE 4: combo_generator.py  →  combos_sugeridos.csv
FASE 5: campaign_strategy.py → campaign_strategy.txt
FASE 3: main.py         →  Dashboard Streamlit (integra todo)
```

---

## Reglas de arquitectura (NO violar)

1. **`wp-config.php` y `wp-config-ddev.php`** son autogenerados por DDEV — NUNCA modificar ni versionar.
2. **`export_wp_database_full/`** es solo lectura (exportaciones de BD) — NUNCA modificar.
3. **`analytics/ventas_procesadas.csv`**, **`combos_sugeridos.csv`**, **`campaign_strategy.txt`** son archivos generados — no editar manualmente.
4. **Los campos de checkout eliminados** (estado, empresa, país, ciudad, CP) se quitaron intencionalmente con `woocommerce_checkout_fields`. No restaurarlos sin justificación explícita del usuario.
5. **WordPress y Analytics son independientes** — no crear dependencias entre ellos.
6. **Secrets nunca en código** — usar `${env:VARIABLE}` para MCP, `.env` local (no versionado) para desarrollo.
7. **No versionar**: `wp-config.php`, `wp-content/uploads/`, `.ddev/`, `analytics/`, `.env`.

---

## Convenciones PHP / WordPress

- **Tema activo**: `hello-elementor-child`. Toda personalización PHP va en `functions.php`. CSS en `style.css`.
- Usar hooks WordPress (`add_action`, `add_filter`) en lugar de modificar archivos core.
- Prefijos de funciones: `horebs_` para funciones del tema/plugins personalizados.
- Nombres de funciones: snake_case en español es aceptable (`remove_state_fields_checkout`).
- WP-CLI se ejecuta **dentro del contenedor DDEV**: `ddev wp <comando>`.
- Xdebug: `ddev xdebug on` antes de depurar, `ddev xdebug off` al terminar.
- **Precios siempre enteros COP**: `25000`, `38900`. Nunca decimales al usuario.
- Validar con `ddev exec php -l <archivo>` antes de proponer cambios PHP.

## Convenciones Python / Analytics

- **`_safe_read_csv(path)`**: usar SIEMPRE para leer CSVs — maneja encodings utf-8/latin-1.
- **`_clean_price_col(series)`**: limpiar columnas con sufijos monetarios (`"25000COP"` → `25000`).
- DataFrames: prefijo `df_` + snake_case en español: `df_orders`, `df_clientes`, `df_order_items`.
- Columnas de fecha siempre enriquecidas con: `year`, `month`, `day`, `day_of_week`, `hour`, `week`, `day_name`, `time_slot`.
- Nombres de días: usar diccionario `DAY_NAMES_ES` de `campaign_strategy.py`.
- Precios de combos: pasar por `_precio_psicologico()` — deben terminar en `900` o `500`.
- Costo estimado de producto: **40% del precio de venta**.
- Categorías por palabras clave: `pizza`, `bebida/coca/gaseosa`, `porción/alitas/papas/adicion`, `postre/brownie`.
- Ejecutar desde raíz: `streamlit run analytics/main.py` o `python analytics/<modulo>.py`.

---

## Entorno local (DDEV)

```bash
ddev start           # Levantar entorno
ddev stop            # Detener entorno
ddev ssh             # Shell dentro del contenedor PHP
ddev wp <comando>    # WP-CLI dentro del contenedor
ddev xdebug on/off   # Xdebug
```
- URL local: `https://pizzeria-horebs.ddev.site`
- DB: `DB_NAME=db`, `DB_USER=db`, `DB_PASSWORD=db`, host `ddev-pizzeria-horebs-db`
- Puerto MySQL (desde host): `127.0.0.1:33060`

---

## Deploy y CI

- **Push a `main`** → Hostinger hace auto-pull en `public_html` → ejecuta `deploy.sh`.
- `deploy.sh` gestiona: backups, permisos (755/644/600), caché LiteSpeed, validación PHP.
- `rollback.sh` para revertir: `./rollback.sh [commit-hash]`.
- CI (`.github/workflows/validate-deploy.yml`): lint PHP + verifica 9 archivos críticos.
- **NO usar WP-CLI en CI** — no hay servidor activo en el runner de GitHub Actions.

---

## Comportamiento del agente Copilot

- **Antes de actuar en código**: leer los archivos relevantes para entender el contexto actual.
- **Cambios en `functions.php`**: siempre verificar los hooks existentes para no duplicar `add_action`/`add_filter`.
- **Cambios de deploy**: validar que no se rompan `deploy.sh` ni el workflow de CI.
- **Proponer antes de ejecutar** cambios que afecten múltiples archivos o el flujo de deploy.
- **Siempre incluir en commits**: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`.
- **Idioma por defecto**: español en comentarios, mensajes de commit y documentación.
- **Precios**: siempre enteros COP, sin decimales, sin separadores de miles en código.

---

## Prioridades de desarrollo

1. **Seguridad** — no exponer credenciales, validar inputs en WooCommerce hooks
2. **Correctitud** — el sitio procesa pagos reales; los bugs afectan ingresos directamente
3. **Rendimiento** — LiteSpeed Cache ya configurado; no agregar cargas innecesarias en el frontend
4. **Legibilidad** — código mantenible por un solo desarrollador (Jorge Sierra)
5. **Simplicidad** — evitar sobreingeniería; soluciones directas de WordPress/WooCommerce sobre frameworks custom

