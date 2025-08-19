# Jules - API

## Prerequisites

- Node.js
- PostgreSQL
- PNPM

## Start the project

- Create a new database in your postgres server
- Copy the `.env.example` file to `.env` and fill the variables `cp .env.example .env`
- Install the dependencies `pnpm install`
- Run the migrations `pnpm kysely migrate:latest`
- Run the seed `pnpm kysely seed:run`
- Run the project `pnpm run dev`

## Linter, formatter and type checking

To run the linter, formatter and type checking, run the following command:

```bash
pnpm run lint:check
pnpm run format:check
pnpm run typecheck
pnpm run check:all
```

If you want to fix the errors, you can run the following command:

```bash
pnpm run lint:fix
pnpm run format:fix
pnpm run fix:all
```

## API Documentation

The api has the following routes:

### Students

- `POST /students/`
  - Creates a new student
  - Required body parameters:
    - firstName (string): Student's first name
    - lastName (string): Student's last name
    - age (number): Student's age

- `GET /students/:id/`
  - Gets a specific student by ID
  - Required path parameters:
    - id (number): Student's ID

- `GET /students/`
  - Gets a paginated list of all students
  - Required query parameters:
    - page : Page number for pagination

### Grades

- `POST /grades/`
  - Creates a new grade for a student
  - Required body parameters:
    - subject (string): Subject name
    - grade (number, 1-20): Grade value
    - studentId (number): ID of the student

- `GET /grades/`
  - Gets a paginated list of all grades
  - Required query parameters:
    - page : Page number for pagination

## WARNING

Seeds is reseting the db when you run it.
Don't run in prod.
