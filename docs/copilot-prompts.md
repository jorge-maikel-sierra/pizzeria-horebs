# Guía de Prompts para Copilot — Pizzería Horeb's

Esta guía documenta cómo usar Copilot eficientemente en este proyecto.

---

## Prompt Files disponibles

Los prompt files están en `.github/prompts/` y se invocan con `/nombre-archivo` en el chat de Copilot.

| Comando | Archivo | Cuándo usar |
|---|---|---|
| `/new-woocommerce-feature` | `new-woocommerce-feature.prompt.md` | Crear nueva funcionalidad WP/WC |
| `/fix-bug` | `fix-bug.prompt.md` | Depurar y corregir bugs |
| `/code-review` | `code-review.prompt.md` | Revisar código antes de commit |
| `/analytics-task` | `analytics-task.prompt.md` | Trabajar en el pipeline de analytics |
| `/deploy-checklist` | `deploy-checklist.prompt.md` | Pre-deploy validation |

---

## Patrones de prompts reutilizables

### 1. Agregar un hook de WooCommerce

```
Agrega un hook en functions.php que [descripción del comportamiento].
El hook debe activarse en [woocommerce_hook_name].
Usa el prefijo horebs_ en el nombre de la función.
No restaures los campos de checkout eliminados.
```

**Ejemplo:**
```
Agrega un hook en functions.php que envíe un mensaje de WhatsApp cuando
una orden cambie a estado "completado". El hook debe activarse en
woocommerce_order_status_changed. Usa el prefijo horebs_.
```

---

### 2. Corregir un problema de CSS en el tema

```
El elemento [selector CSS] en [página/sección] muestra [problema].
El fix debe ir en wp-content/themes/hello-elementor-child/style.css.
No modificar archivos del tema padre (hello-elementor).
Solo usa selectores específicos para no afectar otros elementos.
```

---

### 3. Agregar una métrica al dashboard de analytics

```
Agrega una nueva métrica en analytics/metrics.py que calcule [descripción].
- Usa df_orders y df_order_items (ya cargados por data_loader.py)
- Nombra el resultado [nombre_metrica] en snake_case español
- Devuelve el resultado como DataFrame con columnas [col1, col2, ...]
- Muéstralo en main.py en la sección [nombre de sección]
```

---

### 4. Debug de un error específico

```
Estoy viendo este error en [dónde: DDEV/logs/browser]:
[pegar el mensaje de error exacto]

El error ocurre cuando [descripción del flujo].
El archivo involucrado es [ruta del archivo].
Lee el archivo completo antes de proponer un fix.
```

---

### 5. Crear un shortcode de WordPress

```
Crea un shortcode [nombre] que [descripción de lo que hace].
- Debe registrarse en functions.php con add_shortcode()
- Función con prefijo horebs_
- Parámetros opcionales: [lista de parámetros con defaults]
- Output: [descripción del HTML que genera]
- Sanitizar todos los parámetros de entrada
- Escapar el output con esc_html() o wp_kses_post()
```

---

### 6. Crear una nueva fase en el pipeline de analytics

```
Crea un nuevo módulo analytics/[nombre].py para [descripción].
- Input: [qué DataFrames o archivos necesita]
- Output: [qué genera: CSV, dict, DataFrame]
- Usa _safe_read_csv() si lee CSVs adicionales
- Usa _clean_price_col() si hay columnas de precio
- Sigue el patrón de separación de fases del pipeline
- Agrega el módulo a main.py en la sección [nombre]
```

---

### 7. Refactorizar una función existente

```
Refactoriza la función [nombre_función] en [archivo].
- Lee el archivo completo primero
- Objetivo: [más legible / más eficiente / eliminar duplicación / separar responsabilidades]
- Mantener exactamente el mismo comportamiento externo
- No cambiar la firma de la función si ya es usada en otros lados
- Agregar docstring si no existe
```

---

### 8. Revisar cambios antes de commit

```
Revisa los cambios en [archivo(s)] antes de hacer commit.
Usa el criterio del prompt /code-review.
Enfócate especialmente en:
- Seguridad: inputs sanitizados, outputs escapados
- Correctitud: precios en COP entero, campos de checkout no restaurados
- Calidad: sin debug code, prefijos correctos
```

---

## Cómo dar contexto eficiente a Copilot

### Patrón: Contexto → Restricciones → Tarea

```
CONTEXTO: Estoy trabajando en [sistema/módulo].
          El archivo relevante es [ruta].
          [Descripción breve de lo que ya existe]

RESTRICCIONES:
- [Restricción 1]
- [Restricción 2]

TAREA: [Qué quieres que haga Copilot]
```

### Cuándo adjuntar archivos al chat

- **Siempre adjuntar `functions.php`** cuando pidas agregar hooks de WooCommerce
- **Adjuntar el módulo Python completo** cuando pidas modificar el pipeline
- **Adjuntar `deploy.sh`** cuando pidas cambios en el proceso de deploy

### Cuándo usar modo agente vs. modo ask

| Tarea | Modo recomendado |
|---|---|
| Generar código nuevo (feature, hook, función) | **Agente** (puede editar archivos) |
| Revisar código, responder preguntas | **Ask** (solo análisis) |
| Debug paso a paso | **Agente** (puede ejecutar comandos) |
| Documentación | **Ask** o **Agente** |
| Deploy checklist | **Ask** (solo verifica, no modifica) |

---

## Instrucciones siempre activas (copilot-instructions.md)

Las siguientes instrucciones se aplican **automáticamente** en todo el proyecto:

- Lenguaje por defecto: español
- Precios siempre en COP entero
- Prefijo `horebs_` para funciones PHP
- No restaurar campos de checkout eliminados
- No tocar `wp-config.php`
- Incluir trailer `Co-authored-by: Copilot` en commits

## Instrucciones contextuales (.instructions.md)

Se aplican automáticamente según el tipo de archivo:

| Archivo que editas | Instrucciones activas |
|---|---|
| Cualquier `*.php` | `.github/instructions/wordpress-php.instructions.md` |
| `analytics/**/*.py` | `.github/instructions/analytics-python.instructions.md` |
| `deploy.sh`, `rollback.sh`, workflows CI | `.github/instructions/deployment.instructions.md` |
