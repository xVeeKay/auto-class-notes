import { ZodTypeAny } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validate = (schema: ZodTypeAny) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      next()
    } catch (error: any) {
      return next(error)
    }
  }
}

export default validate
