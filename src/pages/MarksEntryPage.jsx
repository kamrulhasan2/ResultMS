// src/pages/MarksEntryPage.jsx
import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import MarksForm from '../components/MarksForm';
import { Paper, Container, Typography } from '@mui/material';

const MarksEntryPage = () => {
  const addOrUpdateMarkAction = useStoreActions((actions) => actions.marks.addOrUpdateMark);
  const updateStudentAction = useStoreActions((actions) => actions.students.updateStudent);
  const students = useStoreState((state) => state.students.items);

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // Convert marks to numbers, as TextField might return them as strings
    const marksData = {
      ...data,
      assignment: Number(data.assignment),
      classTest: Number(data.classTest),
      midterm: Number(data.midterm),
      finalExam: Number(data.finalExam),
    };
    addOrUpdateMarkAction(marksData);

    // Update the student's semestersAttended if this is a new semester for them
    const student = students.find(s => s.id === data.studentId);
    if (student && !student.semestersAttended?.includes(data.semester)) {
      const updatedSemesters = student.semestersAttended 
                               ? [...student.semestersAttended, data.semester] 
                               : [data.semester];
      updateStudentAction({ id: student.id, semestersAttended: updatedSemesters });
    }


    // Optionally, navigate away or show a success message
    // For now, let's navigate back to admin. Could also reset the form for multiple entries.
    alert('Marks submitted successfully!'); // Simple feedback
    // navigate('/admin');
    // Or, if you want to allow multiple entries, you might reset the form:
    // (This would require `reset` to be passed from MarksForm or handled differently)
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        {students.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center">
            Please add students first before entering marks.
          </Typography>
        ) : (
          <MarksForm onSubmit={handleSubmit} formTitle="Enter Student Marks" />
        )}
      </Paper>
    </Container>
  );
};

export default MarksEntryPage;