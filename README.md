# Boilerplate Server

## Requisitos

- Node.js 18+
- MySQL 8+

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` en la carpeta `server/` con las siguientes variables:

```env
DATABASE_URL="mysql://user:password@localhost:3306/boilerplate"
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```

## Ejecutar el proyecto

```bash
npm run dev
```

## Base de datos

```bash
npm run db:push    # Sincronizar esquema
npm run db:generate # Generar cliente Prisma
npm run db:studio  # Abrir GUI de Prisma
```