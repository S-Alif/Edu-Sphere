// import image
import { useState } from 'react';
import loginPageIllustration from '../assets/imgs/login-illustration-1.jpg'
import userStore from '../store/userStore';

const LoginPage = () => {

    const { studentLogin } = userStore()

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const loginSubmit = async (e) => {
        e.preventDefault()

        let result = await studentLogin({ email, pass })
        if (result != 0) {
            // navigate to profile
        }
    }

    return (
        <>
            <section className="login-page">
                <div className="flex justify-center lg:justify-normal h-full">

                    <div className="image-box w-1/2 lg:block hidden h-full overflow-hidden">
                        <img src={loginPageIllustration} alt="login page illustration" />
                    </div>

                    {/* form content */}
                    <div className="form-content py-8 lg:py-20 px-4 lg:px-20 shadow-lg lg:shadow-none my-12 lg:my-0">

                        <h1 className='text-3xl font-bold'>Welcome to <span className='text-emerald-500'>eduSphere</span></h1>
                        <p className='pt-1 text-slate-400'>Login to your account</p>

                        <form action="" className='pt-8 w-full' onSubmit={loginSubmit}>

                            <div className="w-full">
                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input type="email" className='form-control input input-bordered border-emerald-500 mt-4 mb-6 w-full' name='email' id='email' placeholder='enter your email' autoComplete='false' onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div className="w-full">
                                <label htmlFor="pass" className='font-semibold'>Password</label>
                                <input type="password" className='form-control input input-bordered border-emerald-500 w-full mt-4' name='pass' id='pass' placeholder='enter your password' onChange={(e) => setPass(e.target.value)} required minLength={8} />
                            </div>

                            <button type='submit' className='btn bg-emerald-500 text-white px-10 mt-6 hover:bg-green-700'>Login</button>

                        </form>

                        {/* route to registration */}
                        <div className="pt-6">
                            <div>
                                Don&apos;t have an account !!
                                <details className="dropdown lg:dropdown-right">
                                    <summary className="m-1 btn bg-transparent hover:bg-emerald-500 hover:text-white border-2 border-emerald-500">Register as</summary>
                                    <ul className="p-2 shadow-lg menu dropdown-content z-[1] rounded-box w-52 bg-slate-100">
                                        <li><button className='hover:bg-emerald-500 hover:text-white'>Student</button></li>
                                        <li><button className='hover:bg-emerald-500 hover:text-white'>Instructor</button></li>
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