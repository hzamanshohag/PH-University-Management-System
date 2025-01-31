import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';

const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

const singleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // console.log(studentData);
  const result = await StudentServices.createStudentIntoDB(
    password,
    studentData,
  );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentIntoDB(id);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const {student} = req.body;
  const result = await StudentServices.updateStudentFromDB(id, student);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getStudents,
  singleStudent,
  createStudent,
  deleteStudent,
  updateStudent,
};
