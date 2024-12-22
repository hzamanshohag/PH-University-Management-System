import express from 'express';
import { validateRequests } from '../user/user.router';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequests(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get(
  '/:DepartmentID',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:DepartmentID',
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRouters = router;
