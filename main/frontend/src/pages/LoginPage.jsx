// import image
import { useState } from 'react';
import loginPageIllustration from '../assets/imgs/login-illustration-1.jpg'
import userStore from '../store/userStore';
import { NavLink } from 'react-router-dom';

const LoginPage = () => {

    const { studentLogin, instrutorLogin } = userStore()

    const [logger, setLogger] = useState(false)
    const [disabler, setDisabler] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    // login submit
    const loginSubmit = async (e) => {
        e.preventDefault()

        setDisabler(true)
        if (logger) {
            var result = await instrutorLogin({ email, pass })
        }
        else {
            result = await studentLogin({ email, pass })
        }

        if (result == 1) {
            setEmail("")
            setPass("")
            setDisabler(false)
            // navigate to profile
        }
        setDisabler(false)
    }

    return (
        <>
            <section className="login-page">
                <div className="flex justify-center lg:justify-normal h-full">

                    <div className="image-box w-1/2 lg:block hidden h-full overflow-hidden">
                        <img src={loginPageIllustration} alt="login page illustration" />
                    </div>

                    {/* form content */}
                    <div className="form-content py-8 lg:py-10 px-4 lg:px-20 shadow-lg lg:shadow-none my-2 lg:my-0">

                        <h1 className='text-3xl font-bold'>Welcome to <span className='text-emerald-500'>eduSphere</span></h1>
                        <p className='pt-1 text-slate-400'>Login to your account</p>

                        {/* party indicator */}
                        <div className="w-full pt-8">
                            <button className={`btn ${!logger ? "" : "btn-outline"} btn-success text-white mr-5 ${disabler && "btn-disabled"}`} onClick={() => setLogger(false)}>Student</button>
                            <button className={`btn ${!logger ? "btn-outline" : ""} btn-success text-white ${disabler && "btn-disabled"}`} onClick={() => setLogger(true)}>Instructor</button>
                        </div>

                        {/* form */}
                        <form action="" className='pt-8 w-full' onSubmit={loginSubmit}>

                            <div className="w-full">
                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input type="email" className='form-control input input-bordered border-emerald-500 mt-4 mb-6 w-full' name='email' id='email' placeholder='enter your email' autoComplete='false' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div className="w-full">
                                <label htmlFor="pass" className='font-semibold'>Password</label>
                                <input type="password" className='form-control input input-bordered border-emerald-500 w-full mt-4' name='pass' id='pass' placeholder='enter your password' value={pass} onChange={(e) => setPass(e.target.value)} required minLength={8} />
                            </div>

                            <button type='submit' className='btn bg-emerald-500 text-white px-10 mt-6 hover:bg-green-700'>
                                Login
                                {
                                    disabler && <span className="loading loading-spinner loading-xs ml-2"></span>
                                }
                            </button>

                        </form>

                        {/* route to registration */}
                        <div className="pt-6">
                            <div>  
                                Don&apos;t have an account !!
                                <details className="dropdown lg:dropdown-right">
                                    <summary className="m-1 btn bg-transparent hover:bg-emerald-500 hover:text-white border-2 border-emerald-500">Register as</summary>
                                    <ul className="p-2 shadow-lg menu dropdown-content z-[1] rounded-box w-52 bg-slate-100">
                                        <li><NavLink to={"/student-register"} className='hover:bg-emerald-500 hover:text-white'>Student</NavLink></li>
                                        <li><NavLink to={"/instructor-register"} className='hover:bg-emerald-500 hover:text-white'>Instructor</NavLink></li>
                                    </ul>
                                </details>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default LoginPage;