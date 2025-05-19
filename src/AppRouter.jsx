import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';
import MarksEntryPage from './pages/MarksEntryPage';
import StudentViewPage from './pages/StudentViewPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
// Import other pages

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/add-student" element={<AddStudentPage />} />
          <Route path="admin/edit-student/:studentId" element={<EditStudentPage />} />
          <Route path="admin/marks-entry" element={<MarksEntryPage />} />
          <Route path="student/:studentId" element={<StudentViewPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;