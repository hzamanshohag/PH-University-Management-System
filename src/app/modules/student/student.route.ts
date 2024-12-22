import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequests } from '../user/user.router';
import { zodValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getStudents);
router.get('/:studentId', StudentControllers.singleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.post(
  '/create-student',
  validateRequests(zodValidation.studentSchema),
  StudentControllers.createStudent,
);

export const StudentRouters = router;
