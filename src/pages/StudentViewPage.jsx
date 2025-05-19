import React from 'react';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, TextField, Select, FormControl, InputLabel } from '@mui/material';
import { calculateGPA, calculateCGPAForStudent, getTotalMarks, getGradePoint } from '../utils/calculation'; // Assuming calculation utilities

const StudentViewPage = () => {
  const { studentId } = useParams();
  const students = useStoreState(state => state.students.items);
  const allMarks = useStoreState(state => state.marks.items);
  
  const student = students.find(s => s.id === studentId);
  const studentMarks = allMarks.filter(mark => mark.studentId === studentId);

  const [selectedSemester, setSelectedSemester] = React.useState('');

  if (!student) {
    return <Typography>
      <h2>Student not found.</h2>
 
    </Typography>;
  }

  const availableSemesters = student.semestersAttended || [...new Set(studentMarks.map(m => m.semester))];

  // Set initial selected semester if not already set and semesters are available
  React.useEffect(() => {
    if (availableSemesters.length > 0 && !selectedSemester) {
      setSelectedSemester(availableSemesters[0]);
    }
  }, [availableSemesters, selectedSemester]);


  const marksForSelectedSemester = studentMarks.filter(mark => mark.semester === selectedSemester);
  const gpaForSelectedSemester = calculateGPA(marksForSelectedSemester);
  const cgpa = calculateCGPAForStudent(studentMarks, student.semestersAttended);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Student Result: {student.name}</Typography>
      <Typography variant="subtitle1">Roll: {student.roll} | Session: {student.session} | Dept: {student.department}</Typography>
      
      <Box sx={{my: 2}}>
        <Typography variant="h6">Overall CGPA: {cgpa || 'N/A'}</Typography>
      </Box>
      
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="semester-select-label">Select Semester</InputLabel>
        <Select
          labelId="semester-select-label"
          value={selectedSemester}
          label="Select Semester"
          onChange={handleSemesterChange}
        >
          {availableSemesters.map(sem => (
            <MenuItem key={sem} value={sem}>{sem}</MenuItem>
          ))}
          {availableSemesters.length === 0 && <MenuItem disabled>No semesters with marks</MenuItem>}
        </Select>
      </FormControl>

      {selectedSemester && (
        <>
          <Typography variant="h5" sx={{ mt: 2 }}>Semester: {selectedSemester}</Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>GPA: {gpaForSelectedSemester || 'N/A'}</Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell align="right">Assignment (10)</TableCell>
                  <TableCell align="right">Class Test (10)</TableCell>
                  <TableCell align="right">Midterm (30)</TableCell>
                  <TableCell align="right">Final (50)</TableCell>
                  <TableCell align="right">Total (100)</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  <TableCell align="right">Grade Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marksForSelectedSemester.length === 0 && (
                    <TableRow><TableCell colSpan={8} align="center">No marks entered for this semester.</TableCell></TableRow>
                )}
                {marksForSelectedSemester.map((mark) => {
                  const total = getTotalMarks(mark);
                  const { grade, points } = getGradePoint(total);
                  return (
                    <TableRow key={mark.id || mark.subject}>
                      <TableCell component="th" scope="row">{mark.subject}</TableCell>
                      <TableCell align="right">{mark.assignment}</TableCell>
                      <TableCell align="right">{mark.classTest}</TableCell>
                      <TableCell align="right">{mark.midterm}</TableCell>
                      <TableCell align="right">{mark.finalExam}</TableCell>
                      <TableCell align="right">{total}</TableCell>
                      <TableCell align="right">{grade}</TableCell>
                      <TableCell align="right">{points.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
};

export default StudentViewPage;