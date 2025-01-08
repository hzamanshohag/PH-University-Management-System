import { Router } from 'express';
import { validateRequests } from '../user/user.router';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequests(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRouters = router;
