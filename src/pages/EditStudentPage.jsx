import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import StudentForm from '../components/StudentForm';
import { Paper, Container, Typography, CircularProgress, Box } from '@mui/material';

const EditStudentPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const students = useStoreState((state) => state.students.items);
  const updateStudentAction = useStoreActions((actions) => actions.students.updateStudent);

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentToEdit = students.find(s => s.id === studentId);
    if (studentToEdit) {
      setStudentData(studentToEdit);
    }
    setLoading(false); // Stop loading even if not found, to show "not found" message
  }, [students, studentId]);

  const handleSubmit = (data) => {
    updateStudentAction({ id: studentId, ...data });
    navigate('/admin'); // Redirect to admin dashboard after updating
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!studentData) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Student not found.</Typography>
          <Button variant="outlined" onClick={() => navigate('/admin')} sx={{mt: 2}}>
            Back to Admin Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <StudentForm
          onSubmit={handleSubmit}
          initialData={studentData}
          formTitle="Edit Student Details"
        />
      </Paper>
    </Container>
  );
};

export default EditStudentPage;