import { Request, Response, NextFunction, RequestHandler } from "express";
import { statusCode } from "@/constants/statusCode.js";
import { customError } from "@/errors/customError.js";
import { addBookService } from "@/services/book.services.js";
import { AddBookBody } from "@/types/index.types.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { successResponse } from "@/utils/responses.js";
import { bookSchema } from "@/validators/bookSchema.js";

// @desc   Add book details here
// @route  POST /api/book
export const addBook = asyncHandler(async (req: Request<{}, {}, AddBookBody>, res: Response): Promise<void> => {
    const { error, value } = bookSchema.validate(req.body, { abortEarly: false })
    if (error) {
        throw new customError(error.message, statusCode.BAD_REQUEST)
    }
    const validatedData = value as AddBookBody
    console.log('validatedData',validatedData)
    const book = await addBookService(validatedData)
   
    successResponse(res, statusCode.CREATED, `Book detail added successfully!`,book)

}) 