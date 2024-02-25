import { useState } from 'react';
import PageHeader from './../components/PageHeader';
import Section from './../components/tag-comps/Section';
import { errorAlert } from '../helpers/alertMsg'

import avatar from '../assets/imgs/avatar-1577909_640.png'
import { dataValidator } from '../helpers/validators';


const StudentRegPage = () => {

    const [preview, setPreview] = useState(avatar)
    const [confirmPass, setConfirmPass] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        phone: "",
        profileImg: null
    })

    // image handler
    const handleImage = (e) => {
        let uploadedFile = e.target.files[0]
        if ((uploadedFile.size / 1024) > 5000) {
            errorAlert("Image is larger than 5MB")
            return
        }
        setFormData({...formData, profileImg: uploadedFile})
        const file = new FileReader
        file.onload = () => {
            setPreview(file.result)
        }
        file.readAsDataURL(uploadedFile)
    }

    // handle data
    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // submit form
    const submitForm = async (e) => {
        e.preventDefault()
        let validation = dataValidator(formData, confirmPass, 0)
    }

    return (
        <section className="std-register-page">

            {/* page header */}
            <PageHeader pageTitle={"Student Registration"} pageText={"Register as a student to enroll in the best courses"} headerBg={"https://images.unsplash.com/photo-1554252116-30abdf759321?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            {/* register content */}
            <Section className={"register-content"}>
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* form content */}
                    <div className="form-content">
                        <h2 className='text-xl font-bold pb-8'>Registration form</h2>

                        <div className="avatar mb-9">
                            <div className="w-32 h-32 rounded">
                                <img src={preview} alt='pfp' />
                            </div>
                        </div>

                        {/* form */}
                        <form action="" onSubmit={submitForm}>
                            <label htmlFor="profileImg">Profile image</label>
                            <input type="file" name='profileImg' id='profileImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success w-full' accept='image/png, image/jpg' onChange={handleImage} />

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

                            <button type='submit' className='btn btn-success text-white bg-emerald-600 w-1/2'>Register</button>

                        </form>
                    </div>

                    {/* faq */}
                    <div className="faq">

                    </div>

                </div>
            </Section>

        </section>
    );
};

export default StudentRegPage;