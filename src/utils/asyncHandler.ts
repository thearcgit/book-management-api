import { Request, Response, NextFunction, RequestHandler } from "express"

type AsyncFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

// It is a high order function or decorator fn
// It replace try/catch block
export const asyncHandler= (fn:AsyncFn) => 
    (req:Request, res:Response, next:NextFunction):void => 
        void Promise.resolve(fn(req, res, next)).catch(next)
