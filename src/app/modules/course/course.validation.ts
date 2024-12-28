import { z } from 'zod';

const PreRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const updatePreRequisiteCoursesValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),

    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(PreRequisiteCoursesValidationSchema)
      .optional(),
  }),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

const FacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  FacultiesWithCourseValidationSchema,
};
