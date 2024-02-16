import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import InstuctorRegPage from './pages/InstuctorRegPage';
import StudentRegPage from './pages/StudentRegPage';
import MainLayout from './components/layouts/MainLayout';


const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="student-register" element={<StudentRegPage />} />
        <Route path="instructor-register" element={<InstuctorRegPage />} />
      </Route>
    </Routes>
  );
};

export default App;