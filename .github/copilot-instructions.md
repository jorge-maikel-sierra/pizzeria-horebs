# Copilot Instructions – Pizzería Horeb's

## Arquitectura general

Este repositorio tiene **dos sistemas independientes**:

1. **WordPress + WooCommerce** (raíz del proyecto): Sitio web de e-commerce de pizzería. Se ejecuta exclusivamente con **DDEV** en local. No modificar `wp-config.php` ni `wp-config-ddev.php` (son autogenerados por DDEV).
2. **Analytics (`analytics/`)**: Pipeline de análisis de datos en Python puro (Streamlit + Pandas). Opera de forma completamente independiente a WordPress.

## Entorno de desarrollo WordPress (DDEV)

El entorno local usa [DDEV](https://ddev.readthedocs.io/). Los comandos esenciales son:
```bash
ddev start           # Levantar entorno
ddev stop            # Detener entorno
ddev ssh             # Shell dentro del contenedor PHP
ddev wp <comando>    # Ejecutar WP-CLI dentro del contenedor
ddev xdebug on/off   # Habilitar/deshabilitar Xdebug
```
URL local: `https://pizzeria-horebs.ddev.site`  
DB: `DB_NAME=db`, `DB_USER=db`, `DB_PASSWORD=db`, host `ddev-pizzeria-horebs-db`

## Tema activo

**`hello-elementor-child`** (`wp-content/themes/hello-elementor-child/`). El tema hijo extiende Hello Elementor. Las personalizaciones PHP van en `functions.php`. El CSS personalizado va en `style.css`.

Patrón establecido en `functions.php`: los campos de estado, empresa, país, ciudad y código postal **están eliminados del checkout** vía `woocommerce_checkout_fields`. No restaurarlos sin causa justificada.

## Plugins clave

| Plugin | Propósito |
|---|---|
| Elementor / Elementor Pro | Constructor de páginas |
| WooCommerce + Mercado Pago | E-commerce y pagos (COP) |
| YITH Point of Sale | Punto de venta presencial |
| Yoast SEO + Local SEO | SEO |
| Sendinblue / WP Mail SMTP Pro | Email marketing y SMTP |

## Sistema Analytics Python

### Flujo de datos (por fases)
```
export_wp_database_full/  ←──── exportaciones crudas de la BD WP
        │
        └─▶  analytics/data_exports/  (symlink)
                    │
        FASE 1: data_loader.py  →  df_orders, df_order_items, df_customers, df_products
        FASE 2: metrics.py      →  ticket_promedio, top_productos, horas_pico, RFM, LTV, Apriori
        FASE 4: combo_generator.py  →  combos_sugeridos.csv
        FASE 5: campaign_strategy.py → campaign_strategy.txt
        FASE 3: main.py         →  Dashboard Streamlit (integra todo)
```

### Comandos de ejecución
```bash
# Desde la raíz del repositorio
python -m venv .venv && source .venv/bin/activate
pip install -r analytics/requirements.txt

streamlit run analytics/main.py          # Dashboard completo → http://localhost:8501
python analytics/data_loader.py          # Solo FASE 1
python analytics/metrics.py              # Solo FASE 2
python analytics/combo_generator.py      # Solo FASE 4
python analytics/campaign_strategy.py   # Solo FASE 5
```

### Convenciones del código Python

- **`_safe_read_csv(path)`**: usar siempre para leer CSVs (maneja encodings utf-8/latin-1).
- **`_clean_price_col(series)`**: limpiar columnas de precio con sufijos monetarios (ej. `"25000COP"`).
- Los DataFrames siguen el prefijo `df_` y nombres en snake_case en español (`df_orders`, `df_clientes`).
- Las columnas de fecha siempre se enriquecen con `year`, `month`, `day`, `day_of_week`, `hour`, `week`, `day_name`, `time_slot`.
- Los nombres de días usan el diccionario `DAY_NAMES_ES` definido en `campaign_strategy.py`.
- Los precios finales de combos pasan por `_precio_psicologico()` (terminan en 900 o 500).
- El costo estimado de producto se fija al **40% del precio de venta** (`combo_generator.py`).
- Categorías de productos se infieren por palabras clave: `"pizza"`, `"bebida/coca/gaseosa"`, `"porción/alitas/papas/adicion"`, `"postre/brownie"`.

### Fuentes de datos críticas
- `ventas_historicas_woocommerce_llm.csv` – historial principal (~17 700 filas de ítems de orden)
- `wp_wc_customer_lookup.csv` – maestro de clientes
- `product_catalog_*.csv` – catálogo (múltiples archivos con hash en el nombre, se consolidan en `data_loader.py`)

## Moneda y localización

La divisa del negocio es **COP (pesos colombianos)**. Los precios siempre son enteros grandes (ej. `25000`, `38900`). No usar decimales en precios al usuario.

## Archivos a no modificar

- `wp-config.php` y `wp-config-ddev.php` (autogenerados por DDEV)
- `analytics/ventas_procesadas.csv`, `combos_sugeridos.csv`, `campaign_strategy.txt` (archivos generados automáticamente)
- Archivos en `export_wp_database_full/` (exportaciones de solo lectura de la BD)

## Deploy a producción

El deploy es automático vía **Hostinger Git**. Push a `main` → auto-pull en `public_html`.

- **Documentación completa**: `docs/DEPLOY.md`
- **Script post-deploy**: `deploy.sh` (permisos, caché, validación)
- **Rollback**: `rollback.sh`
- **CI**: `.github/workflows/validate-deploy.yml` (lint PHP, verificar archivos)
- **NO versionar**: `wp-config.php`, `wp-content/uploads/`, `.ddev/`, `analytics/`
