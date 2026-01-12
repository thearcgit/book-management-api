import { Prisma } from "@/generated/prisma/client.js";

type AddBookBody = Prisma.BookCreateInput;

interface BookResponse {
  id: string;
  title: string;
  author: string;
  publishedYear:number;
  updatedAt?:Date;
  createdAt?:Date;
}


export {
    AddBookBody,
    BookResponse
}