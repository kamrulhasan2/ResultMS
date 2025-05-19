import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { Paper, Container } from '@mui/material';

const AddStudentPage = () => {
  const addStudent = useStoreActions((actions) => actions.students.addStudent);
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    addStudent(data);
    navigate('/admin'); // Redirect to admin dashboard after adding
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <StudentForm onSubmit={handleSubmit} formTitle="Add New Student" />
      </Paper>
    </Container>
  );
};

export default AddStudentPage;