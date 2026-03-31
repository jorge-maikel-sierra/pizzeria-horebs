---
name: 'Analytics Python'
description: 'Convenciones para el pipeline de análisis de datos (analytics/)'
applyTo: 'analytics/**/*.py'
---

# Estándares Python — Analytics Pizzería Horeb's

## Lectura de datos (OBLIGATORIO)

- **Siempre** usar `_safe_read_csv(path)` para leer CSVs — maneja encodings utf-8/latin-1 automáticamente
- **Siempre** usar `_clean_price_col(series)` para columnas de precio que pueden tener sufijos como `"25000COP"`
- Fuentes de datos en `analytics/data_exports/` (symlink a `export_wp_database_full/`)
- Archivos clave:
  - `ventas_historicas_woocommerce_llm.csv` — historial de ventas (~17 700 filas)
  - `wp_wc_customer_lookup.csv` — maestro de clientes
  - `product_catalog_*.csv` — catálogo (múltiples archivos con hash; consolidar en `data_loader.py`)

## Naming y convenciones de DataFrames

- Prefijo `df_` obligatorio: `df_orders`, `df_order_items`, `df_customers`, `df_products`
- Variables en snake_case en español: `ticket_promedio`, `top_productos`, `horas_pico`
- Funciones privadas/auxiliares con prefijo `_`: `_safe_read_csv`, `_clean_price_col`, `_precio_psicologico`

## Enriquecimiento de fechas (SIEMPRE aplicar)

Cuando una columna de fecha está disponible, enriquecer con:
```python
df['year'] = df['fecha'].dt.year
df['month'] = df['fecha'].dt.month
df['day'] = df['fecha'].dt.day
df['day_of_week'] = df['fecha'].dt.dayofweek
df['hour'] = df['fecha'].dt.hour
df['week'] = df['fecha'].dt.isocalendar().week
df['day_name'] = df['day_of_week'].map(DAY_NAMES_ES)
df['time_slot'] = # mañana/tarde/noche según hour
```
- Nombres de días: usar diccionario `DAY_NAMES_ES` de `campaign_strategy.py` (no hardcodear)

## Precios y categorías

- **Precios de combos**: pasar siempre por `_precio_psicologico()` — deben terminar en `900` o `500`
- **Costo estimado**: fijo al **40%** del precio de venta (`combo_generator.py`)
- **Moneda**: siempre COP, enteros, sin decimales. Ej: `25000`, `38900`
- **Categorías por palabras clave** (inferencia):
  - `pizza` → categoría pizza
  - `bebida`, `coca`, `gaseosa` → categoría bebida
  - `porción`, `alitas`, `papas`, `adicion` → categoría adición
  - `postre`, `brownie` → categoría postre

## Archivos generados (NO editar manualmente)

- `analytics/ventas_procesadas.csv` — output de `data_loader.py`
- `analytics/combos_sugeridos.csv` — output de `combo_generator.py`
- `analytics/campaign_strategy.txt` — output de `campaign_strategy.py`

## Fases del pipeline

1. `data_loader.py` → carga y limpia datos
2. `metrics.py` → ticket promedio, top productos, horas pico, RFM, LTV, Apriori
3. `combo_generator.py` → combos sugeridos con precios psicológicos
4. `campaign_strategy.py` → estrategia de campañas de marketing
5. `main.py` → dashboard Streamlit que integra todo

Al agregar lógica nueva: respetar esta separación de fases. No mezclar carga de datos con métricas.

## Comandos de ejecución

```bash
# Desde la raíz del repositorio
source .venv/bin/activate
streamlit run analytics/main.py          # Dashboard → http://localhost:8501
python analytics/data_loader.py          # Solo FASE 1
python analytics/metrics.py              # Solo FASE 2
python analytics/combo_generator.py      # Solo FASE 4
python analytics/campaign_strategy.py   # Solo FASE 5
```
