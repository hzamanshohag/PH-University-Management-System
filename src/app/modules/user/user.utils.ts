import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';



const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
    console.log("lastStudent", lastStudent)
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year => semesterCode => 4 digit number
export const generateStudentId = async (payload: TAcademicSemseter) => {
  // first time 0000
  let currentId = (0).toString(); // 0000 by default

   const lastStudentId = await findLastStudentId();
   // 2024 01 0001
   const lastStudentSemesterCode = lastStudentId?.substring(4,6) //01
   const lastStudentSemesterYear = lastStudentId?.substring(0,4) //2024

   //current code & year
   const currentSemesterCode = payload.code;
   const currentSemesterYear = payload.year;

  if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentSemesterYear === currentSemesterYear){
    currentId = lastStudentId.substring(6)
  }


  console.log(payload.code);
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
