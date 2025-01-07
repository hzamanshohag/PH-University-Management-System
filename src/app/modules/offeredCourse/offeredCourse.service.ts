import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  //check if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      HttpStatus.NOT_FOUND,
      'Semester Registration not found !',
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Academic Faculty not found !');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Academic Department not found !');
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Faculty not found !');
  }

  //check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicfaculty: academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is belong to this ${isAcademicFacultyExists.name} !`,
    );
  }

  //if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      'Offered course with same section is already exist !',
    );
  }

  // get the schedules of the facultise
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      HttpStatus.CONFLICT,
      'This faculty is not available at that time ! choose other time or date',
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'faculty' | 'days' | 'startTime' | 'endTime' | 'faculty'
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Offered Course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);
  console.log({ isFacultyExists });
  if (!isFacultyExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status} !`,
    );
  }
  // get the schedules of the facultise
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      HttpStatus.CONFLICT,
      'This faculty is not available at that time ! choose other time or date',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllOfferedCourseIntoDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};
const getSingleOfferedCourseIntoDB = async (id: string) => {
   const isOfferedCourseExists = await OfferedCourse.findById(id);
   if (!isOfferedCourseExists) {
     throw new AppError(HttpStatus.NOT_FOUND, 'Offered Course not found !');
   }
  const result = await OfferedCourse.findById(id);
  return result;
};
const deleteOfferedCourseIntoDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Offered Course not found !');
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');
  console.log({ semesterRegistrationStatus });

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `You can not delete this offered course as it is ${semesterRegistrationStatus?.status} !`,
    );
  }
  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCourseIntoDB,
  getSingleOfferedCourseIntoDB,
  deleteOfferedCourseIntoDB,
};
