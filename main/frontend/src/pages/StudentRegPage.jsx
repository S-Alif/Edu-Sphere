import { useState } from 'react';
import PageHeader from './../components/PageHeader';
import Section from './../components/tag-comps/Section';
import { errorAlert } from '../helpers/alertMsg'

import { dataValidator } from '../helpers/validators';

import userStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import useHandleImage from '../hooks/useHandleImage';


const StudentRegPage = () => {

    const navigate = useNavigate()
    const { handleImage, preview } = useHandleImage(
        (result) => setFormData({ ...formData, profileImg: result }),
        5000,
        errorAlert
    );
    const { userRegistration } = userStore()
    const [confirmPass, setConfirmPass] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        phone: "",
        profileImg: null,
        role: 0
    })

    // handle data
    const handleFormData = (e) => {
        if(e.target.name == "role"){
            return setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // submit form
    const submitForm = async (e) => {
        e.preventDefault()
        let validation = dataValidator(formData, confirmPass, 0)

        if (validation) {
            let result = await userRegistration(formData)
            if (result == 1) {
                setTimeout(() => {
                    navigate('/login', { replace: true })
                }, 2000);
            }
        }
    }

    return (
        <>
            {/* page header */}
            <PageHeader pageTitle={"We are a big family !!"} pageText={"Register now to become a part of this big family"} headerBg={"https://images.unsplash.com/photo-1554252116-30abdf759321?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            {/* register content */}
            <Section className={"register-content"}>
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
                            <input type="file" name='profileImg' id='profileImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success w-full' accept='image/jpg, image/png' onChange={handleImage} />

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


                            <div className="flex gap-3 pb-5">
                                <label htmlFor="re-pass">Are you a student ? </label>
                                <div className="flex justify-center gap-2">
                                    <input type="radio" name="role" className="radio radio-success" value={0} checked={formData.role === 0} onChange={handleFormData} /> <span>Student</span>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <input type="radio" name="role" className="radio radio-success" value={1} checked={formData.role === 1} onChange={handleFormData} /> <span>Instructor</span>
                                </div>
                            </div>

                            <button type='submit' className='btn btn-success bg-emerald-500 text-white w-full'>Register</button>

                        </form>
                    </div>

                    {/* faq */}
                    <div className="faq">

                    </div>
                </div>
            </Section>
        </>
    );
};

export default StudentRegPage;