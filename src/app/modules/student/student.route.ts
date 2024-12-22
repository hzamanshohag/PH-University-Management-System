import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequests } from '../user/user.router';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getStudents);
router.get('/:studentId', StudentControllers.singleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.patch(
  '/:studentId',
  validateRequests(StudentValidation.updateStudentSchema),
  StudentControllers.updateStudent,
);
router.post(
  '/create-student',
  validateRequests(StudentValidation.createStudentSchema),
  StudentControllers.createStudent,
);

export const StudentRouters = router;
