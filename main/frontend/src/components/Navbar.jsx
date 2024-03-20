import { NavLink } from 'react-router-dom';
import Container from './tag-comps/Container';
import useSystemTheme from '../hooks/useSystemTheme';
import userStore from './../store/userStore';

// import logo
import logoDark from '../assets/imgs/logo-dark.png'
import logoLight from '../assets/imgs/logo-light.png'

// placeholder avatar
import avatar from "../assets/imgs/avatar-1577909_640.png"
import { useEffect, useState } from 'react';

const Navbar = () => {

    const theme = useSystemTheme()
    const { user, profile, userProfile, userLogout } = userStore()
    const [menu, setMenu] = useState(false)

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
                        <div className="menu-bar flex h-full items-center gap-5 md:gap-8">

                            {/* menu links */}
                            <div className={`links fixed shadow-lg md:shadow-none right-0 md:right-72 md:relative top-20 md:top-auto items-center justify-evenly md:justify-between flex flex-col md:flex-row gap-6 ${theme ? "bg-slate-900" : "bg-slate-200"} h-[calc(100vh-80px)] transition-all duration-500 md:h-auto overflow-hidden md:overflow-visible ${menu ? "w-72" : "w-0"}`}>

                                <NavLink to={"/"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Home</NavLink>
                                <NavLink to={"/about"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>About</NavLink>
                                <NavLink to={"/all-course"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Courses</NavLink>
                                {/* <NavLink to={"/instructors"} className={`font-semibold ${theme ? "hover:text-lime-500" : "hover:text-emerald-500"}`}>Instructors</NavLink> */}
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
                                                    <button onClick={userLogout}>Logout</button>
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
                                                    <NavLink to={`/register`}>Register Account</NavLink>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </details>
                            </div>

                            <label className="btn btn-circle md:hidden swap swap-rotate">

                                {/* this hidden checkbox controls the state */}
                                <input type="checkbox" onChange={() => setMenu(prev => !prev)} />

                                {/* hamburger icon */}
                                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                                {/* close icon */}
                                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                            </label>

                        </div>

                    </div>
                </Container>
            </div>
        </>
    );
};

export default Navbar;