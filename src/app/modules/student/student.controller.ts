
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';



const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

const singleStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

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

export const StudentControllers = {
  getStudents,
  singleStudent,
  createStudent,
};
