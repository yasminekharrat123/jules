# Jules

## What is Jules

A student management system with a Next.js frontend and Node.js backend.
This app have been created for our entry technical test for our devops teams.

## Features

- View and add students
- View grades of students and add new grades

## Tech Stack

Frontend:

- Next.js
- TypeScript
- Axios
- Tailwind CSS
- Zod

Backend:

- Node.js
- Kysely
- Hono
- Zod
- PostgreSQL

## Prerequisites

- Node.js
- PNPM
- PostgreSQL

## Start the project

### Frontend

1. Navigate to the frontend directory: `cd web`
2. Copy the `.env.example` file to `.env.local` and fill the variables
3. Install the dependencies: `pnpm install`
4. Start the development server: `pnpm run dev`
5. Open `http://localhost:3000` in your browser

### Backend

1. Navigate to the backend directory: `cd api`
2. Copy the `.env.example` file to `.env` and configure your PostgreSQL connection
3. Install the dependencies: `pnpm install`
4. Run database migrations: `pnpm kysely migrate:latest`
5. Start the development server: `pnpm run dev`
6. The API will be available at `http://localhost:3001`

## Environment Variables

### Frontend (.env.local)

```txt
NEXT_PUBLIC_API__URL=<http://domain:port> # The API URL
```

### Backend (.env)

```txt
API__API_PORT=3001 # The port of the API
API__PAGINATION__PAGE_SIZE=20 # The number of items per page
DB__DB_URI=postgres://user:password@host:port/database # The database URI
SEED__USERS__COUNT=50 # The number of users to seed
API__CORS__ALLOWED_HOST_JSON=["http://orgin1.com", "http://orgin2.fr", "http://orgin3.io"] # The allowed hosts for CORS
```
