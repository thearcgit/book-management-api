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
- Jest                     # Testing


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

Note: `.env` is not committed to Github. Refer to `.env.example` for required variables.



## Project Cloning 
git clone https://github.com/something/book-management-api.git
cd book-management-api

## Install dependencies
npm install

## Setup database
npx prisma generate
npx prisma migrate dev

## Run server
npm run dev         # Development
npm start           # Production

## Run test
npm run test

## Run build
npm run build

