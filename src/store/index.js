import { createStore, computed, persist } from 'easy-peasy'; // Add persist
import studentModel from './studentModel';
import marksModel from './marksModel';
import { calculateGPA, calculateCGPAForStudent } from '../utils/calculation';

const storeModel = {
  // Wrap the models you want to persist with the `persist` HOC
  // This will automatically save their state to localStorage and rehydrate on load.
  // By default, easy-peasy will use keys like 'easy-peasy-persist-students'
  students: persist(studentModel, {
    storage: 'localStorage', // Specify localStorage
    // key: 'myAppStudents' // Optional: custom key for localStorage
  }),
  marks: persist(marksModel, {
    storage: 'localStorage',
    // key: 'myAppMarks' // Optional: custom key for localStorage
  }),

  // Computed properties derive from the (now persisted) state.
  // They don't need to be persisted themselves.
  getStudentResults: computed(
    (state) => (studentId, semester) => {
      // Access persisted state: state.students.items, state.marks.items
      const studentMarks = state.marks.items.filter(
        (mark) => mark.studentId === studentId && mark.semester === semester
      );
      if (!studentMarks.length) return { gpa: 0, marks: [] };

      const gpa = calculateGPA(studentMarks);
      return { gpa, marks: studentMarks };
    }
  ),

  getStudentCGPA: computed(
    (state) => (studentId) => {
      const student = state.students.items.find(s => s.id === studentId);
      if (!student) return 0;

      const allMarksForStudent = state.marks.items.filter(mark => mark.studentId === studentId);
      if (!allMarksForStudent.length) return 0;
      
      return calculateCGPAForStudent(allMarksForStudent, student.semestersAttended || []);
    }
  ),
};

const store = createStore(storeModel);

export default store;