import { Request, Response, NextFunction, RequestHandler } from "express";
import { statusCode } from "@/constants/statusCode.js";
import { customError } from "@/errors/customError.js";
import { addBookService, allBooksService, deleteBookService, specificBookService, updateBookService } from "@/services/book.services.js";
import { AddBookBody } from "@/types/index.types.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { errorResponse, successResponse } from "@/utils/responses.js";
import { bookSchema, updateBookSchema } from "@/validators/bookSchema.js";
import { bulkUploadService } from "@/services/bulkBook.services.js";
import { stat } from "node:fs";

// @desc   Add book details here
// @route  POST /api/books
export const addBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { error, value } = bookSchema.validate(req.body, { abortEarly: false })
    if (error) {
        throw new customError(error.message, statusCode.BAD_REQUEST)
    }
    const validatedData = value as AddBookBody
    console.log('validatedData', validatedData)
    const book = await addBookService(validatedData)

    successResponse(res, statusCode.CREATED, `Book detail added successfully!`, book)

})

// @desc   Fetch all book 
// @route  GET /api/books
export const getAllBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const books = await allBooksService()
    if(!books){
        errorResponse(res,statusCode.NOT_FOUND,`No book available`,)
        return
    }

    successResponse(res, statusCode.OK, `All books fetched successfully!`, { totalBooks: books.length, books })

})

// @desc   Fetch Specific book 
// @route  GET /api/books/:id
export const specificBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    if(!id || Array.isArray(id)){
        errorResponse(res,statusCode.BAD_REQUEST,`Id is mandatory`)
        return
    }

    const book = await specificBookService(id)

    if (!book) {
      errorResponse(res, statusCode.NOT_FOUND, "Book not found");
      return;
    }

    successResponse(res, statusCode.OK, `Book fetched successfully!`, book)

})

// @desc   Update Specific book 
// @route  PUT /api/books/:id
export const updateBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    if(!id || Array.isArray(id)){
        errorResponse(res,statusCode.BAD_REQUEST,`Id is mandatory`)
        return
    }

    const { error, value } = updateBookSchema.validate(req.body, { abortEarly: false })
    if (error) {
        throw new customError(error.message, statusCode.BAD_REQUEST)
    }
    const validatedData = value as AddBookBody

    const book = await updateBookService(id,validatedData)
    // console.log('update',validatedData)

    if (!book) {
      errorResponse(res, statusCode.NOT_FOUND, "Book update unsuccessful");
      return;
    }

    successResponse(res, statusCode.OK, `Book updated successfully!`, book)

})


// @desc   Delete Specific book 
// @route  DELETE /api/books/:id
export const deleteBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    if(!id){
        errorResponse(res,statusCode.BAD_REQUEST,`Id is mandatory`)
        return
    }
    console.log('id type',typeof id)
    if(typeof id !== "string" || Array.isArray(id)){
        errorResponse(res,statusCode.BAD_REQUEST,`Invalid id`)
        return
    }
    const book = await deleteBookService(id)
    console.log('book delete',book)

    if (!book) {
      errorResponse(res, statusCode.NOT_FOUND, "Invalid book ID");
      return;
    }

    successResponse(res, statusCode.OK, `Book deleted successfully!`, book)

})


// @desc   Add books with CSV
// @route  POST /api/book/import
export const bulkUpload = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        throw new customError("CSV file is required", statusCode.BAD_REQUEST)
    }


    const result = await bulkUploadService(req.file.buffer)
    if (!result.booksAdded) {
        // throw new customError(`Import unsuccessful`,statusCode.BAD_REQUEST)
        successResponse(res, statusCode.OK, `CSV processed, but no valid books were added!`, result)
        return
    }
    console.log('file buffer', result)


    successResponse(res, statusCode.CREATED, `CSV processed successfully!`, result)
}) 