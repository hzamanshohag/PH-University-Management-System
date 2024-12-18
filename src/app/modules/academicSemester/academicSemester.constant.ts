import { TacademicSemesterNameCodeMapper, TAcademicSemseterCode, TAcademicSemseterName, TMonths } from "./academicSemester.interface";

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemseterName: TAcademicSemseterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];

export const academicSemseterCode: TAcademicSemseterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};