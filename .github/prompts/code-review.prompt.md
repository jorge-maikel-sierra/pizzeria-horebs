---
description: 'Code review de PHP (WordPress) o Python (Analytics) con foco en seguridad y calidad'
agent: 'ask'
model: 'claude-sonnet-4.6'
---

# Code Review — Pizzería Horeb's

Realiza un code review exhaustivo del código seleccionado o del archivo especificado.

## Criterios de revisión (ordenados por prioridad)

### 🔴 Seguridad (crítico — el sitio procesa pagos reales)
- Inputs de usuario sanitizados con `sanitize_text_field()`, `sanitize_email()`, `absint()` según tipo
- Outputs escapados con `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- Nonces verificados en formularios y acciones admin
- Capacidades verificadas con `current_user_can()` antes de operaciones admin
- Credenciales nunca hardcodeadas en código PHP ni Python
- SQL queries usando `$wpdb->prepare()` — nunca concatenación directa

### 🟠 Correctitud WordPress/WooCommerce
- Hooks `add_action`/`add_filter` no duplicados en `functions.php`
- Campos de checkout eliminados (`billing_state`, etc.) NO restaurados accidentalmente
- Precios en COP entero — sin decimales (`wc_price(25000)` no `wc_price(25000.00)`)
- Compatibilidad con PHP 8.3 (deprecated functions, typed properties, etc.)

### 🟡 Correctitud Python (Analytics)
- Uso de `_safe_read_csv()` en lugar de `pd.read_csv()` directo
- Uso de `_clean_price_col()` para columnas monetarias
- DataFrames con prefijo `df_` y nombres en español
- Precios de combos pasando por `_precio_psicologico()` (terminan en 900/500)
- No modifica archivos generados automáticamente (`ventas_procesadas.csv`, etc.)

### 🟢 Calidad de código
- Funciones PHP con prefijo `horebs_`
- Funciones auxiliares Python con prefijo `_`
- Comentarios solo donde el código no es autoexplicativo
- Sin código comentado o debug prints (`var_dump`, `print_r`, `print()` de debug)

## Formato de respuesta

Devuelve la revisión como lista de issues por prioridad:
```
🔴 CRÍTICO: [descripción + línea + fix sugerido]
🟠 IMPORTANTE: [descripción + línea + fix sugerido]
🟡 MENOR: [descripción + línea]
✅ OK: [qué está bien implementado]
```

Si no hay issues en una categoría, omitirla.
