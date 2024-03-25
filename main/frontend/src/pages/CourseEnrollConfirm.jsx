import { NavLink, useLocation } from "react-router-dom";
import Section from "../components/tag-comps/Section";

import { FaCircleCheck } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const CourseEnrollConfirm = () => {

  const location = useLocation()
  console.log(location)

  return (
    <Section padding={"py-10"} className={"w-screen h-[calc(100vh-80px)] bg-gray-100"}>
      <div className="w-full h-full">
        <div className="bg-white p-6  md:mx-auto flex flex-col items-center">

          {location.pathname == "/enroll/success" && <span className={`text-7xl text-emerald-400`}><FaCircleCheck /></span>}
          {location.pathname == "/enroll/failed" && <span className={`text-7xl text-red-400`}><MdSmsFailed /></span>}
          {location.pathname == "/enroll/canceled" && <span className={`text-7xl text-yellow-600`}><MdCancel /></span>}


          <div className="text-center pt-6">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              {location.pathname == "/enroll/success" && "Enroll Success"}
              {location.pathname == "/enroll/failed" && "Enroll Failed"}
              {location.pathname == "/enroll/canceled" && "Enroll canceled"}
              
            </h3>
            <p className="text-gray-600 my-2">
              {location.pathname == "/enroll/success" && "Thank you for enrolling in the course"}
              {location.pathname == "/enroll/failed" && "Course enroll failed"}
              {location.pathname == "/enroll/canceled" && "Course enroll canceled"}
            </p>
            <p>
              {location.pathname == "/enroll/success" && "May it help you gain infinite knowledge"}
              {location.pathname == "/enroll/failed" && "We are looking at the problem"}
              {location.pathname == "/enroll/canceled" && "May you find another course in here"}
            </p>
            <div className="py-10 text-center">
              <NavLink to={'/'} 
              className={`px-12 ${location.pathname == "/enroll/success" && "bg-emerald-400 hover:bg-emerald-500"}
              ${location.pathname == "/enroll/failed" && "bg-red-400 hover:bg-red-500"}
              ${location.pathname == "/enroll/canceled" && "bg-yellow-500 hover:bg-yellow-600"}
               transition-all duration-300 text-white font-semibold py-3`} replace={true}>
                GO Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CourseEnrollConfirm;