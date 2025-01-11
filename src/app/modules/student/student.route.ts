import express from 'express';
import { StudentControllers } from './student.controller';
import { StudentValidation } from './student.validation';
import { validateRequest } from '../../middlwares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlwares/auth';

const router = express.Router();

router.get('/', StudentControllers.getStudents);
router.get('/:id', StudentControllers.singleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentSchema),
  StudentControllers.updateStudent,
);
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidation.createStudentSchema),
  StudentControllers.createStudent,
);

export const StudentRouters = router;
