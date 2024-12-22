import { model, Schema } from 'mongoose';
import { TAcademicSemseter } from './academicSemester.interface';
import {
  academicSemseterCode,
  academicSemseterName,
  months,
} from './academicSemester.constant';
import { AppError } from '../../errors/AppError';
import { HttpStatus } from 'http-status-ts';

const academicSemesterSchema = new Schema<TAcademicSemseter>(
  {
    name: {
      type: String,
      enum: academicSemseterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemseterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if(isSemesterExists){
    throw new AppError(HttpStatus.NOT_FOUND,'Semester already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemseter>(
  'AcademicSemester',
  academicSemesterSchema,
);
