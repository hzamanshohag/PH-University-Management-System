import { HttpStatus } from 'http-status-ts';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Tuser } from '../user/user.interface';
import { User } from '../user/user.model';
import { generateStudentId } from '../user/user.utils';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import { AppError } from '../../errors/AppError';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query);

  // const queryObj = { ...query }; //copy

  // const studentSearchableFields = ['email', 'name.firstname', 'presentAddress'];

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((el) => delete queryObj[el]);
  // console.log({ query }, 'queryObj', { queryObj });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicfaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 1;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // field limiting
  // let fields = '-_v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    StudentModel.find()
    .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicfaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generate student id
    userData.id = await generateStudentId(admissionSemester);
    // create a student (transaction - 1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error('Faild to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a user (transaction - 2)
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new Error('Faild to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const deleteStudentIntoDB = async (id: string) => {
  // console.log(id)
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    // console.log(deleteStudent);
    if (!deleteStudent) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Faild to delete student');
    }

    //get user _id from deletedStudent
    const userId = deleteStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Faild to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
  guardian: {
    "fatherOccupation": "Chef"
  }
  guardian.fatherOccupation = 'Chef'
  name.firstname = 'Md'
  name.lastName = 'Hasan'
   */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  // console.log(modifiedUpdatedData)
  const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  createStudentIntoDB,
  deleteStudentIntoDB,
  updateStudentFromDB,
};
