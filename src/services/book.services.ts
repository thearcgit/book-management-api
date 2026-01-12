import prisma from "@/config/db.js"
import { statusCode } from "@/constants/statusCode.js"
import { customError } from "@/errors/customError.js"
import { Book } from "@/generated/prisma/client.js"
import { AddBookBody } from "@/types/index.types.js"




export const addBookService = async (data: AddBookBody) => {
    console.log('boo',prisma.book)

    const isBookExist = await prisma.book.findUnique({ where: { title: data.title } })

    // Check if this book is already in database
    if (isBookExist) {
        throw new customError('This book is already added', statusCode.CONFLICT)
    }
   
    const book = await prisma.book.create({data,select:{id:true,title:true,author:true,publishedYear:true}})
    return book


} 