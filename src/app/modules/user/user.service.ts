import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.default_password as string);

  // if (!password) {
  //   User.password = config.default_password as string;
  // } else {
  //   User.password = password;
  // }

  userData.role = 'student';

  // manually id

  userData.id = '2024100001';

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent; 
  }
};

export const UserServices = {
  createStudentIntoDB,
};
