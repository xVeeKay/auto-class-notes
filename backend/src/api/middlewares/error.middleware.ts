import { Request, Response, NextFunction } from 'express'
import apiError from '../../utils/apiError.js'
import { success, ZodError } from 'zod'

const errorMiddleware = (
  err: Error | apiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if(err instanceof ZodError){
    return res.status(400).json({
      success:false,
      errors:err.issues
    })
  }
  const statusCode = err instanceof apiError ? err.statusCode : 500

  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message,
  })
}

export default errorMiddleware
