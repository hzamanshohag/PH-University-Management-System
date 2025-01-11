import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { validateRequest } from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
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
