# Arquitectura — Pizzería Horeb's

## Visión general

Este repositorio contiene **dos sistemas completamente independientes**. No tienen dependencias entre sí en tiempo de ejecución.

```
pizzeria-horebs/
├── [WordPress core + WooCommerce]   ← Sistema 1: sitio web
└── analytics/                       ← Sistema 2: pipeline de datos (no versionado)
```

---

## Sistema 1: WordPress + WooCommerce

### Stack tecnológico
| Capa | Tecnología |
|---|---|
| Lenguaje | PHP 8.3 |
| CMS | WordPress 6.x |
| E-commerce | WooCommerce |
| Constructor visual | Elementor Pro |
| Tema base | Hello Elementor |
| Tema activo | `hello-elementor-child` |
| Pagos | Mercado Pago (COP) |
| POS | YITH Point of Sale |
| SEO | Yoast SEO + Local SEO |
| Email | Sendinblue / WP Mail SMTP Pro |
| Servidor local | DDEV (Docker) |
| Servidor producción | Hostinger (Linux/LiteSpeed) |
| Base de datos | MariaDB |
| Caché | LiteSpeed Cache |

### Estructura de archivos clave

```
wp-content/
├── themes/
│   ├── hello-elementor/              ← tema padre (no modificar)
│   └── hello-elementor-child/        ← TEMA ACTIVO
│       ├── functions.php             ← hooks y personalizaciones PHP
│       ├── style.css                 ← CSS personalizado
│       └── header.php                ← template de cabecera
├── plugins/
│   ├── kiosko/                       ← plugin POS personalizado
│   └── [plugins terceros]            ← no versionar si son >5MB
└── uploads/                          ← NO versionado
```

### Flujo de datos en WooCommerce

```
Cliente → Checkout → Mercado Pago → Webhook → WooCommerce Order
                                              ↓
                                   YITH POS (punto de venta)
                                              ↓
                                   Exportar a BD → export_wp_database_full/
                                              ↓
                                   analytics/ (análisis offline)
```

### Decisiones de arquitectura documentadas

| Decisión | Razón |
|---|---|
| Campos de checkout eliminados (estado, empresa, país, ciudad, CP) | Negocio solo en Colombia (Bogotá); simplifica el flujo de compra |
| Tema hijo de Hello Elementor | Actualiza el padre sin perder personalizaciones |
| LiteSpeed Cache | Servidor Hostinger ya lo incluye; no agregar otro plugin de caché |
| Mercado Pago como único gateway | Estándar en Colombia; no agregar PayPal ni Stripe |
| WP-CLI solo dentro de DDEV | El contenedor Docker tiene el env correcto; no usar WP-CLI del host |

---

## Sistema 2: Analytics Python

### Stack tecnológico
| Capa | Tecnología |
|---|---|
| Lenguaje | Python 3.x |
| Dashboard | Streamlit |
| Análisis | Pandas, NumPy |
| ML | mlxtend (Apriori), scikit-learn |
| Visualización | Plotly, Matplotlib |

### Arquitectura del pipeline (5 fases)

```
export_wp_database_full/
  ventas_historicas_woocommerce_llm.csv   ← ~17 700 filas de ítems
  wp_wc_customer_lookup.csv               ← maestro de clientes
  product_catalog_*.csv                   ← catálogo (múltiples archivos)
        │
        └──→ analytics/data_exports/ (symlink)
                │
    ┌───────────┴──────────────────────────────────┐
    │ FASE 1: data_loader.py                        │
    │   Output: df_orders, df_order_items,          │
    │           df_customers, df_products           │
    │   Genera: ventas_procesadas.csv               │
    └───────────┬──────────────────────────────────┘
                │
    ┌───────────┴──────────────────────────────────┐
    │ FASE 2: metrics.py                            │
    │   Input: data_loader.py functions             │
    │   Output: ticket_promedio, top_productos,     │
    │           horas_pico, RFM, LTV, Apriori       │
    └───────────┬──────────────────────────────────┘
                │
    ┌───────────┴──────────────────────────────────┐
    │ FASE 4: combo_generator.py                    │
    │   Output: combos_sugeridos.csv                │
    └───────────┬──────────────────────────────────┘
                │
    ┌───────────┴──────────────────────────────────┐
    │ FASE 5: campaign_strategy.py                  │
    │   Output: campaign_strategy.txt               │
    └───────────┬──────────────────────────────────┘
                │
    ┌───────────┴──────────────────────────────────┐
    │ FASE 3: main.py (Dashboard Streamlit)         │
    │   Integra todas las fases                     │
    │   URL: http://localhost:8501                  │
    └──────────────────────────────────────────────┘
```

---

## Infraestructura de deploy

```
Desarrollador
    │ git push origin main
    ▼
GitHub
    │ webhook
    ▼
.github/workflows/validate-deploy.yml
    │ PHP lint + verificar archivos críticos
    │ (falla → bloquea deploy)
    ▼
Hostinger Git
    │ auto-pull en public_html/
    ▼
deploy.sh (ejecutado automáticamente)
    │ backup → permisos → caché → validación
    ▼
Sitio actualizado en producción
```

### Rollback

```bash
./rollback.sh              # Revierte al commit anterior (HEAD~1)
./rollback.sh abc1234      # Revierte a un commit específico
```

---

## MCP Servers (VS Code)

| Servidor | Propósito | Config |
|---|---|---|
| `mariadb-pizzeria` | Acceso SQL a BD de DDEV | `.vscode/mcp.json` |
| `hostinger` | Gestión de dominios/DNS/VPS via Hostinger API | `.vscode/mcp.json` (requiere `HOSTINGER_API_TOKEN`) |

Ver `docs/mcp-hostinger.md` para configuración del token de Hostinger.
