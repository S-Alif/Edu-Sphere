import { NavLink, Outlet } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import userStore from "../../store/userStore";

const DashboardLayout = () => {

  const [menuToggle, setMenuToggle] = useState(false)
  const { user } = userStore()

  const linkStyles = "py-4 hover:bg-emerald-200 font-semibold transition duration-500 wi-full flex justify-center items-center"

  return (
    <section className="dashboard-layout flex gap-9">
      <div className={`dashboard-sidebar`}>

        <div className="lg:hidden block w-full pb-6">
          <button className="btn btn-ghost bg-gray-300 text-4xl" onClick={() => setMenuToggle(prev => !prev)}><HiMenuAlt2 /></button>
        </div>

        {/* sidebar */}
        <div className={`w-80 h-[calc(100vh-80px)] pt-9 sticky top-20 bg-gray-300 ${menuToggle ? 'lg:block' : 'hidden lg:block'}`}>
          <NavLink to={'/instructor'} end className={linkStyles}>Dashboard</NavLink>
          <NavLink to={'/instructor/courses'} className={linkStyles}>My courses</NavLink>
          {user?.role == 1 && (<NavLink to={'/instructor/create-courses'} className={linkStyles}>Create courses</NavLink>)}
          <NavLink to={'/instructor/account'} className={linkStyles}>Account</NavLink>
        </div>


      </div>
      <div className="dashboard-content w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;