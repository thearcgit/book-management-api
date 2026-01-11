import { Response } from "express"

// Equivalent success response in all api 
export const successResponse = (res: Response, statusCode: number, message: string, data: unknown = null): Response => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    })
}

// Equivalent error response in all api 
export const errorResponse = (res: Response, statusCode: number = 500, message = `Server error`, error: unknown = null): Response => {
    return res.status(statusCode ).json({
        success: false,
        message,
        error
    })
}