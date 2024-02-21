// import image
import loginPageIllustration from '../assets/imgs/login-illustration-1.png'

const LoginPage = () => {
    return (
        <>
            <section className="login-page">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    <div className="image-box">
                        <img src={loginPageIllustration} alt="login page illustration" />
                    </div>

                    {/* form content */}
                    <div className="form-content py-8 px-4 lg:px-8">

                        <h1 className='text-3xl font-bold'>Welcome to <span className='text-emerald-500'>eduSphere</span></h1>
                        <p className='pt-1 text-slate-400'>Login to your account</p>

                        <form action="" className='pt-8 w-full'>

                            <div className="w-full lg:w-1/2">
                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input type="email" className='form-control input input-bordered border-emerald-500 mt-4 mb-6 w-full' name='email' id='email' placeholder='enter your email' autoComplete='false' required />
                            </div>

                            <div className="w-full lg:w-1/2">
                                <label htmlFor="pass" className='font-semibold'>Password</label>
                                <input type="password" className='form-control input input-bordered border-emerald-500 w-full mt-4' name='pass' id='pass' placeholder='enter your password' required minLength={8} />
                            </div>

                            <button type='button' className='btn bg-emerald-500 text-white px-10 mt-6 hover:bg-green-700'>Login</button>

                        </form>

                        {/* route to registration */}
                        <div className="pt-6">
                            <p>
                                Don&apos;t have an account !!
                                <details className="dropdown lg:dropdown-right">
                                    <summary className="m-1 btn bg-transparent hover:bg-emerald-500 hover:text-white border-2 border-emerald-500">Register as</summary>
                                    <ul className="p-2 shadow-lg menu dropdown-content z-[1] rounded-box w-52 bg-slate-100">
                                        <li><button className='hover:bg-emerald-500 hover:text-white'>Student</button></li>
                                        <li><button className='hover:bg-emerald-500 hover:text-white'>Instructor</button></li>
                                    </ul>
                                </details>
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default LoginPage;