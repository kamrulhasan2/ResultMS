import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> {/* MUI Container */}
        <Outlet /> {/* Page content will be rendered here */}
      </Container>
      <footer className="text-center p-4 mt-8 bg-gray-100 text-gray-600">
        © {new Date().getFullYear()} Result Management System <span style={{ fontStyle: 'italic' }}>(Beta version)</span>
        <br />
        <span>Developed by <strong>Kamrul Hasan</strong></span>

      </footer>
    </div>
  );
};

export default Layout;