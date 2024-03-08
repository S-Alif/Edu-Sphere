import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

import avatar from '../assets/imgs/avatar-1577909_640.png'

const UserProfile = () => {

  const naviagte = useNavigate()
  const location = useLocation()
  const { user, profile } = userStore()

  // check if the user is logged in
  if (user == null || (user?.role != 0 && user?.role != 1)) {
    naviagte("/login", { state: { from: location }, replace: true })
  }

  return (
    <div className="user-profile flex flex-col lg:flex-row gap-6">
      
    </div>
  );
};

export default UserProfile;