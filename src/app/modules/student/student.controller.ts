import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: 'Student are retrieved successfully',
    //   data: result,
    // });
     sendResponse(res, {
       statusCode: HttpStatus.OK,
       success: true,
       message: 'Student are retrieved successfully',
       data: result,
     });
  } catch (err) {
    next(err);
  }
};

const singleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is retrieved successfully',
    //   data: result,
    // });
     sendResponse(res, {
       statusCode: HttpStatus.OK,
       success: true,
       message: 'Student is retrieved successfully',
       data: result,
     });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getStudents,
  singleStudent,
};
