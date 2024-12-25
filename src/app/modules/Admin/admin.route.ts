import express from 'express';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import { validateRequests } from '../user/user.router';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequests(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
