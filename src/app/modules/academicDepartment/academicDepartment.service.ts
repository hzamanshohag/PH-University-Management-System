import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIndoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentIndoDB = async () => {
  const result = await AcademicDepartment.find().populate('academicfaculty');
  return result;
};

const getSingleAcademicDepartmentIndoDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicfaculty');
  return result;
};
const updateAcademicDepartmentIndoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIndoDB,
  getAllAcademicDepartmentIndoDB,
  getSingleAcademicDepartmentIndoDB,
  updateAcademicDepartmentIndoDB,
};
