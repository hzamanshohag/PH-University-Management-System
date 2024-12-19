import express from 'express';
import { validateRequests } from '../user/user.router';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequests(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllacademicFaculties);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/:facultyId', AcademicFacultyController.updateAcademicFaculties);

export const AcademicFacultyRouters = router;
