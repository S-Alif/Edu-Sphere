import { NavLink, useLocation, Outlet } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";

const DashboardLayout = () => {

  const location = useLocation()
  const [menuToggle, setMenuToggle] = useState(false)
  const linkStyles = "py-4 hover:bg-emerald-200 font-semibold transition duration-500 wi-full flex justify-center items-center"
  const matchStyles = "bg-emerald-500 text-white"

  return (
    <section className="dashboard-layout flex gap-9">
      <div className={`dashboard-sidebar`}>

        <div className="lg:hidden block w-full pb-6">
          <button className="btn btn-ghost bg-gray-300 text-4xl" onClick={() => setMenuToggle(prev => !prev)}><HiMenuAlt2 /></button>
        </div>

        {/* sidebar */}
        <div className={`w-80 h-[calc(100vh-80px)] pt-9 sticky top-20 bg-gray-300 ${menuToggle ? 'lg:block' : 'hidden lg:block'}`}>
          <NavLink to={'/instructor'} className={`${linkStyles} ${location.pathname == "/instructor" && matchStyles}`}>Dashboard</NavLink>
          <NavLink to={'/instructor/courses'} className={`${linkStyles} ${location.pathname == "/instructor/courses" && matchStyles}`}>My courses</NavLink>
          <NavLink to={'/instructor/account'} className={`${linkStyles} ${location.pathname == "/instructor/account" && matchStyles}`}>Account</NavLink>
        </div>


      </div>
      <div className="dashboard-content w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;