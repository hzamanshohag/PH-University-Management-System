import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequests } from '../user/user.router';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getStudents);
router.get('/:id', StudentControllers.singleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequests(StudentValidation.updateStudentSchema),
  StudentControllers.updateStudent,
);
router.post(
  '/create-student',
  validateRequests(StudentValidation.createStudentSchema),
  StudentControllers.createStudent,
);

export const StudentRouters = router;
