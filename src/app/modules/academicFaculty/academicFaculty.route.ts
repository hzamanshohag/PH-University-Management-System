import express from 'express';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import { validateRequest } from '../../middlwares/validateRequest';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllacademicFaculties);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/:facultyId', AcademicFacultyController.updateAcademicFaculties);

export const AcademicFacultyRouters = router;
