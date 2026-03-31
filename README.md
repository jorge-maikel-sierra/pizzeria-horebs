# Pizzería Horeb's

Sitio web de e-commerce de pizzería colombiana, construido con **WordPress + WooCommerce**. Ofrece pedidos online para entrega a domicilio, recoger en local y consumo en el punto de venta.

**URL producción**: [pizzeriahorebs.com](https://pizzeriahorebs.com)  
**URL local (DDEV)**: `https://pizzeria-horebs.ddev.site`

---

## Stack

- **CMS**: WordPress 6.x + WooCommerce
- **Tema**: Hello Elementor Child
- **Constructor**: Elementor Pro
- **Pagos**: Mercado Pago (COP)
- **POS**: YITH Point of Sale
- **Entorno local**: DDEV (Docker)
- **Deploy**: Hostinger Git (auto-deploy en push a `main`)

---

## Instalación local (DDEV)

### Prerrequisitos
- [Git](https://git-scm.com/)
- [DDEV](https://ddev.readthedocs.io/en/stable/#installation) v1.22+
- [Docker](https://www.docker.com/get-started)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/jorge-maikel-sierra/pizzeriahorebs.git
cd pizzeriahorebs

# 2. Iniciar el entorno
ddev start

# 3. Importar base de datos (solicitar backup al equipo)
ddev import-db --file=backup.sql.gz

# 4. Abrir el sitio
ddev launch
# → https://pizzeria-horebs.ddev.site
```

### Comandos DDEV esenciales

```bash
ddev start           # Levantar entorno
ddev stop            # Detener entorno
ddev ssh             # Shell dentro del contenedor
ddev wp <comando>    # WP-CLI (ej: ddev wp plugin list)
ddev xdebug on/off   # Activar/desactivar Xdebug
ddev logs            # Ver logs del contenedor
```

---

## Estructura del proyecto

```
pizzeria-horebs/
├── wp-content/
│   ├── themes/hello-elementor-child/   ← Tema activo (personalizar aquí)
│   │   ├── functions.php               ← Hooks y customizaciones PHP
│   │   └── style.css                   ← CSS personalizado
│   └── plugins/kiosko/                 ← Plugin POS personalizado
├── .github/
│   ├── copilot-instructions.md         ← Instrucciones para GitHub Copilot
│   ├── instructions/                   ← Instrucciones por tipo de archivo
│   └── prompts/                        ← Prompt files para tareas comunes
├── docs/
│   ├── DEPLOY.md                       ← Guía completa de deploy
│   ├── architecture.md                 ← Arquitectura del sistema
│   ├── coding-standards.md             ← Estándares de código
│   ├── workflows.md                    ← Flujos de desarrollo
│   └── copilot-prompts.md              ← Guía de prompts para Copilot
├── deploy.sh                           ← Script post-deploy (Hostinger)
└── rollback.sh                         ← Rollback manual
```

---

## Deploy

El deploy es **automático** vía Hostinger Git:

```bash
git push origin main
# → CI valida PHP lint + archivos críticos
# → Hostinger hace auto-pull en public_html
# → deploy.sh ejecuta: backups, permisos, caché, validación
```

Para rollback:
```bash
./rollback.sh              # Revierte al commit anterior
./rollback.sh <commit>     # Revierte a un commit específico
```

Ver `docs/DEPLOY.md` para documentación completa.

---

## Uso con GitHub Copilot

Este repositorio está configurado para máximo aprovechamiento de GitHub Copilot (modo agente). Ver `docs/copilot-prompts.md` para la guía completa.

### Prompt files disponibles

Desde el chat de Copilot en VS Code:

| Comando | Descripción |
|---|---|
| `/new-woocommerce-feature` | Scaffold de nueva feature WooCommerce |
| `/fix-bug` | Debug guiado PHP o Python |
| `/code-review` | Revisión de código con foco en seguridad |
| `/analytics-task` | Tarea en el pipeline de análisis |
| `/deploy-checklist` | Checklist pre-deploy |

### MCP Servers configurados

- **mariadb-pizzeria**: Consultas SQL a la BD de DDEV
- **hostinger**: Gestión de dominios/DNS/VPS vía API

Requiere exportar `HOSTINGER_API_TOKEN` en tu shell. Ver `docs/mcp-hostinger.md`.

---

## Creado por

[Jorge Sierra](https://jorgesierra.dev) — [@jorge-maikel-sierra](https://github.com/jorge-maikel-sierra)

## Licencia

MIT — ver [LICENSE](license.txt)
