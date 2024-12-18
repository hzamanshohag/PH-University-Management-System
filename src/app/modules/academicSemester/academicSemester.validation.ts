import { z } from 'zod';
import { academicSemseterCode, academicSemseterName, months } from './academicSemester.constant';



const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemseterName] as [string, ...string[]], {
      message: 'Name must be one of "Autumn", "Summar", "Fall"',
    }),
    year: z.string({ message: 'Year is required' }),
    code: z.enum([...academicSemseterCode] as [string, ...string[]], {
      message: 'Code must be one of "01", "02", "03"',
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      message: 'Start month is required and must be a valid month',
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      message: 'End month is required and must be a valid month',
    }),
    createdAt: z.date().optional(), // If using timestamps
    updatedAt: z.date().optional(), // If using timestamps
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};

// Example usage:
// const academicSemesterData = {
//   name: 'Spring Semester',
//   year: new Date(2024, 0, 1),
//   code: '01',
//   startMonth: 'January',
//   endMonth: 'May',
// };
// const parsedData = academicSemesterSchema.parse(academicSemesterData);
