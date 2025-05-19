import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema } from '../utils/validationSchemas';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const StudentForm = ({ onSubmit, initialData = null, formTitle }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: initialData || { name: '', roll: '', session: '', department: '', semester: '' }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography variant="h5" gutterBottom>{formTitle}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="roll"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Roll Number"
                variant="outlined"
                fullWidth
                error={!!errors.roll}
                helperText={errors.roll?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="session"
            control={control}
            render={({ field }) => (
              <TextField // Consider Select for predefined sessions
                {...field}
                label="Session (e.g., 2023-2024)"
                variant="outlined"
                fullWidth
                error={!!errors.session}
                helperText={errors.session?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField // Consider Select for predefined departments
                {...field}
                label="Department"
                variant="outlined"
                fullWidth
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="semester"
            control={control}
            render={({ field }) => (
              <TextField // Consider Select for predefined semesters
                {...field}
                label="Current Semester (e.g., 1st, 2nd)"
                variant="outlined"
                fullWidth
                error={!!errors.semester}
                helperText={errors.semester?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {initialData ? 'Update Student' : 'Add Student'}
      </Button>
    </Box>
  );
};

export default StudentForm;