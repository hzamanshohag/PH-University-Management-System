import { Router } from 'express';
import { StudentRouters } from '../modules/student/student.route';
import { UserRouters } from '../modules/user/user.router';

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
];

moduleRouters.forEach(route =>router.use(route.path,route.route))

// router.use('/students', StudentRouters);
// router.use('/users', UserRouters);

export default router;
