import { NavLink, useLocation } from "react-router-dom";
import Section from "../components/tag-comps/Section";


const UnauthorizedPage = () => {

  return (
    <Section className={"h-[calc(100vh-80px)] flex justify-center items-center flex-col"} id={"unauthorized-page"}>
      <div className="text-center w-full h-[inherit]">
        <h1 className="text-7xl pb-10">Un-authorized</h1>
        <div className="flex gap-3 justify-center">
          <NavLink to={"/"} className={"btn btn-square btn-neutral w-full max-w-28"} replace={true}>Go to home</NavLink>
          <NavLink to={"/login"} className={"btn btn-square btn-neutral w-full max-w-28"} replace={true}>Login</NavLink>
        </div>
      </div>
    </Section>
  );
};

export default UnauthorizedPage;