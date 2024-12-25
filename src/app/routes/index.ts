import { Router } from 'express';
import { StudentRouters } from '../modules/student/student.route';
import { UserRouters } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouters } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouters } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';

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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouters,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
];

moduleRouters.forEach(route =>router.use(route.path,route.route))

// router.use('/students', StudentRouters);
// router.use('/users', UserRouters);

export default router;
