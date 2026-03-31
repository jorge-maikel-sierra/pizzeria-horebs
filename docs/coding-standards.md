# Estándares de Código — Pizzería Horeb's

## PHP / WordPress

### Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Funciones del tema/plugin | `horebs_` + snake_case | `horebs_get_order_total` |
| Hooks propios | `horebs/` + slug | `do_action('horebs/order_placed', $order)` |
| Variables | snake_case | `$order_total`, `$customer_id` |
| Constantes | UPPER_SNAKE_CASE | `HOREBS_VERSION`, `HOREBS_PLUGIN_DIR` |
| Clases | PascalCase | `HorebsOrderHelper` |
| Archivos de clase | `class-nombre.php` | `class-horebs-order-helper.php` |

### Estructura de `functions.php`

```php
<?php
/**
 * Propósito del bloque de funciones.
 * Breve descripción de qué hace este grupo de hooks.
 */

/**
 * Nombre descriptivo de la función.
 *
 * @param tipo $param Descripción.
 * @return tipo Descripción del return.
 */
function horebs_nombre_descriptivo( $param ) {
    // implementación
}
add_action( 'hook', 'horebs_nombre_descriptivo', 10, 1 );
```

### Seguridad — obligatorio

```php
// Sanitizar inputs (elegir según tipo):
$texto     = sanitize_text_field( $_POST['campo'] );
$email     = sanitize_email( $_POST['email'] );
$entero    = absint( $_POST['cantidad'] );
$html      = wp_kses_post( $_POST['descripcion'] );

// Escapar outputs (elegir según contexto):
echo esc_html( $variable );        // texto plano
echo esc_attr( $variable );        // atributos HTML
echo esc_url( $variable );         // URLs
echo wp_kses_post( $variable );    // HTML permitido

// Nonces:
wp_nonce_field( 'horebs_accion', 'horebs_nonce' );
if ( ! wp_verify_nonce( $_POST['horebs_nonce'], 'horebs_accion' ) ) {
    wp_die( 'Solicitud no válida.' );
}

// Capacidades:
if ( ! current_user_can( 'manage_woocommerce' ) ) {
    return;
}
```

### Precios (crítico)

```php
// ✅ CORRECTO — entero COP
$precio = 25000;
echo wc_price( 25000 );

// ❌ INCORRECTO — no usar decimales
$precio = 25000.00;
echo '$25.000,00 COP';
```

### Antipatrones a evitar

```php
// ❌ No modificar archivos de wp-includes/ ni wp-admin/
// ❌ No usar mysql_query() ni consultas SQL directas sin $wpdb->prepare()
// ❌ No dejar var_dump() ni print_r() en código de producción
// ❌ No hardcodear URLs: usar get_home_url(), plugins_url(), get_template_directory_uri()
// ❌ No restaurar campos de checkout eliminados sin justificación del usuario
```

---

## Python / Analytics

### Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| DataFrames | `df_` + snake_case español | `df_orders`, `df_clientes` |
| Funciones auxiliares | `_` + snake_case | `_safe_read_csv`, `_clean_price_col` |
| Variables de métricas | snake_case español | `ticket_promedio`, `horas_pico` |
| Constantes | UPPER_SNAKE_CASE | `DAY_NAMES_ES`, `PRICE_COST_RATIO` |
| Módulos | snake_case | `data_loader.py`, `combo_generator.py` |

### Lectura de datos — obligatorio

```python
# ✅ CORRECTO
df = _safe_read_csv("analytics/data_exports/ventas.csv")
df['precio'] = _clean_price_col(df['precio'])

# ❌ INCORRECTO — no maneja encodings
df = pd.read_csv("ventas.csv")
```

### Enriquecimiento de fechas — obligatorio

```python
def enriquecer_fechas(df: pd.DataFrame, col: str = 'fecha') -> pd.DataFrame:
    df['year'] = df[col].dt.year
    df['month'] = df[col].dt.month
    df['day'] = df[col].dt.day
    df['day_of_week'] = df[col].dt.dayofweek
    df['hour'] = df[col].dt.hour
    df['week'] = df[col].dt.isocalendar().week.astype(int)
    df['day_name'] = df['day_of_week'].map(DAY_NAMES_ES)
    df['time_slot'] = pd.cut(df['hour'],
                             bins=[0, 12, 18, 24],
                             labels=['mañana', 'tarde', 'noche'],
                             right=False)
    return df
```

### Precios psicológicos — obligatorio para combos

```python
# ✅ CORRECTO — termina en 900 o 500
precio = _precio_psicologico(raw_price)  # ej: 37900, 25500

# Costo estimado: siempre 40% del precio de venta
costo = precio * 0.40
```

### Categorías de productos — inferencia por palabras clave

```python
CATEGORIAS_KEYWORDS = {
    'pizza': ['pizza'],
    'bebida': ['bebida', 'coca', 'gaseosa'],
    'adicion': ['porción', 'alitas', 'papas', 'adicion'],
    'postre': ['postre', 'brownie'],
}
```

### Antipatrones a evitar

```python
# ❌ No modificar archivos generados directamente:
# ventas_procesadas.csv, combos_sugeridos.csv, campaign_strategy.txt

# ❌ No mezclar fases: data_loader no debe calcular métricas

# ❌ No usar print() para debug en producción — usar logging

# ❌ No hardcodear rutas absolutas — usar Path relativas:
from pathlib import Path
BASE_DIR = Path(__file__).parent
data_path = BASE_DIR / "data_exports" / "ventas.csv"
```

---

## Git — Commits

### Formato
```
tipo(scope): descripción breve en español (máx 72 chars)

Cuerpo opcional si se necesita más contexto.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

### Tipos permitidos
| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Refactorización sin cambio de comportamiento |
| `style` | Cambios de CSS o formato visual |
| `docs` | Documentación |
| `chore` | Tareas de mantenimiento (dependencias, config) |
| `deploy` | Cambios en scripts de deploy o CI |
| `security` | Correcciones de seguridad |

### Scopes comunes
`theme`, `woocommerce`, `checkout`, `analytics`, `deploy`, `mcp`, `docs`

### Ejemplos
```
feat(checkout): agregar validación de dirección para Bogotá
fix(theme): corregir CSS del hero en móvil
deploy(ci): agregar lint de analytics/main.py al workflow
security(mcp): mover token Hostinger a variable de entorno
```
