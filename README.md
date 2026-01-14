# Backend Server for Books Collection (NodeJs + TypeScript)
A backend service built using Node.js and TypeScript for managing a books collection,
following clean architecture and best practices.

## Tech Stack

- Node.js                  # Runtime Environment
- Express.js               # Framework
- TypeScript               # Language
- PostgreSQL               # SQL Database
- Prisma                   # ORM for PostgreSQL
- Multer                   # File upload library
- Joi                      # Validation library
- Vitest                   # Testing library


**Note:** The project uses ES Modules ("type": "module").


## Project Cloning 
git clone https://github.com/thearcgit/book-management-api.git
cd book-management-api

## Environment variables
Create a `.env` file based on `.env.example`.
```env
PORT=9000
DATABASE_URL=postgresql://user:password@localhost:5432/books_management
```


## Install dependencies
```bash
npm install
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

**Tested with:**
- Node.js 22.x
- PostgreSQL 17



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

[**Base URL:**](http://localhost:9000)

- [Books API](./docs/api/books.md)


## Postman collection
A Postman collection will be shared separately via email.

        

