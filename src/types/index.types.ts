import { Prisma } from "@/generated/prisma/client.js";

type AddBookBody = Prisma.BookCreateInput;

interface BookResponse {
  id: string;
  title: string;
  author: string;
}

export {
    AddBookBody,
    BookResponse
}