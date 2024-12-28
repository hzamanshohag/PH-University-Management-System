import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { UserControllers } from './user.controller';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
const router = express.Router();

export const validateRequests = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.body)
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-faculty',
  validateRequests(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequests(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRouters = router;
