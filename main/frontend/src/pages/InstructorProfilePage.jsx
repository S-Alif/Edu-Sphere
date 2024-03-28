import { useParams } from "react-router-dom";
import Section from "../components/tag-comps/Section";
import { useEffect, useState } from "react";

import avatar from '../assets/imgs/avatar-1577909_640.png'
import OtherInstructorStore from './../store/OtherInstructorStore';
import { formatDate, formatTime } from './../helpers/validators';
import GridRows from "../components/tag-comps/GridRows";
import CourseCards from "../components/cards/CourseCards";
import ReviewComponent from "../components/ReviewComponent";


const InstructorProfilePage = () => {

  const params = useParams()
  const [profile, setProfile] = useState({})
  const [subjects, setSubjects] = useState([])
  const [courses, setCourses] = useState([])

  const { instructorPublicProfile, subByInstructorPublic, courseByInstructorPublic } = OtherInstructorStore()

  // get the data
  useEffect(() => {
    (async () => {

      let result = await instructorPublicProfile(params?.id)
      setProfile(result)

      let result2 = await subByInstructorPublic(params?.id)
      setSubjects(result2)

      let result3 = await courseByInstructorPublic(params?.id)
      setCourses(result3)

    })()
  }, [])

  return (
    <>
      <Section id={"instructor-public-profile"} padding={'py-10'}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Instructor profile</h2>
        </div>

        {/* instructor detail table */}
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
                  {
                    profile?.address && profile?.address != "" &&
                    <tr className="hover">
                      <th>Address</th>
                      <td>{profile?.address}</td>
                    </tr>
                  }
                  <tr className="hover">
                    <th>Register date</th>
                    <td>{formatTime(formatDate(profile?.registerDate))}</td>
                  </tr>
                </tbody>
              </table>

              {/* subjects */}
              {subjects.length != 0 && profile?.role == 1 &&
                <div className="mt-3 p-5 rounded-lg shadow-lg">
                  <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">Your subjects</h3>
                  <div className="flex gap-4">
                    {subjects.map((e, index) => (
                      <button className="btn" key={index}>{e.name}</button>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>

        </div>

        {/* profile about */}
        {profile?.about != "" && profile?.about &&
          <div className="mt-5 p-5 rounded-lg shadow-lg">
            <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">About</h3>
            <p>{profile.about}</p>
          </div>}

        {/* course cards */}
        <div className="py-10">

          {/* title */}
          <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
            <h2 className="font-bold text-3xl">Instructor Courses</h2>
          </div>

          {/* show cards */}
          <GridRows className={"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-5"} gap={"gap-4"}>
            {courses.length == 0 && <h1>No course found</h1>}
            {
              courses.length > 0 &&
              courses.map((e, index) => (
                <CourseCards key={index} data={e} />
              ))
            }
          </GridRows>
        </div>

      </Section>

      {/* review component */}
      <ReviewComponent />
    </>
  );
};

export default InstructorProfilePage;