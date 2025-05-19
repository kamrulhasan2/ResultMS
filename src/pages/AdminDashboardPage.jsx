import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment'; // For marks entry
import VisibilityIcon from '@mui/icons-material/Visibility'; // For student view

const AdminDashboardPage = () => {
  const students = useStoreState((state) => state.students.items);
  const deleteStudentAction = useStoreActions((actions) => actions.students.deleteStudent);
  const deleteMarksForStudentAction = useStoreActions((actions) => actions.marks.deleteMarksForStudent);
  const navigate = useNavigate();

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student and all their marks?')) {
      deleteStudentAction(studentId);
      deleteMarksForStudentAction(studentId); // Ensure marks are also deleted
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/admin/add-student"
        >
          Add Student
        </Button>
        <Button
          variant="outlined"
          startIcon={<AssessmentIcon />}
          component={RouterLink}
          to="/admin/marks-entry"
        >
          Enter Marks
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{mt: 2}}>Student List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 && (
              <TableRow><TableCell colSpan={6} align="center">No students found.</TableCell></TableRow>
            )}
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.roll}</TableCell>
                <TableCell>{student.session}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/admin/edit-student/${student.id}`)}
                    title="Edit Student"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(student.id)}
                    title="Delete Student"
                  >
                    <DeleteIcon />
                  </IconButton>
                   <IconButton
                    color="secondary"
                    onClick={() => navigate(`/student/${student.id}`)}
                    title="View Results"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminDashboardPage;