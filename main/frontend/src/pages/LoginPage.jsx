// import image
import { useState } from 'react';
import userStore from '../store/userStore';
import { NavLink, useNavigate } from 'react-router-dom';
import PageHeader from './../components/PageHeader';
import Section from './../components/tag-comps/Section';

// icons
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaRegArrowAltCircleRight, FaRegEye } from "react-icons/fa";


const LoginPage = () => {

    const navigate = useNavigate()
    const { userLogin } = userStore()

    const [disabler, setDisabler] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [showPass, setShowPass] = useState(false)

    // login submit
    const loginSubmit = async (e) => {
        e.preventDefault()

        setDisabler(true)
        let result = await userLogin({email, pass})
        
        if (result?.status == 1) {
            setEmail("")
            setPass("")

            // navigate to profile
            setTimeout(() => {
                if (result?.data?.role == 1) {
                    navigate("/instructor", { replace: true })
                }
                else {
                    navigate("/student", { replace: true })
                }
            }, 3000)

            return setDisabler(true)
        }
        setDisabler(false)
    }

    return (
        <>
            <PageHeader pageTitle={"Welcome back !!"} pageText={"Login to see your profile"} headerBg={"https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />

            {/* form section */}
            <Section>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-lg">
                        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 border-b-2 border-gray-200 w-full text-center pb-3"> Login To Your Account</div>

                        {/* form content */}
                        <div className="mt-8">
                            <form onSubmit={loginSubmit}>

                                {/* email field */}
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 text-2xl">
                                            <MdOutlineAlternateEmail />
                                        </div>
                                        <input id="email" type="email" name="email" className="placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-emerald-500" placeholder="E-Mail Address" onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>

                                {/* password field */}
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="password" className="mb-1 tracking-wide text-gray-600">Password:</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 text-xl font-bold">
                                            <IoMdLock />
                                        </div>
                                        <div className="join w-full">
                                            <input id="password" type={showPass ? "text" : "password"} name="password" className="placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-emerald-500 join-item" placeholder="Password" onChange={(e) => setPass(e.target.value)} required />
                                            <button type="button" className={`btn rounded-l-sm border border-gray-400 text-xl hover:border-emerald-400 hover:bg-emerald-500 hover:text-white`} onClick={(e) => setShowPass(prev => !prev)}><FaRegEye /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* forgot password */}
                                <div className="flex items-center mb-6 -mt-4 hidden">
                                    <div className="flex ml-auto">
                                        <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">
                                            Forgot Your Password?
                                        </a>
                                    </div>
                                </div>

                                {/* login button */}
                                <div className="flex w-full">
                                    <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-emerald-400 hover:bg-emerald-500 rounded py-2 w-full transition duration-150 ease-in"> <span className="mr-2 uppercase">Login</span>
                                        {disabler ? <span className="loading loading-spinner loading-sm"></span> : <span><FaRegArrowAltCircleRight /></span>}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* navigate to other registrations */}
                        <div className="mt-10 border-t-2 border-gray-300 pt-3">
                            <div className="flex justify-center w-full">
                                Don't have an account ? <span className='pl-2'><NavLink to={"/register"} className={"text-emerald-600 font-bold"}>
                                    Register now
                                </NavLink></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default LoginPage;