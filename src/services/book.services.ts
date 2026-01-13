import prisma from "@/config/db.js"
import { statusCode } from "@/constants/statusCode.js"
import { customError } from "@/errors/customError.js"
import { Book, PrismaClient } from "@/generated/prisma/client.js"
import { AddBookBody, BookResponse } from "@/types/index.types.js"




export const addBookService = async (data: AddBookBody): Promise<AddBookBody> => {
    const isBookExist = await prisma.book.findUnique({ where: { title: data.title } })

    // Check if this book is already in database
    if (isBookExist) {
        throw new customError('Book already exists', statusCode.CONFLICT)
    }

    const book = await prisma.book.create({ data, select: { id: true, title: true, author: true, publishedYear: true } })
    return book


}
export const allBooksService = async (): Promise<BookResponse[]> => {
    const books = await prisma.book.findMany({ select: { id: true, title: true, author: true, publishedYear: true } })
    return books


}
export const specificBookService = async (id: string): Promise<BookResponse | null> => {
    const book = await prisma.book.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            author: true,
            publishedYear: true
        }
    })

    return book


}
export const updateBookService = async (id: string, data: AddBookBody): Promise<BookResponse | null> => {
    const existingBook = await prisma.book.findUnique({ where: { id } });

    if (!existingBook) {
        return null;
    }
    const book = await prisma.book.update({ 
        where: { id }, 
        data,
        select:{
            id:true,
            title:true,
            author:true,
            publishedYear:true,
            updatedAt:true
        } 
    })

    return book


}

export const deleteBookService = async (id: string): Promise<BookResponse | null> => {
    const existingBook = await prisma.book.findUnique({ where: { id } });

    if (!existingBook) {
        return null;
    }
    const book = await prisma.book.delete({ 
        where: { id },
        select:{
            id:true,
            title:true,
            author:true,
            publishedYear:true,
        } 
    })

    return book


} 