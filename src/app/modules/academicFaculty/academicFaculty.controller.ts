import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Academic faculty are create successfully',
    data: result,
  });
});

const getAllacademicFaculties = catchAsync(async(req,res)=>{
    const result = await AcademicFacultyServices.getAllacademicFacultiesIntoDB()
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'All Academic faculty are get successfully',
      data: result,
    });
})

const getSingleAcademicFaculty = catchAsync(async(req,res)=>{
    const {facultyId }= req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(facultyId);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Single Academic faculty is get successfully',
      data: result,
    });
})

const updateAcademicFaculties = catchAsync(async(req,res)=>{
    const { facultyId } = req.params;
    const payload = req.body
    const result = await AcademicFacultyServices.updateAcademicFacultiesIntoDB(
      facultyId,
      payload,
    );
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Academic faculty is updated successfully',
      data: result,
    });
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllacademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculties,
};