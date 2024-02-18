import { NavLink } from 'react-router-dom';
import Container from './tag-comps/Container';
import useSystemTheme from '../hooks/useSystemTheme';

// import logo
import logoDark from '../assets/imgs/logo-dark.png'
import logoLight from '../assets/imgs/logo-light.png'

const Navbar = () => {

    const theme = useSystemTheme()

    return (
        <>
            {/* top navbar */}
            <div className={`navbar-top h-20 ${theme ? "bg-slate-900" : "bg-current"}`}>
                <Container className={"h-full"}>
                    <div className="flex w-full h-full justify-between items-center">

                        {/* logo */}
                        <div className="logo">
                            <NavLink to={"/"}> <img src={theme ? logoDark : logoLight} alt="edusphere-logo" className='w-48' /> </NavLink>
                        </div>

                        {/* menu */}
                        <div className="menu-bar flex h-full items-center gap-8">

                            {/* menu links */}
                            <div className="links flex gap-5">
                                <NavLink to={"/"} className={`font-bold ${theme ? "hover:text-lime-500" : "hover:text-lime-800"}`}>Home</NavLink>
                                <NavLink to={"/about"} className={`font-bold ${theme ? "hover:text-lime-500" : "hover:text-lime-800"}`}>About</NavLink>
                                <NavLink to={"/courses"} className={`font-bold ${theme ? "hover:text-lime-500" : "hover:text-lime-800"}`}>Courses</NavLink>
                                <NavLink to={"/instructors"} className={`font-bold ${theme ? "hover:text-lime-500" : "hover:text-lime-800"}`}>Instructors</NavLink>
                                <NavLink to={"/contact"} className={`font-bold ${theme ? "hover:text-lime-500" : "hover:text-lime-800"}`}>Contact</NavLink>
                            </div>

                            <div className="profile">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-lime-500">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-lime-500">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>
                </Container>
            </div>
        </>
    );
};

export default Navbar;