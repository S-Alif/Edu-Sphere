import { useState } from 'react';
import { errorAlert } from '../helpers/alertMsg'
import userStore from '../store/userStore';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from './../component/PageHeader';
import Section from './../component/tag-comps/Section';
import useHandleImage from './../hooks/useHandleImage';
import { dataValidator } from './../helpers/validators';
import { Toaster } from 'sonner';


const Registration = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { handleImage, preview } = useHandleImage(
        (result) => setFormData({ ...formData, profileImg: result }),
        5000,
        errorAlert
    );
    const { userRegistration, sendMail } = userStore()
    const [confirmPass, setConfirmPass] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        phone: "",
        profileImg: null,
        role: "11"
    })

    // handle data
    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // submit form
    const submitForm = async (e) => {
        e.preventDefault()
        let validation = dataValidator(formData, confirmPass)
        // console.log(formData)

        if (validation) {
            let result = await userRegistration(formData)
            if (result == 1) {
                // sending email
                let email = await sendMail({ email: formData.email, type: 0 })

                if (email == 1) {
                    setTimeout(() => {
                        navigate('/otp-verify', { state: { location: location, email: formData.email }, replace: true })
                    }, 2000);
                }
            }
        }
    }

    return (
        <>
            {/* page header */}
            <PageHeader pageTitle={"We are a big family !!"} pageText={"Register now to become a part of this big family"} headerBg={"https://images.unsplash.com/photo-1554252116-30abdf759321?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            {/* register content */}
            <Section className={"register-content"} padding={'py-32'}>
                <div className="flex flex-col justify-center items-center">

                    <h2 className='text-3xl font-bold pb-3 uppercase border-b-2 border-gray-200 mb-20 max-w-4xl w-full text-center'>Registration form</h2>
                    {/* form content */}
                    <div className="form-content flex flex-col lg:flex-row gap-9 max-w-4xl">

                        <div className="avatar">
                            <div className="rounded w-80 h-80 lg:sticky lg:top-20">
                                <img src={preview} alt='pfp' />
                            </div>
                        </div>

                        {/* form */}
                        <form action="" onSubmit={submitForm}>
                            <label htmlFor="profileImg">Profile image</label>
                            <input type="file" name='profileImg' id='profileImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success w-full' accept='.jpg,.png' onChange={handleImage} />

                            <label htmlFor="firstName">First name</label>
                            <input type="text" name='firstName' id='firstName' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.firstName} onChange={handleFormData} />

                            <label htmlFor="lastName">Last name</label>
                            <input type="text" name='lastName' id='lastName' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.lastName} onChange={handleFormData} />

                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.email} onChange={handleFormData} />

                            <label htmlFor="email">Phone</label>
                            <input type="text" name='phone' id='phone' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.phone} onChange={handleFormData} />

                            <label htmlFor="pass">Password</label>
                            <input type="password" name='pass' id='pass' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.pass} onChange={handleFormData} />

                            <label htmlFor="re-pass">Confirm Password</label>
                            <input type="password" name='con_pass' id='re-pass' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

                            <button type='submit' className='btn btn-success bg-emerald-500 text-white w-full'>Register</button>

                        </form>
                    </div>

                    {/* faq */}
                    <div className="faq">

                    </div>
                </div>
            </Section>

            <Toaster visibleToasts={5} richColors={true} closeButton={true} />
        </>
    );
};

export default Registration;