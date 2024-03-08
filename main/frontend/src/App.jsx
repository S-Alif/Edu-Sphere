import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import InstuctorRegPage from './pages/InstuctorRegPage';
import StudentRegPage from './pages/StudentRegPage';
import MainLayout from './components/layouts/MainLayout';
import HomePage from "./pages/HomePage";
import AuthCheck from './components/AuthCheck';
import InstructorDashboard from "./pages/InstructorDashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";


const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="student-register" element={<StudentRegPage />} />
        <Route path="instructor-register" element={<InstuctorRegPage />} />
      </Route>

      {/* protected routes for instructor */}
      <Route element={<AuthCheck role={1} />}>
        <Route path="instructor" element={<MainLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<InstructorDashboard />} />
          </Route>
        </Route>
      </Route>

    </Routes>
  );
};

export default App;