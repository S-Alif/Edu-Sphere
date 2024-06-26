import { useEffect, useState } from 'react';
import { formatDate, formatTime } from './../helpers/validators';

import avatar from '../assets/imgs/avatar-1577909_640.png'
import Section from './../component/tag-comps/Section';
import InstructorStore from './../store/InstructorStore';
import { useParams } from 'react-router-dom';
import CourseCard from '../component/cards/CourseCard';
import GridRows from './../component/tag-comps/GridRows';
import ReviewCards from './../component/cards/ReviewCards';


import { FaStar, FaPaperPlane } from "react-icons/fa6";
import Swal from 'sweetalert2';
import OtherStore from '../store/OtherStore';


const InstructorProfile = () => {

    const params = useParams()
    const [profile, setProfile] = useState({})
    const [subjects, setSubjects] = useState([])
    const [courses, setCourses] = useState([])
    const [rating, setRating] = useState("")
    const [data, setData] = useState([])

    const { getInstructorById, subByInstructor, instructorCourses, instructorReviews } = InstructorStore()
    const { sendNotifyMail } = OtherStore()

    // get datas
    useEffect(() => {
        (async () => {

            let profileData = await getInstructorById(params?.id)
            if (profileData?.status == 0) return setProfile({})
            setProfile(profileData?.data)

            let subData = await subByInstructor(params?.id)
            if (subData?.status == 0) return setSubjects([])
            setSubjects(subData?.data)

            let courseData = await instructorCourses(params?.id)
            if (courseData?.status == 0) return setSubjects([])
            setCourses(courseData?.data)

            let reviews = await instructorReviews(params?.id)
            if (reviews?.status == 0) {
                setRating("")
                setData([])
                return
            }
            setRating(reviews?.data?.avg)
            setData(reviews?.data?.data)


        })()
    }, [])

    // update subjects
    const notifyEmail = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Notify instructor",
            html: `
        <input id="swal-input1" class="swal2-input" placeholder="Email subject">
        <input id="swal-input2" class="swal2-input" placeholder="Email text">`,
            showConfirmButton: true,
            confirmButtonColor: "rgb(16 185 129)",
            confirmButtonText: "send mail",
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value
                ];
            }
        });

        if (formValues) {
            if (formValues[0] == "" || formValues[1] == "") return Swal.fire({ icon: "error", text: "Fill all the data", confirmButtonColor: "rgb(225 29 72)" })
            let result = await sendNotifyMail(profile?.email, {subject: formValues[0], text: formValues[1]})
            if (result == 1) {
                Swal.fire({
                    icon: "success",
                    title: "email sent",
                    confirmButtonColor: "rgb(16 185 129)",
                })
            }
        }
    }





    return (
        <Section>

            <div className="fixed right-7 z-[100]">
                <button className='btn btn-success text-xl text-white' onClick={notifyEmail}><FaPaperPlane /></button>
            </div>

            {/* title */}
            <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
                <h2 className="font-bold text-3xl">Instructor profile</h2>
            </div>

            {/* user detail table */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* image */}
                <div className="image w-80 h-80 overflow-hidden shadow-xl">
                    <img src={profile?.profileImg ? profile?.profileImg : avatar} alt="user-image" className="w-full h-full object-cover object-center rounded-lg" />
                </div>

                {/* profile form */}
                <div className="form-content flex-grow">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody className="text-[17px]">
                                <tr className="hover">
                                    <th>Name</th>
                                    <td>{profile?.firstName} {profile?.lastName}</td>
                                </tr>
                                <tr className="hover">
                                    <th>Email</th>
                                    <td><a href={`mailto:${profile?.email}`} className="hover:text-emerald-500">{profile?.email}</a></td>
                                </tr>
                                <tr className="hover">
                                    <th>Phone</th>
                                    <td>{profile?.phone}</td>
                                </tr>
                                <tr className="hover">
                                    <th>Address</th>
                                    <td>{profile?.address ? profile?.address : ""}</td>
                                </tr>
                                <tr className="hover">
                                    <th>Register date</th>
                                    <td>{formatTime(formatDate(profile?.registerDate))}</td>
                                </tr>
                                <tr className="hover">
                                    <th>Update date</th>
                                    <td>{formatTime(formatDate(profile?.updateDate))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* qualification and current status */}
            {profile?.education &&
                <div className="mt-10 p-5 shadow-lg">
                    <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">Qualification and current status</h3>

                    <div className="whitespace-pre-wrap">{profile?.education}</div>
                    <div className="pt-3"><b>Current job : </b> {profile?.currentStats}</div>

                </div>
            }

            {/* subjects */}
            {subjects.length != 0 &&
                <div className="mt-5 p-5 rounded-lg shadow-lg">
                    <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">Instructor subjects</h3>
                    <div className="flex gap-4">
                        {subjects.map((e, index) => (
                            <button className="btn" key={index}>{e.name}</button>
                        ))}
                    </div>
                </div>
            }

            {/* about  */}
            {profile?.about != "" && profile?.about &&
                <div className="mt-5 p-5 rounded-lg shadow-lg">
                    <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">About</h3>
                    <p>{profile.about}</p>
                </div>}


            {/* title - courses */}
            <div className="title pb-4 pt-20 mb-7 border-b-2 border-b-emerald-300">
                <h2 className="font-bold text-3xl">Instructor Courses</h2>
            </div>

            {courses.length == 0 && <h3 className='font-bold pt-4'>No courses found</h3>}

            {/* show courses */}
            <GridRows className={"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-2"} gap={"gap-4"}>
                {courses.length == 0 && <h1>No course found</h1>}
                {
                    courses.length > 0 &&
                    courses.map((e, index) => (
                        <CourseCard key={index} data={e} />
                    ))
                }
            </GridRows>

            {/* reviews */}
            {data.length != 0 && <h2 className='font-bold text-xl pb-4 pt-16 mb-5 border-b-gray-200 border-b-2 flex gap-3 items-center'>Reviews <span className="flex items-center badge badge-warning text-white">{parseFloat(rating).toFixed(2)}<FaStar /></span></h2>}

            <div className='max-h-[70vh] mb-10 overflow-y-auto'>
                {
                    data.length > 0 &&
                    data.map((e, index) => {
                        return (e.review != null && e.review != "") && (<ReviewCards data={e} key={index} />)
                    })
                }

            </div>

        </Section>
    );
};

export default InstructorProfile;