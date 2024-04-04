import ScrollToTop from './ScrollToTop';
import { Route, Routes } from "react-router-dom";

import MainLayout from './component/layout/MainLayout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AllInstructor from './pages/AllInstructor';
import InstructorProfile from './pages/InstructorProfile';
import AuthCheck from './component/AuthCheck';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Payment from './pages/Payment';
import OtpVeirification from './pages/OtpVeirification';
import Subjects from './pages/Subjects';
import IdVerifyPage from './pages/IdVerifyPage';
import ForgotPassPage from './pages/ForgotPassPage';


const App = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/email-verify" element={<IdVerifyPage />} />
        <Route path="/otp-verify" element={<OtpVeirification />} />
        <Route path="/update-pass" element={<ForgotPassPage />} />

        {/* protected routes */}
        <Route element={<AuthCheck role={11} />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/instructors" element={<AllInstructor />} />
            <Route path="/instructors/:id" element={<InstructorProfile />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

export default App;