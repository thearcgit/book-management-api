import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { morganHandler } from './utils/logger.js'
import { errorResponse, successResponse } from './utils/responses.js'
import { statusCode } from './constants/statusCode.js'
import corsOptions from './utils/corsOption.js'
import { asyncHandler } from './utils/asyncHandler.js'
import routes from './routes/index.js'
import { centralizeError } from './middlewares/error.js'


const app = express()

// Remove framework exposure
app.disable('x-powered-by')

// Middlewares

// Cors middleware
app.use(cors(corsOptions))

// Request data parsing middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logger middleware
app.use(morgan(morganHandler))


// Routes middleware
app.use(`/api`,routes)


// @desc   Test if Server is running or not
// @route  GET /
app.get(`/`, asyncHandler(async (req: Request, res: Response) => {
    successResponse(res, statusCode.OK, `App is running fine!`, null)

}))

// Route not found
app.use((req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res, statusCode.NOT_FOUND, `Route ${req.originalUrl} not found`,)
});

// Centralized error handler
app.use(centralizeError)


export default app