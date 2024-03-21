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
import StudentDashboard from './pages/StudentDashboard';
import StudentAccountPage from "./pages/StudentAccountPage";
import ModuleConfigure from "./pages/ModuleConfigure";
import LiveUpdate from "./pages/LiveUpdate";
import AllCoursesPage from './pages/AllCoursesPage';
import CourseDetailPage from "./pages/CourseDetailPage";
import EnrollPage from "./pages/EnrollPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import StudentEnrolledCourse from './pages/StudentEnrolledCourse';
import StudentModulePage from "./pages/StudentModulePage";
import LivePage from "./pages/LivePage";
import AssignmentPage from "./pages/AssignmentPage";


const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<StudentRegPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/all-course" element={<AllCoursesPage />} />
        <Route path="/course/:course/:batch" element={<CourseDetailPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* enroll student */}
        <Route element={<AuthCheck role={0} />}>
          <Route path="enroll/:course/:batch" element={<EnrollPage />} />
        </Route>
      </Route>

      {/* protected routes for instructor */}
      <Route element={<AuthCheck role={1} />}>
        <Route path="instructor" element={<MainLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="create-courses" element={<CreateCoursePage />} />
            <Route path="batch-configure" element={<BatchConfigurePage />} />
            <Route path="batch-configure/:course/:id" element={<BatchUpdate />} />
            <Route path="account" element={<InstructorAccountPage />} />
            <Route path="courses" element={<MyCoursesPage />} />
            <Route path="courses/:id" element={<UpdateCoursePage />} />
            <Route path="modules/:batch/:id" element={<ModuleConfigure />} />
            <Route path="live-class/:module/:id" element={<LiveUpdate />} />
          </Route>
        </Route>
      </Route>

      {/* protected routes for student */}
      <Route element={<AuthCheck role={0} />}>
        <Route path="student" element={<MainLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="account" element={<StudentAccountPage />} />
            <Route path="courses" element={<StudentEnrolledCourse />} />
            <Route path="course/:course/:batch" element={<CourseDetailPage />} />
            <Route path="module/:batch/:id" element={<StudentModulePage />} />
            <Route path="live/:module/:id" element={<LivePage />} />
            <Route path="assignment/:module/:id" element={<AssignmentPage />} />
          </Route>
        </Route>
      </Route>

    </Routes>
  );
};

export default App;