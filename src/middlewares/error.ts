import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { errorResponse } from '../utils/responses.js';
import { customError } from '@/errors/customError.js';

// Common error handler
export const centralizeError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof customError ? err.statusCode : 500

    const message = err.message || "Server error"
    // errorWinstonLogger.error({ message, ip:req.ip,method:req.method , statusCode:statusCode || 500 })
    return errorResponse(res, statusCode, message, err)

}