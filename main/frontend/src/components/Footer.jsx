import { NavLink } from "react-router-dom";
import Container from "./tag-comps/Container";
import logoDark from '../assets/imgs/logo-dark.png'


const Footer = () => {
    return (
        <footer className="py-12 bg-slate-900">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full">

                    {/* logo */}
                    <div className="pt-4 w-full">
                        <div className="logo">
                            <NavLink to={"/"}> <img src={logoDark} alt="edusphere-logo" className='w-44' /> </NavLink>
                            <p className="text-white pt-3">The leading online learning platform</p>
                        </div>
                    </div>

                    {/* important links */}
                    <div className="pt-4 w-full">
                        <h5 className="text-xl text-white font-semibold pb-3">Important links</h5>

                        <NavLink to={"/"} className={"text-white block"}>About us</NavLink>
                        <NavLink to={"/"} className={"text-white block"}>Courses</NavLink>
                        <NavLink to={"/"} className={"text-white block"}>Terms and conditions</NavLink>
                        <NavLink to={"/"} className={"text-white block"}>Payment details</NavLink>
                    </div>

                    {/* social media links */}
                    <div className="pt-4 w-full">
                        <h5 className="text-xl text-white font-semibold pb-3">Follow us</h5>

                        {/* icons here */}
                    </div>

                </div>
            </Container>
        </footer>
    );
};

export default Footer;