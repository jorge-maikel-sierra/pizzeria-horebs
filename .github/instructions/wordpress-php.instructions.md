---
name: 'WordPress PHP'
description: 'Convenciones y patrones para archivos PHP de WordPress/WooCommerce'
applyTo: '**/*.php'
---

# Estándares PHP — Pizzería Horeb's

## Estructura y naming

- Prefijo de funciones personalizadas: `horebs_`
- Nombres de funciones en snake_case (español permitido): `horebs_remove_checkout_fields`
- Variables en camelCase o snake_case: `$order_total`, `$customerData`
- Constantes en UPPER_SNAKE_CASE: `HOREBS_VERSION`
- Clases en PascalCase: `HorebsOrderHelper`

## WordPress hooks

- Usar `add_action()` y `add_filter()` en lugar de modificar core de WP
- Siempre verificar si el hook ya existe antes de agregarlo (evitar duplicados en `functions.php`)
- Prioridades: usar valor explícito si el orden importa (`add_action('init', 'mi_funcion', 20)`)
- `__return_false` / `__return_true` para filtros simples de booleanos

## WooCommerce — reglas críticas

- **LOS CAMPOS DE CHECKOUT ELIMINADOS NO SE RESTAURAN** sin instrucción explícita:
  - `billing_state`, `billing_company`, `shipping_state`, `shipping_company`
  - `billing_country`, `shipping_country`
  - `billing_city`, `shipping_city`
  - `billing_postcode`, `shipping_postcode`
  - Estos campos se eliminan en `remove_state_fields_checkout()` — es intencional para Colombia
- Precios **siempre enteros COP**: `wc_price(25000)` — sin decimales, sin separador de miles en código
- Para obtener totales de orden: `$order->get_total()` (retorna float, formatear al mostrar)
- Hooks de checkout: preferir `woocommerce_checkout_fields` para campos, `woocommerce_order_status_changed` para acciones post-pago
- Templates WooCommerce: sobrescribir en `wp-content/themes/hello-elementor-child/woocommerce/`

## Elementor

- Las personalizaciones de widgets van en `functions.php` con hook `elementor/widgets/register`
- CSS de Elementor: agregar a `style.css` del tema hijo con selectores específicos
- No modificar plantillas de Elementor Pro directamente; usar hooks o CSS override

## Validación antes de proponer código PHP

- Verificar que el archivo existe y leer su contenido completo antes de modificar
- Tras generar código: `ddev exec php -l wp-content/themes/hello-elementor-child/functions.php`
- Nunca modificar `wp-config.php`, `wp-config-ddev.php`, ni archivos de `wp-includes/`, `wp-admin/`

## Sanitización y seguridad

- Sanitizar inputs del usuario: `sanitize_text_field()`, `sanitize_email()`, `absint()` según el tipo
- Escapar outputs: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- Nonces para formularios: `wp_nonce_field()` / `wp_verify_nonce()`
- Capacidades: verificar con `current_user_can('manage_woocommerce')` antes de acciones admin
