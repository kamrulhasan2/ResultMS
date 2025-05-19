import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { LoginSharp } from '@mui/icons-material'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Result MS <span style={{ fontStyle: 'italic' }}>(Beta version)</span>
          </RouterLink>
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/admin">Admin Dashboard</Button>        
          <Button color="inherit" component={RouterLink} to="/admin/add-student">Add Student</Button>
          <Button color="inherit" component={RouterLink} to="/admin/marks-entry">Marks Entry</Button>
          <Button color="inherit" component={RouterLink} to="/login" sx={{ ml: 2 }}>
           Login <LoginSharp />
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;