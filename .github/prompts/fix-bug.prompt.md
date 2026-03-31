---
description: 'Debug guiado de bugs en WordPress/WooCommerce o Python Analytics'
agent: 'agent'
tools: ['search/codebase', 'vscode/openFile']
---

# Fix Bug — Pizzería Horeb's

## Paso 1: Clasifica el bug

¿En qué sistema está el bug?
- **WordPress/WooCommerce**: errores PHP, hooks fallando, checkout, pagos, YITH POS
- **Analytics Python**: errores en pipeline de datos, dashboard Streamlit, CSVs

## Paso 2: Recopila contexto (para bugs WordPress)

1. ¿Qué comportamiento esperabas vs. qué ocurrió?
2. ¿El error aparece en producción, local (DDEV), o ambos?
3. ¿Hay mensaje de error en logs? (ubicaciones):
   - PHP errors: `/var/log/php8.3-fpm.log` o `WP_DEBUG_LOG` en `wp-content/debug.log`
   - WooCommerce: WC logs en `wp-content/uploads/wc-logs/`
   - DDEV: `ddev logs`

Para activar debug en DDEV:
```bash
ddev wp config set WP_DEBUG true
ddev wp config set WP_DEBUG_LOG true
ddev wp config set WP_DEBUG_DISPLAY false
```

Para Xdebug:
```bash
ddev xdebug on
# Luego usar VS Code debugger (F5 con configuración "Listen for Xdebug")
```

## Paso 3: Investiga antes de proponer fix

- Lee el archivo afectado completo
- Verifica que el hook no esté duplicado en `functions.php`
- Comprueba la prioridad del hook si hay conflictos

## Paso 4: Propón y valida el fix

Después de generar el fix:
```bash
ddev exec php -l wp-content/themes/hello-elementor-child/functions.php
```

## Para bugs Python (Analytics)

1. ¿En qué fase falla? (data_loader / metrics / combo_generator / campaign_strategy / main)
2. ¿Hay error de encoding? → verificar uso de `_safe_read_csv()`
3. ¿Error en precios? → verificar uso de `_clean_price_col()`
4. ¿Error de fecha? → verificar enriquecimiento con columnas `year`, `month`, `day`, etc.

Comando para ejecutar con traceback completo:
```bash
source .venv/bin/activate
python -u analytics/<modulo>.py 2>&1
```
