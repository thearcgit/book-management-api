# Backend Server for Books Collection (NodeJs + TypeScript)
A backend service built using Node.js and TypeScript for managing a books collection,
following clean architecture and best practices.

## Tech Stack

- Node.js(Module)          # Runtime Environment
- Express.js               # Framework
- TypeScript               # Language
- PostgreSQL               # SQL Database
- Prisma                   # ORM for PostgreSQL
- Multer                   # File upload library
- Joi                      # Validation library
- Vitest                   # Testing


## Project Cloning 
git clone https://github.com/thearcgit/book-management-api.git
cd book-management-api

## Install dependencies
```bash
npm install
```

## Environment variables
Create a `.env` file based on `.env.example`.
```env
PORT=9000
DATABASE_URL=postgresql://user:password@localhost:5432/books_management
```


## Setup database
```bash
npx prisma migrate dev
```


**Note:** Prisma Client will be generated automatically during installation.

## Run test
```bash
npm run test
```


## Run server
```bash
npm run dev         # Development
npm start           # Production
```


## Run build
```bash
npm run build
```


## Project Structure

```
/root-project-folder/
    src/

        |-- config/                        # Environment & DB connection
        |-- constants/                     # Application constants
        |-- controllers/                   # Request handler functions
        |-- errors/                        # Custom error logic
        |-- middlewares/                   # Middleware logic
        |-- routes/                        # API routes
        |-- services/                      # Business logic & database interaction
        |-- tests/                         # Unit testing
        |-- types/                         # Types and interfaces for variables
        |-- utils/                         # Helper functions
        |-- validators/                    # Validation logic
        |-- app.ts                         # Express setup
        |-- server.ts                      # Entry point for server

    prisma/
        |-- schema.prisma                 # Prisma schema
        |-- migrations/                   # Database migration

    .env                                  # Secure environment variables
    .env.example                          # Environment variable references
```

**Note:** `.env` is not committed to Github. Refer to `.env.example` for required variables.




## API 

**Base URL:** http://localhost:9000

### Create Book API 
**POST** `/api/books`

`Request body:`
```json
{
    "title": "Interview preparation",           # Must be unique
    "author": "Someone",
    "publishedYear": 2008
}
```
`Response body:`

```json
{
    "id": "uuid",                           
    "title": "Interview preparation",
    "author": "Someone",
    "publishedYear": 2008,
    "createdAt": "2026-01-13T10:00:00.000Z"
}
```
### Get All Book API
**GET** `/api/books`

### Get Specific Book API
**GET** `/api/books/:id`

### Delete Book API
**DELETE** `/api/books/:id`

### Update Book API
**PUT** ``/api/books/:id``

`Request body:`
```json 
{
    "title": "Interview preparation volume 2",           # Must be unique
    "author": "Someone",
    "publishedYear": 2008
}
```

**Note:** This API uses PUT, so the full book object must be provided.
Partial updates are not supported (PATCH is not implemented).


### Import CSV Book API
**POST** `/api/books/import`

**Note:** CSV parsing is implemented manually without using any third-party CSV parsing libraries.


## Postman collection
A Postman collection will be shared separately via email.

        

