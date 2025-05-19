import { action } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';

const initialMarks = [
    // { id: uuidv4(), studentId: '', subject: 'Math', semester: '1st', assignment: 8, classTest: 7, midterm: 25, finalExam: 40 },
];


const marksModel = {
  items: initialMarks,
  
  addOrUpdateMark: action((state, payload) => { // payload: { studentId, subject, semester, assignment, classTest, midterm, finalExam }
    const existingMarkIndex = state.items.findIndex(
      mark => mark.studentId === payload.studentId && mark.subject === payload.subject && mark.semester === payload.semester
    );
    if (existingMarkIndex !== -1) {
      state.items[existingMarkIndex] = { ...state.items[existingMarkIndex], ...payload };
    } else {
      state.items.push({ id: uuidv4(), ...payload });
    }
  }),
  deleteMarksForStudent: action((state, studentId) => {
    state.items = state.items.filter(mark => mark.studentId !== studentId);
  }),
};

export default marksModel;