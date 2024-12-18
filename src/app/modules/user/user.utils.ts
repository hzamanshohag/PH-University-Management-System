import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// const findLastStudentId = async () => {
//   try {
//     const lastStudent = await User.findOne(
//       { role: 'student' },
//       { id: 1, _id: 0 },
//     )
//       .sort({ createdAt: -1 }) // Ensure 'createdAt' is the correct field name
//       .lean();

//     return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
//   } catch (error) {
//     console.error('Error fetching the last student ID:', error);
//     return undefined;
//   }
// };

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
    console.log(lastStudent)
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year => semesterCode => 4 digit number
export const generateStudentId = async (payload: TAcademicSemseter) => {
  // first time 0000
    console.log(await findLastStudentId());
  const currentId = (await findLastStudentId()) || (0).toString();
  // console.log(currentId);
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
