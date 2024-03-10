import { NavLink } from 'react-router-dom';
import Container from './tag-comps/Container';
import useSystemTheme from '../hooks/useSystemTheme';
import userStore from './../store/userStore';

// import logo
import logoDark from '../assets/imgs/logo-dark.png'
import logoLight from '../assets/imgs/logo-light.png'

// placeholder avatar
import avatar from "../assets/imgs/avatar-1577909_640.png"
import { useEffect } from 'react';

const Navbar = () => {

    const theme = useSystemTheme()
    const { user, profile, userProfile } = userStore()

    // get profile data
    useEffect(() => {
        (async () => {
            if (user?.role == 0 || user?.role == 1) {
                await userProfile(user.role)
            }
        })()

    }, [user])

    return (
        <>
            {/* top navbar */}
            <div className={`navbar-top h-20 ${theme ? "bg-slate-900" : "bg-slate-200"} sticky top-0 z-[200]`}>
                <Container className={"h-full"}>
                    <div className="flex w-full h-full justify-between items-center">

                        {/* logo */}
                        <div className="logo">
                            <NavLink to={"/"}> <img src={theme ? logoDark : logoLight} alt="edusphere-logo" className='w-44' /> </NavLink>
                        </div>

                        {/* menu */}
                        <div className="menu-bar flex h-full items-center gap-8">

                            {/* menu links */}
                            <div className="links flex gap-6">
                                <NavLink to={"/"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Home</NavLink>
                                <NavLink to={"/about"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>About</NavLink>
                                <NavLink to={"/courses"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Courses</NavLink>
                                <NavLink to={"/instructors"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Instructors</NavLink>
                                <NavLink to={"/contact"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Contact</NavLink>
                            </div>

                            <div className="profile">
                                <details className="dropdown dropdown-end">
                                    <summary tabIndex={0} className="btn btn-circle avatar border-2 hover:border-emerald-500">
                                        <div className="w-9 rounded-full">
                                            <img alt="profile avatar" src={profile?.profileImg ? profile.profileImg : avatar} />
                                        </div>
                                    </summary>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-emerald-500">

                                        {/* option to show when a user is logged in */}
                                        {user?.uid && (user?.role == 1 || user?.role == 0) && (
                                            <>
                                                <li>
                                                    <NavLink to={`${user?.role == 1 ? "/instructor" : "/student"}`}>Profile</NavLink>
                                                </li>
                                                <li>
                                                    <button>Logout</button>
                                                </li>
                                            </>
                                        )}

                                        {/* option to show when no user is logged in */}
                                        {!user && (
                                            <>
                                                <li>
                                                    <NavLink to={`/login`}>Login</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={`/student-register`}>Register as student</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={`/instructor-register`}>Register as instructor</NavLink>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </details>
                            </div>

                        </div>

                    </div>
                </Container>
            </div>
        </>
    );
};

export default Navbar;