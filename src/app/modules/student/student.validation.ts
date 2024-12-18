import { z } from 'zod';

const userNameSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'Name cannot be more than 20 characters' })
    .trim(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    }),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
});

const localGuardianSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" }),
});

const studentSchema = z.object({
  body: z.object({
    password: z.string().optional().default('phuniversity!@#'),
    student: z.object({
      // id: z.string().min(1, { message: 'Student ID is required' }),
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: (issue) => ({
          message: `${issue} is not a valid gender. The gender field can only be 'male', 'female', or 'other'`,
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email format' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergeyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({
          message: 'Invalid blood group',
        }),
      }),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const zodValidation = {
  studentSchema,
};
