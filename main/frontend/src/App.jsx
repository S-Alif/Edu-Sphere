import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import InstuctorRegPage from './pages/InstuctorRegPage';
import StudentRegPage from './pages/StudentRegPage';
import MainLayout from './components/layouts/MainLayout';
import HomePage from "./pages/HomePage";
import AuthCheck from './components/AuthCheck';
import InstructorDashboard from "./pages/InstructorDashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ContactPage from "./pages/ContactPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import BatchConfigurePage from "./pages/BatchConfigurePage";
import AboutPage from "./pages/AboutPage";
import InstructorAccountPage from "./pages/InstructorAccountPage";
import MyCoursesPage from './pages/MyCoursesPage';
import UpdateCoursePage from './pages/UpdateCoursePage';
import BatchUpdate from "./pages/BatchUpdate";


const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<StudentRegPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      {/* protected routes for instructor */}
      <Route element={<AuthCheck role={1} />}>
        <Route path="instructor" element={<MainLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="create-courses" element={<CreateCoursePage />} />
            <Route path="batch-configure" element={<BatchConfigurePage />} />
            <Route path="batch-configure/:id" element={<BatchUpdate />} />
            <Route path="account" element={<InstructorAccountPage />} />
            <Route path="courses" element={<MyCoursesPage />} />
            <Route path="courses/:id" element={<UpdateCoursePage />} />
          </Route>
        </Route>
      </Route>

    </Routes>
  );
};

export default App;