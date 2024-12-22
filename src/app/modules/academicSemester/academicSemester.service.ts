import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemseter } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterInDB = async (payload: TAcademicSemseter) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(HttpStatus.NOT_FOUND,'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const allAcademicSemesterInDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const singleAcademicSemesterInDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateAcademicSemesterInDB = async (
  id: string,
  data: TAcademicSemseter,
) => {
  const result = await AcademicSemester.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInDB,
  allAcademicSemesterInDB,
  singleAcademicSemesterInDB,
  updateAcademicSemesterInDB,
};
