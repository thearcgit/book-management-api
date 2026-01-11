# Backend Server for Books Collection (NodeJs + TypeScript)

## Tech Stack

- Node.js                  # Runtime Environment
- Express.js               # Framework
- TypeScript               # Language
- PostgreSQL               # SQL Database
- Prisma                   # ORM for PostgreSQL
- Multer                   # File upload library
- joi                      # Validation library
- Jest                     # Test


## Project Structur

/root-project-folder/
    src/

        |-- config                        # Environment & DB connection
        |-- constant                      # Application constants
        |-- controllers                   # Request handlers functions
        |-- errors                        # Custom error logic
        |-- middlewares                   # middleware logic
        |-- routes                        # API routes
        |-- services                      # Busines logic or DB logic
        |-- tests                         # Unit testing
        |-- types                         # Types and interfaces for variables
        |-- utils                         # Helper functions
        |-- validators                    # validation logic
        |-- app.ts                        # Express setup
        |-- server.ts                     # Entry point for server

    prisma/
        |-- schema.prisma                 # Prisma schema
        |-- migrations/                   # Database migration

    .env                                  # For secre environment variables

## Environment variables
PORT = 
DB_URL =


## Project Cloning 
git clone https://github.com/thearcgit/books-backend.git
cd books-backend
