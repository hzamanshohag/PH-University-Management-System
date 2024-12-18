import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { validateRequests } from '../user/user.router';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequests(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createacademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get(
  '/:AcademicSemesterID',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:AcademicSemesterID',
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
