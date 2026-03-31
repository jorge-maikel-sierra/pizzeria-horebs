---
description: 'Tarea en el pipeline de analytics (data_loader, metrics, combos, campaign_strategy)'
agent: 'agent'
tools: ['search/codebase', 'vscode/openFile']
---

# Tarea Analytics — Pizzería Horeb's

## Contexto del pipeline

```
FASE 1: data_loader.py     → df_orders, df_order_items, df_customers, df_products
FASE 2: metrics.py         → ticket_promedio, top_productos, horas_pico, RFM, LTV, Apriori
FASE 4: combo_generator.py → combos_sugeridos.csv
FASE 5: campaign_strategy.py → campaign_strategy.txt
FASE 3: main.py            → Dashboard Streamlit
```

## Antes de generar código

1. Lee el archivo de la fase relevante para entender funciones y convenciones existentes
2. Verifica si `_safe_read_csv()` y `_clean_price_col()` ya están definidas en el módulo
3. Identifica qué DataFrames están disponibles en la fase

## Reglas obligatorias

- Leer CSVs SIEMPRE con `_safe_read_csv(path)` — nunca `pd.read_csv()` directamente
- Limpiar columnas de precio con `_clean_price_col(series)` si tienen sufijo COP
- Nombres de DataFrames: prefijo `df_` + snake_case español
- Enriquecer fechas con todas las columnas: `year`, `month`, `day`, `day_of_week`, `hour`, `week`, `day_name`, `time_slot`
- Precios de combos: siempre `_precio_psicologico()` (terminar en 900 o 500)
- Costo estimado: 40% del precio de venta
- Categorías por palabras clave: `pizza`, `bebida/coca/gaseosa`, `porción/alitas/papas/adicion`, `postre/brownie`
- **NO modificar** `ventas_procesadas.csv`, `combos_sugeridos.csv`, `campaign_strategy.txt` en código

## Respecto a la separación de fases

- `data_loader.py`: solo carga y limpieza de datos
- `metrics.py`: solo cálculos de métricas (importa funciones de data_loader)
- `combo_generator.py`: solo generación de combos
- `campaign_strategy.py`: solo estrategia de campañas
- `main.py`: solo UI Streamlit (importa de los demás módulos)

No mezclar responsabilidades entre fases.

## Para ejecutar y validar

```bash
source .venv/bin/activate
python analytics/<modulo>.py       # ejecutar módulo
streamlit run analytics/main.py    # ver dashboard completo → http://localhost:8501
```
