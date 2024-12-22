import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIndoDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Academic Department are create successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentIndoDB();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'All Academic Department are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentID } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentIndoDB(
      DepartmentID,
    );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Single Academic Department are retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentID } = req.params;
  const data = req.body;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIndoDB(
      DepartmentID,
      data,
    );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Academic Department are updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
