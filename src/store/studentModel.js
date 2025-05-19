import { action, thunk } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

// Dummy initial data
const initialStudents = [
  { id: uuidv4(), name: 'kamrul Hasan', roll: '79', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Nafi', roll: '70', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Rifat', roll: '89', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Labib', roll: '74', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Shamim', roll: '71', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Rana', roll: '85', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Shariar', roll: '88', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Nabila', roll: '91', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Mim', roll: '92', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Alamin', roll: '95', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
  { id: uuidv4(), name: 'Foyshal', roll: '23', session: '2020-2021', department: 'CSE', semester: '6th', semestersAttended: ['6th'] },
];

const studentModel = {
  items: initialStudents, // Initial state
  
  // Actions
  addStudent: action((state, payload) => {
    state.items.push({ id: uuidv4(), ...payload, semestersAttended: [payload.semester] });
  }),
  updateStudent: action((state, payload) => {
    const index = state.items.findIndex(student => student.id === payload.id);
    if (index !== -1) {
      state.items[index] = { ...state.items[index], ...payload };
      // Ensure semester is in semestersAttended
      if (payload.semester && !state.items[index].semestersAttended.includes(payload.semester)) {
        state.items[index].semestersAttended.push(payload.semester);
      }
    }
  }),
  deleteStudent: action((state, studentId) => {
    state.items = state.items.filter(student => student.id !== studentId);
    // Also delete marks associated with this student (implementation in marksModel or via thunk)
  }),
};

export default studentModel;