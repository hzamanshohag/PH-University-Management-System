import { Router } from 'express';
import { StudentRouters } from '../modules/student/student.route';
import { UserRouters } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.route';

const router = Router();

const moduleRouters = [
  {
    path: '/students',
    route: StudentRouters,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRouters.forEach(route =>router.use(route.path,route.route))

// router.use('/students', StudentRouters);
// router.use('/users', UserRouters);

export default router;
