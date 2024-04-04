import { NavLink } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import userStore from './../store/userStore';

const Sidebar = () => {

  const [menuToggle, setMenuToggle] = useState(false)
  const { profile, userLogout } = userStore()


  const linkStyles = "py-4 hover:bg-emerald-200 font-semibold transition duration-500 w-full flex justify-center items-center"

  return (
    <>
      <div className="lg:hidden block w-full pb-6 z-20 fixed">
        <button className="btn bg-emerald-400 hover:bg-emerald-500 text-white text-3xl rounded-none" onClick={() => setMenuToggle(prev => !prev)}><HiMenuAlt2 /></button>
      </div>

      {/* sidebar */}
      <div className={`w-80 h-screen pt-9 fixed z-10 lg:sticky top-0 bg-gray-300 ${menuToggle ? 'lg:block' : 'hidden lg:block'}`}>

        <NavLink to={"/profile"} className="mt-5 py-3 bg-emerald-500 flex items-center justify-center gap-4 border-y-2">
          <img src={profile?.profileImg} alt="user image" className="w-16 h-16 rounded-full object-cover border-2 border-white p-1" />

          <div className="text-white">
            <h3 className="font-medium">{profile?.firstName} {profile?.lastName}</h3>
            <p className="text-sm text-gray-200">{profile?.email}</p>
          </div>
        </NavLink>


        {/* links */}
        <div className="pt-5 dashboard-sidebar">
          <NavLink to={"/dashboard"} end className={linkStyles}>Dashboard</NavLink>
          <NavLink to={"/instructors"} className={linkStyles}>Instructors</NavLink>
          <NavLink to={"/subjects"} className={linkStyles}>Subjects</NavLink>
          {/* <NavLink to={"/payment"} className={linkStyles}>Payments</NavLink> */}
          <button className={linkStyles} onClick={userLogout}>logout</button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;