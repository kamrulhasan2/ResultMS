// src/components/MarksForm.jsx
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { marksSchema } from '../utils/validationSchemas';
import { TextField, Button, Box, Typography, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useStoreState } from 'easy-peasy';

const MarksForm = ({ onSubmit, initialData = null, formTitle }) => {
  const students = useStoreState((state) => state.students.items);

  const defaultFormValues = {
    studentId: '',
    subject: '',
    semester: '',
    assignment: '',
    classTest: '',
    midterm: '',
    finalExam: '',
    ...(initialData || {}) // Spread initialData if provided
  };

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(marksSchema),
    defaultValues: defaultFormValues
  });

  // Watch studentId to potentially pre-fill semester if student is selected
  const selectedStudentId = watch('studentId');
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Example: Pre-fill semester based on selected student's current semester
  // This is a simple example; you might want more complex logic or allow override
  useEffect(() => {
    if (selectedStudent && !initialData?.semester) { // Only if not editing existing data with a semester
      reset(prev => ({ ...prev, semester: selectedStudent.semester }));
    }
  }, [selectedStudent, reset, initialData]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography variant="h5" gutterBottom>{formTitle}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.studentId}>
                <InputLabel id="student-select-label">Select Student</InputLabel>
                <Select
                  labelId="student-select-label"
                  label="Select Student"
                  {...field}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {students.map(student => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name} (Roll: {student.roll})
                    </MenuItem>
                  ))}
                </Select>
                {errors.studentId && <Typography color="error" variant="caption">{errors.studentId.message}</Typography>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="semester"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Semester (e.g., 1st, 2nd)"
                variant="outlined"
                fullWidth
                error={!!errors.semester}
                helperText={errors.semester?.message}
                // You might want a Select here if semesters are predefined for the selected student
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField // Consider Select for predefined subjects
                {...field}
                label="Subject Name"
                variant="outlined"
                fullWidth
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name="assignment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Assignment (Max 10)"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.assignment}
                helperText={errors.assignment?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name="classTest"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Class Test (Max 10)"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.classTest}
                helperText={errors.classTest?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name="midterm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Midterm (Max 30)"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.midterm}
                helperText={errors.midterm?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Controller
            name="finalExam"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Final Exam (Max 50)"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.finalExam}
                helperText={errors.finalExam?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {initialData ? 'Update Marks' : 'Add Marks'}
      </Button>
    </Box>
  );
};

export default MarksForm;