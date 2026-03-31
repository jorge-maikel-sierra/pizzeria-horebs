# MCP de Hostinger en VS Code – Pizzería Horeb's

> **Integración oficial del Model Context Protocol (MCP) de Hostinger**  
> Permite gestionar dominios, DNS, VPS y facturación directamente desde el Chat de VS Code.

---

## Índice

1. [Requisitos previos](#1-requisitos-previos)
2. [Generar el API Token de Hostinger](#2-generar-el-api-token-de-hostinger)
3. [Configurar la variable de entorno](#3-configurar-la-variable-de-entorno)
4. [Cómo funciona la integración en VS Code](#4-cómo-funciona-la-integración-en-vs-code)
5. [Herramientas disponibles y ejemplos de uso](#5-herramientas-disponibles-y-ejemplos-de-uso)
6. [Validar el entorno](#6-validar-el-entorno)
7. [Solución de problemas](#7-solución-de-problemas)

---

## 1. Requisitos previos

| Requisito | Versión mínima |
|-----------|---------------|
| Node.js   | **20**        |
| npm / npx | Incluido con Node |
| VS Code   | 1.99+         |

### Instalar Node.js con NVM (recomendado)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Recargar la sesión
source ~/.zshrc   # o ~/.bashrc

# Instalar y activar Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Verificar
node --version   # Debe mostrar v20.x.x o superior
npx --version
```

---

## 2. Generar el API Token de Hostinger

1. Inicia sesión en [hPanel](https://hpanel.hostinger.com).
2. Ve a **Cuenta** → **Acceso API** (o dirígete directamente a `https://hpanel.hostinger.com/api-access`).
3. Haz clic en **Generar nuevo token**.
4. Dale un nombre descriptivo (ej. `vscode-mcp-pizzeria`).
5. Copia el token generado — **solo se muestra una vez**.

---

## 3. Configurar la variable de entorno

El token **nunca** debe estar en el código ni en archivos versionados.  
Expórtalo en tu entorno antes de abrir VS Code:

### macOS / Linux (zsh / bash)

```bash
export HOSTINGER_API_TOKEN=tu_token_aqui
```

Para hacerlo permanente, agrégalo a tu `~/.zshrc` o `~/.bashrc`:

```bash
echo 'export HOSTINGER_API_TOKEN=tu_token_aqui' >> ~/.zshrc
source ~/.zshrc
```

### Windows PowerShell

```powershell
setx HOSTINGER_API_TOKEN "tu_token_aqui"
# Reinicia la terminal para que tome efecto
```

### Alternativa: direnv (recomendado para proyectos)

[direnv](https://direnv.net/) carga variables automáticamente al entrar al directorio:

```bash
# Instalar direnv
brew install direnv   # macOS

# En la raíz del proyecto, crear .env (ya está en .gitignore)
echo 'export HOSTINGER_API_TOKEN=tu_token_aqui' > .env

# Permitir direnv para este directorio
direnv allow .
```

> ⚠️ El archivo `.env` está listado en `.gitignore` y **no se versiona**.  
> Usa `.env.example` como referencia del formato.

---

## 4. Cómo funciona la integración en VS Code

El archivo `.vscode/mcp.json` declara el servidor MCP. VS Code lo detecta automáticamente y lo levanta cuando el Chat necesita herramientas de Hostinger:

```jsonc
{
  "servers": {
    "hostinger": {
      "type": "stdio",
      "command": "npx",
      "args": ["hostinger-api-mcp@latest"],
      "env": {
        "API_TOKEN": "${env:HOSTINGER_API_TOKEN}"
      }
    }
  }
}
```

**No se requiere ningún script manual ni servidor adicional.**  
El proceso `npx hostinger-api-mcp@latest` se inicia y detiene automáticamente.

### Verificar que el servidor MCP está activo

1. Abre el **Chat de VS Code** (`Ctrl+Alt+I` / `Cmd+Alt+I`).
2. Haz clic en el ícono de herramientas (🔧) junto al cuadro de chat.
3. Busca **hostinger** en la lista de servidores MCP disponibles.
4. Verás las herramientas listadas (dominios, DNS, VPS, facturación, etc.).

---

## 5. Herramientas disponibles y ejemplos de uso

### Listar dominios

```
@hostinger Lista todos mis dominios registrados
```

### Revisar registros DNS de un dominio

```
@hostinger Muéstrame los registros DNS de pizzeriahorebs.com
```

### Agregar un registro TXT al DNS

```
@hostinger Agrega un registro TXT en pizzeriahorebs.com con nombre @ y valor "v=spf1 include:sendgrid.net ~all"
```

### Consultar estado de VPS

```
@hostinger ¿Cuál es el estado de mis servidores VPS?
```

### Revisar suscripciones activas

```
@hostinger Muéstrame mis suscripciones activas y fechas de renovación
```

### Listar métodos de pago

```
@hostinger ¿Qué métodos de pago tengo registrados?
```

---

## 6. Validar el entorno

Antes de usar el MCP, puedes ejecutar el script de validación incluido en el proyecto:

```bash
bash scripts/check-node.sh
```

El script verifica:

- ✅ Node.js >= 20 instalado
- ✅ npx disponible
- ⚠️ `HOSTINGER_API_TOKEN` definida en el entorno

---

## 7. Solución de problemas

### El servidor "hostinger" no aparece en VS Code

- Asegúrate de que el archivo `.vscode/mcp.json` existe y tiene formato JSON válido.
- Recarga VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`.
- Verifica que Node.js >= 20 esté en el `PATH` que usa VS Code.

### Error: "HOSTINGER_API_TOKEN is not defined"

La variable no está disponible en el entorno de VS Code.  
**Solución:** Exporta la variable **antes** de abrir VS Code:

```bash
export HOSTINGER_API_TOKEN=tu_token_aqui
code .
```

O agrégala permanentemente a `~/.zshrc`.

### Error: "npx: command not found"

Node.js no está en el `PATH` de VS Code.  
Verifica con `which node` y `which npx` en una terminal.  
Si usas NVM, asegúrate de tener configurada la versión por defecto:

```bash
nvm alias default 20
```

### El MCP de Hostinger interfiere con DDEV / WordPress

**No hay riesgo de interferencia.** El MCP de Hostinger:

- Es un proceso Node.js completamente independiente.
- No tiene acceso a la base de datos MySQL/MariaDB de DDEV.
- No modifica ningún archivo PHP ni de WordPress.
- Se ejecuta únicamente cuando el Chat de VS Code lo invoca.

---

## Notas de arquitectura

```
VS Code Chat
    │
    ├── hostinger MCP  ──► npx hostinger-api-mcp@latest ──► API de Hostinger (HTTPS)
    │      (Node.js – proceso independiente)
    │
    └── mariadb-pizzeria MCP ──► @benborla29/mcp-server-mysql ──► DDEV MySQL
           (Node.js – proceso independiente)

WordPress / DDEV / PHP  ──►  (sin conexión con los MCPs)
Analytics Python        ──►  (sin conexión con los MCPs)
```

Los dos servidores MCP coexisten en `.vscode/mcp.json` sin interferencia alguna.
