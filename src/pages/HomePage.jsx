
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Container, Paper, Box, Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School'; // For student view (conceptual)
import { useStoreState } from 'easy-peasy';

const HomePage = () => {
  const students = useStoreState((state) => state.students.items);
  const firstStudentId = students.length > 0 ? students[0].id : null;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ textAlign: 'center', p: 4, mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Result Management System
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
            This is a Result Management System application for managing student results and marks.
            <br />
            <strong>Note:</strong> This is a beta version. Updated features and improvements are coming soon!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AdminPanelSettingsIcon />}
                component={RouterLink}
                to="/admin"
                fullWidth
              >
                Admin Dashboard
              </Button>
            </Grid>
            {/* 
              For a real student view, you'd typically have a search or login.
              This is just a conceptual link for now, or a direct link to the first student for demo.
            */
            
            
            }
            {firstStudentId && (
                 <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        startIcon={<SchoolIcon />}
                        component={RouterLink}
                        to={`/student/${firstStudentId}`} // Link to the first student for demo
                        fullWidth
                    >
                        View Sample Student
                    </Button>
                </Grid>
            )}
            {!firstStudentId && (
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="caption" display="block" sx={{mt:1}}>
                        (Add a student in Admin Dashboard to enable sample student view)
                    </Typography>
                </Grid>
            )}
          </Grid>
        </Box>

        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid #eee' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Version:</strong> 1.0
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a frontend-only demonstration application.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;