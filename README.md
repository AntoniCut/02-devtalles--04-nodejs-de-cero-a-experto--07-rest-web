# 07 - REST Web Server

Proyecto del curso **Node.js de Cero a Experto** (DevTalles).  
Exploración progresiva de servidores HTTP en Node.js, desde el módulo nativo `http` hasta **Express 5**.

---

## Tecnologías

| Paquete | Versión | Uso |
|---|---|---|
| Node.js | v24+ | Runtime |
| TypeScript | ^6.0 | Lenguaje |
| tsx | ^4.19 | Ejecución y watch en desarrollo |
| Express | ^5.2 | Servidor web |
| dotenv | ^17.4 | Carga de variables de entorno |
| env-var | ^7.5 | Validación de variables de entorno |

---

## Scripts

```bash
pnpm run dev               # Servidor principal (app.ts) — puerto 8080
pnpm run dev-introduccion  # Servidor de introducción (app-01) — puerto 8000
pnpm run dev-http          # Servidor HTTP básico (app-02)
pnpm run dev-http2         # Servidor HTTP2 (app-03)
pnpm run dev-express       # Servidor Express (app-04) — puerto definido en .env
pnpm run build             # Compila TypeScript a dist/
pnpm run start             # Build + ejecuta dist/app.js
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3001
PUBLIC_PATH=public
```

| Variable | Requerida | Descripción |
|---|---|---|
| `PORT` | ✅ | Puerto en el que escucha el servidor Express |
| `PUBLIC_PATH` | ❌ | Carpeta pública a servir (por defecto: `public`) |

---

## Estructura del proyecto

```
07-rest-web/
├── src/
│   ├── app.ts                    # Servidor HTTP con archivos estáticos (puerto 8080)
│   ├── app-01-introduccion.ts    # Introducción: rutas / y /data
│   ├── app-02-http.ts            # Servidor HTTP básico
│   ├── app-03-http2.ts           # Servidor HTTP2
│   ├── app-04-express.ts         # Servidor Express con variables de entorno
│   ├── config/
│   │   └── envs.ts               # Validación de variables de entorno
│   └── presentation/
│       └── server.ts             # Clase Server de Express
├── public/                       # Archivos estáticos (HTML, CSS, JS, favicon)
├── react-app-router/             # Build de React servido como SPA
└── .env                          # Variables de entorno (no incluido en git)
```

---

## Instalación

```bash
pnpm install
```
