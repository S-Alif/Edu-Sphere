import { useLocation, Navigate, Outlet } from "react-router-dom";
import userStore from './../store/userStore';


const AuthCheck = ({ role }) => {

  const location = useLocation()
  const { user } = userStore()

  return (
    user != null ?
      user?.role == role ?
        <Outlet /> : <Navigate to={"/unauthorized"} state={{ from: location }} replace />
       : <Navigate to={"/"} state={{from: location}} replace/>
  );
};

export default AuthCheck;