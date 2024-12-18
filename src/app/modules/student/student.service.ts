import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Tuser } from '../user/user.interface';
import { User } from '../user/user.model';
import { generateStudentId } from '../user/user.utils';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Academic semester not found');
  }
  // manually id

  userData.id = await generateStudentId(admissionSemester);
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  createStudentIntoDB,
};
