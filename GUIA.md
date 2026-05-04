# Boilerplate - Next.js + Express + MySQL + Prisma

## Requisitos

- Docker Desktop
- Node.js 18+

##一步 1: Levantar la base de datos

```bash
docker-compose up -d
```

MySQL 8 disponible en `localhost:3306`

## Paso 2: Instalar dependencias

```bash
npm install
```

## Paso 3: Generar cliente Prisma y crear tablas

```bash
cd server
npm run db:generate
npm run db:push
```

## Paso 4: Ejecutar el proyecto

```bash
npm run dev
```

- Frontend (Next.js): http://localhost:3000
- API (Express): http://localhost:3001

## Actualizar la base de datos

Cuando hagas cambios en `server/prisma/schema.prisma`:

```bash
cd server
npm run db:push
```

Este comando sincroniza la BD con el schema y regenera el cliente Prisma.

## Estructura del proyecto

```
boilerplate/
├── docker-compose.yml
├── package.json
├── client/                 # Next.js frontend
│   ├── package.json
│   ├── next.config.js
│   └── app/
│       ├── layout.js
│       └── page.js
└── server/                 # Express + Prisma + MySQL
    ├── package.json
    ├── .env
    ├── index.js
    └── prisma/
        └── schema.prisma
```

## API Endpoints

| Metodo | Endpoint         | Descripcion          |
|--------|------------------|----------------------|
| GET    | /api/users       | Listar todos los usuarios |
| GET    | /api/users/:id    | Obtener un usuario   |
| POST   | /api/users        | Crear un usuario     |
| DELETE | /api/users/:id    | Eliminar un usuario  |

## Datos de conexion MySQL

- Host: localhost
- Puerto: 3306
- Usuario: root
- Password: password
- Base de datos: boilerplate
