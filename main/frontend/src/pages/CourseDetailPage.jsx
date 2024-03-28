import { useParams } from "react-router";
import Section from "../components/tag-comps/Section";
import { useEffect, useState } from "react";
import basicStore from './../store/basicStore';
import PageHeader from './../components/PageHeader';
import { NavLink, useLocation } from "react-router-dom";
import { formatDate, formatTime } from "../helpers/validators";
import ModuleCards from "../components/cards/ModuleCards";
import GridRows from './../components/tag-comps/GridRows';

import { FaBangladeshiTakaSign } from "react-icons/fa6";
import userStore from './../store/userStore';
import ReviewComponent from "../components/ReviewComponent";

const CourseDetailPage = () => {
    const params = useParams()
    const location = useLocation()

    const { courseDetail, batchDetail, getModule } = basicStore()
    const { profile } = userStore()

    const [courseData, setCourseData] = useState({})
    const [batch, setBatch] = useState({})
    const [modules, setModules] = useState([])

    useEffect(() => {
        (async () => {

            let courseDetailData = await courseDetail(params?.course)
            setCourseData(courseDetailData)

            let batchData = await batchDetail(params?.batch)
            setBatch(batchData)

            let moduleData = await getModule(params?.batch, params?.course)
            setModules(moduleData)

        })()
    }, [])

    return (
        <>
            <PageHeader pageTitle={courseData?.courseName} pageText={courseData?.courseDetail} headerBg={batch?.courseBatchImg} />

            <Section id={"course-details"}>
                <div className="flex flex-col lg:flex-row gap-6">

                    <div className={`w-full ${location.pathname.substring(0, 15) != "/student/course" && "w-3/4"}`}>

                        <h2 className="text-2xl"><span className="font-bold">Batch : </span>{batch?.name}</h2>

                        {/* course data */}
                        <div className="overflow-x-auto mt-8">

                            {/* data table */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th colSpan={2} className="text-xl border border-slate-300">Essential course details</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[17px]">
                                    <tr className="border border-slate-300 hover">
                                        <th>Duration</th>
                                        <td>{courseData?.courseDuration}</td>
                                    </tr>
                                    <tr className="border border-slate-300 hover">
                                        <th>Subject</th>
                                        <td>{courseData?.courseSubject}</td>
                                    </tr>
                                    <tr className="border border-slate-300 hover">
                                        <th>Pre-requisite</th>
                                        <td>{courseData?.coursePreRequisite}</td>
                                    </tr>
                                    <tr className="border border-slate-300 hover">
                                        <th>Class days</th>
                                        <td>{courseData?.courseClassDay}</td>
                                    </tr>
                                    <tr className="border border-slate-300 hover">
                                        <th>Class time</th>
                                        <td>{courseData?.courseClassTime}</td>
                                    </tr>

                                    {location.pathname.substring(0, 15) != "/student/course" &&
                                        <>
                                            <tr className="border border-slate-300 hover">
                                                <th>Batch starts</th>
                                                <td>{formatTime(formatDate(batch?.start))}</td>
                                            </tr>
                                            <tr className="border border-slate-300 hover">
                                                <th>Batch Ends</th>
                                                <td>{formatTime(formatDate(batch?.end))}</td>
                                            </tr>
                                            <tr className="border border-slate-300 hover">
                                                <th>Enrollment Ends</th>
                                                <td>{formatTime(formatDate(batch?.enrollmentEnd))}</td>
                                            </tr>
                                            <tr className="border border-slate-300 hover">
                                                <th>Price</th>
                                                <td><span className="text-sm inline-block"><FaBangladeshiTakaSign /></span> {
                                                    parseInt(courseData?.courseDiscount) > 0 ?
                                                        (<>{parseInt(courseData?.coursePrice) - parseInt(courseData?.courseDiscount)} <span className="line-through italic pl-4">{courseData?.courseDiscount}</span></>) :
                                                        parseInt(courseData?.coursePrice)
                                                }</td>
                                            </tr>
                                        </>
                                    }
                                </tbody>
                            </table>

                            {/* enrollment button */}
                            {location.pathname.substring(0, 15) != "/student/course" &&
                                <NavLink to={`/enroll/${params?.course}/${params?.batch}`} className={`btn bg-emerald-500 hover:bg-emerald-600 text-white mt-8 max-w-xl w-full`} disabled={profile != null && !profile?.verified} >Enroll now</NavLink>}

                            {/* module accordion */}
                            {location.pathname.substring(0, 15) != "/student/course" &&
                                <div className="pt-8">
                                    {
                                        modules.length > 0 &&
                                        <h3 className="font-bold text-xl pb-3 mb-6 border-b-2 border-b-gray-300">Module details</h3>
                                    }

                                    <div className="join join-vertical w-full">
                                        {
                                            modules.length > 0 &&
                                            modules.map((e, index) => (
                                                <div className="collapse collapse-arrow join-item border border-base-300" key={index}>
                                                    <input type="radio" name="my-accordion-4" defaultChecked={index == 0 && true} />
                                                    <div className="collapse-title text-xl font-medium">
                                                        {e.name}
                                                    </div>
                                                    <div className="collapse-content">
                                                        <p>{e.detail}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }

                            {/* module accordion for student */}
                            {location.pathname.substring(0, 15) == "/student/course" &&
                                <div className="pt-10">
                                    <h3 className="font-bold text-xl pb-3 mb-6 border-b-2 border-b-gray-300">Modules</h3>
                                    <GridRows className={"md:grid-cols-2 xl:grid-cols-3"} gap={"gap-3"}>
                                        {
                                            modules.map((e, index) => (
                                                <ModuleCards data={e} key={index} />
                                            ))
                                        }
                                    </GridRows>
                                </div>
                            }

                        </div>

                    </div>

                    {/* card */}
                    {
                        location.pathname.substring(0, 15) != "/student/course" &&
                        <div className="w-full lg:w-1/4 sticky top-0">
                            <div className="p-5 rounded-lg shadow-md">
                                <img src={courseData?.instructorProfileImg} alt="Instructor profile img" className="w-40 h-40 rounded-full shadow-lg mx-auto object-cover object-center" />
                                <h2 className="text-xl text-center pt-5 font-semibold">{courseData?.instructorFirstName} {courseData?.instructorLastName}</h2>
                                <p className="text-center pt-2">Visit instructor profile for more details</p>
                                <div className="card-actions justify-center pt-5">
                                    <NavLink to={"/instructor-profile/" + courseData?.instructorId} className="btn bg-emerald-500 text-white hover:bg-emerald-500">see profile</NavLink>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </Section>

            {/* course review */}
            <ReviewComponent />
        </>
    );
};

export default CourseDetailPage;