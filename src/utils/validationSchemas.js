import * as yup from 'yup';

export const studentSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  roll: yup.string().required('Roll number is required').matches(/^[0-9]+$/, "Roll must be numeric"),
  session: yup.string().required('Session is required'),
  department: yup.string().required('Department is required'),
  semester: yup.string().required('Current semester is required'),
});

export const marksSchema = yup.object().shape({
  studentId: yup.string().required('Student selection is required'),
  subject: yup.string().required('Subject is required'),
  semester: yup.string().required('Semester is required'),
  assignment: yup.number().min(0).max(10, 'Max 10').typeError('Must be a number').required(),
  classTest: yup.number().min(0).max(10, 'Max 10').typeError('Must be a number').required(),
  midterm: yup.number().min(0).max(30, 'Max 30').typeError('Must be a number').required(),
  finalExam: yup.number().min(0).max(50, 'Max 50').typeError('Must be a number').required(),
});