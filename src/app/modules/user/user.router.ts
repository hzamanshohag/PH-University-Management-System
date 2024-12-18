import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
const router = express.Router();

export const validateRequests = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};


export const UserRouters = router;
