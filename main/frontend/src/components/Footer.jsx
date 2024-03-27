import { NavLink } from "react-router-dom";
import Container from "./tag-comps/Container";
import logoDark from '../assets/imgs/logo-dark.png'

// icons
import { FaFacebook, FaLinkedinIn, FaXTwitter, FaCopyright } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";


const Footer = () => {
    return (
        <footer className="pt-12 bg-slate-900">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-7">

                    {/* logo */}
                    <div className="pt-4 w-full">
                        <div className="logo">
                            <NavLink to={"/"}> <img src={logoDark} alt="edusphere-logo" className='w-44' /> </NavLink>
                            <p className="text-white pt-3 text-xl">The leading online learning platform</p>
                        </div>
                    </div>

                    {/* important links */}
                    <div className="pt-4 w-full">
                        <h5 className="text-xl text-white font-semibold pb-3">Important links</h5>

                        {/* links */}
                        <ul>
                            <li>
                                <NavLink to={"/about"} className={"text-white inline-block hover:text-emerald-400"}>About us</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/all-course"} className={"text-white inline-block mt-3 hover:text-emerald-400"}>Courses</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/"} className={"text-white inline-block mt-3 hover:text-emerald-400"}>Terms and conditions</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/"} className={"text-white inline-block mt-3 hover:text-emerald-400"}>Payment details</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* social media links */}
                    <div className="pt-4 w-full">
                        <h5 className="text-xl text-white font-semibold pb-4">Follow us</h5>

                        {/* icons here */}
                        <a href="" target="_blank" className="media-icon inline-block p-3 border-2 border-emerald-500 rounded-full bg-emerald-500 text-white text-2xl"><FaFacebook /></a>
                        <a href="" target="_blank" className="media-icon inline-block p-3 border-2 border-emerald-500 rounded-full bg-emerald-500 text-white text-2xl ml-3"><FaXTwitter /></a>
                        <a href="" target="_blank" className="media-icon inline-block p-3 border-2 border-emerald-500 rounded-full bg-emerald-500 text-white text-2xl ml-3"><AiFillInstagram /></a>
                        <a href="" target="_blank" className="media-icon inline-block p-3 border-2 border-emerald-500 rounded-full bg-emerald-500 text-white text-2xl ml-3"><FaLinkedinIn /></a>

                    </div>

                </div>
            </Container>

            <div className="w-full border-t-2 border-dashed mt-12 py-2">
                <img src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png" alt="payment methods" />
            </div>

            {/* copyright message  */}
            <div className="w-full border-t-2 border-dashed">
                <p className="text-center text-gray-300 w-full py-4 font-semibold flex justify-center items-center">
                    <span className="pr-1"><FaCopyright /></span> Copyright 2024 <a href="/" className="text-emerald-500 mx-1" >Edusphere</a> | | All Rights Reserved
                </p>
            </div>

        </footer>
    );
};

export default Footer;