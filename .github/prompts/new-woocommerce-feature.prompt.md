---
description: 'Scaffold de una nueva feature o hook de WooCommerce/WordPress'
agent: 'agent'
tools: ['search/codebase', 'vscode/openFile']
---

# Nueva Feature WordPress/WooCommerce — Pizzería Horeb's

Antes de generar código, revisa el contexto del proyecto:
1. Lee `wp-content/themes/hello-elementor-child/functions.php` para ver los hooks existentes
2. Identifica si la feature requiere: nuevo hook, shortcode, widget Elementor, o endpoint REST

## Información requerida

- **¿Qué hace esta feature?** (describe el comportamiento esperado)
- **¿Dónde se activa?** (frontend checkout, admin, POS, API)
- **¿Afecta WooCommerce?** (ordenes, productos, checkout, pagos)

## Reglas de generación

- Prefijo de funciones: `horebs_`
- Agregar código en `functions.php` usando hooks, no modificando archivos core
- **NO restaurar** campos de checkout eliminados (estado, empresa, país, ciudad, CP)
- Precios siempre en COP entero (ej: `25000`), sin decimales
- Sanitizar inputs con `sanitize_text_field()`, escapar outputs con `esc_html()`
- Incluir comentario de bloque con propósito de la función

## Estructura esperada del output

```php
/**
 * [Descripción de la función]
 *
 * @param [tipo] [nombre] [descripción]
 * @return [tipo] [descripción]
 */
function horebs_nombre_descriptivo( $param ) {
    // implementación
}
add_action( 'hook_apropiado', 'horebs_nombre_descriptivo', 10, 1 );
```

## Validación post-generación

Confirma que el código generado:
- No duplica `add_action`/`add_filter` ya existentes en `functions.php`
- Tiene sanitización/escapado adecuado
- Es compatible con PHP 8.3
