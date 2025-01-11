import express from 'express';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import { validateRequest } from '../../middlwares/validateRequest';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
