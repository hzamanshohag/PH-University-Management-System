import express from 'express';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { validateRequest } from '../../middlwares/validateRequest';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
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
