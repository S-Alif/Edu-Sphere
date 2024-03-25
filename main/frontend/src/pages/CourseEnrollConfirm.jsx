import { NavLink, useLocation } from "react-router-dom";
import Section from "../components/tag-comps/Section";
import { FaCircleCheck } from "react-icons/fa6";

const CourseEnrollConfirm = () => {

  const location = useLocation()
  console.log(location)

  return (
    <Section padding={"py-10"} className={"w-screen h-[calc(100vh-80px)] bg-gray-100"}>
      <div className="w-full h-full">
        <div className="bg-white p-6  md:mx-auto flex flex-col items-center">

          {location.pathname == "/enroll/success" && <span className={`text-7xl text-emerald-400`}><FaCircleCheck /></span>}


          <div className="text-center pt-6">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Enroll Success
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for enrolling in the course.
            </p>
            <p>May it help you gain infinite knowledge</p>
            <div className="py-10 text-center">
              <NavLink to={'/'} className="px-12 bg-emerald-400 hover:bg-emerald-500 transition-all duration-300 text-white font-semibold py-3">GO Home</NavLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CourseEnrollConfirm;