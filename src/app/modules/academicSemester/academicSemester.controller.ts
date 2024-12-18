import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createacademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterInDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Academic Semester are create successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.allAcademicSemesterInDB();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'All Academic Semester are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.AcademicSemesterID;
  const result = await AcademicSemesterServices.singleAcademicSemesterInDB(id);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Single Academic Semester are retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.AcademicSemesterID;
  const data = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemesterInDB(id,data)
   sendResponse(res, {
     statusCode: HttpStatus.OK,
     success: true,
     message: 'Academic Semester are updated successfully',
     data: result,
   });
});

export const AcademicSemesterControllers = {
  createacademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
