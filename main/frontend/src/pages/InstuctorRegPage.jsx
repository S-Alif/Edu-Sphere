import { useNavigate } from "react-router-dom";
import { errorAlert } from "../helpers/alertMsg";
import { dataValidator } from "../helpers/validators";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Section from "../components/tag-comps/Section";
import userStore from "../store/userStore";
import basicStore from "../store/basicStore";
import useHandleImage from "../hooks/useHandleImage";


const InstuctorRegPage = () => {

    const navigate = useNavigate()

    const { getSubjects, subjects } = basicStore()
    const { instructorRegistration } = userStore()
    const [confirmPass, setConfirmPass] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        phone: "",
        profileImg: null,
        address: "",
        sub1: "",
        sub2: "",
    })

    // handle image with custom hook
    const { handleImage, preview } = useHandleImage(
        (result) => setFormData({ ...formData, profileImg: result }),
        5000,
        errorAlert
    );

    // get subjects
    useEffect(() => {
        (async () => {
            await getSubjects()
        })()
    }, [0])

    // handle data
    const handleFormData = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // submit form
    const submitForm = async (e) => {
        e.preventDefault()
        let validation = dataValidator(formData, confirmPass, 1)

        if (validation == true) {
            let result = await instructorRegistration(formData)

            if (result == 1) {
                navigate('/login', { replace: true })
            }
        }
    }

    return (
        <section className="std-register-page">

            {/* page header */}
            <PageHeader pageTitle={"Instructor Registration"} pageText={"Register as a instructor to teach in the best platform"} headerBg={"https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

            {/* register content */}
            <Section className={"register-content"}>
                <div className="flex flex-col justify-center items-center">

                    <h2 className='text-3xl font-bold pb-3 uppercase border-b-2 border-gray-200 mb-20 max-w-4xl w-full text-center'>Registration form</h2>

                    {/* form content */}
                    <div className="form-content flex flex-col lg:flex-row gap-9 max-w-4xl">

                        <div className="avatar mb-9">
                            <div className="rounded w-80 h-80 lg:sticky lg:top-20">
                                <img src={preview} alt='pfp' />
                            </div>
                        </div>

                        {/* form */}
                        <form action="" onSubmit={submitForm}>

                            {/* profile image */}
                            <label htmlFor="profileImg">Profile image</label>
                            <input type="file" name='profileImg' id='profileImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success w-full' accept='image/jpg, image/png' onChange={handleImage} />

                            {/* first name */}
                            <label htmlFor="firstName">First name</label>
                            <input type="text" name='firstName' id='firstName' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.firstName} onChange={handleFormData} />

                            {/* last name */}
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" name='lastName' id='lastName' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.lastName} onChange={handleFormData} />

                            {/* email */}
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.email} onChange={handleFormData} />

                            {/* phone */}
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name='phone' id='phone' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.phone} onChange={handleFormData} />

                            {/* address */}
                            <label htmlFor="address">Address</label>
                            <input type="text" name='address' id='address' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.address} onChange={handleFormData} />


                            {/* show subject choose options */}
                            <div className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-4 ${formData.forClass != "" && "mb-6"}`}>
                                <div>
                                    <label htmlFor="sub1" className="block">Subject one</label>
                                    <select className="select select-success mt-4 w-full" id="sub1" name="sub1" value={formData.sub1} onChange={handleFormData}>
                                        <option value={""}>choose a subject</option>
                                        {
                                            subjects.length > 0 &&
                                            subjects.map((e, index) => (
                                                <option value={e.id} key={index}>{e.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="sub2" className="block">Subject two</label>
                                    <select className="select select-success mt-4 w-full" id="sub2" name="sub2" value={formData.sub2} onChange={handleFormData}>
                                        <option value={""}>choose a subject</option>
                                        {
                                            subjects.length > 0 &&
                                            subjects.map((e, index) => (
                                                <option value={e.id} key={index}>{e.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* password */}
                            <label htmlFor="pass">Password</label>
                            <input type="password" name='pass' id='pass' className='input input-bordered border-emerald-500 mt-4 mb-6 w-full' value={formData.pass} onChange={handleFormData} />

                            {/* confirm password */}
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

        </section>
    );
};

export default InstuctorRegPage;