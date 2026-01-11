import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { errorResponse } from '../utils/responses.js';


// Custom error constructor
export class AppError extends Error {
    statusCode: number
    status: "fail" | "error"
    isOperational: boolean

    constructor(message: string, statusCode: number = 500) {
        super(message);          // Call the Error constructor
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Mark as operational error (vs programming error)

        Object.setPrototypeOf(this, new.target.prototype)
    }
}

// Common error handler
export const centralizeError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500

    const message = err.message || "Server error"
    // errorWinstonLogger.error({ message, ip:req.ip,method:req.method , statusCode:statusCode || 500 })
    return errorResponse(res, statusCode, message, err)

}

