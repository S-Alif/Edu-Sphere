import { useEffect, useState } from 'react';
import studentStore from '../store/studentStore';
import Section from './../components/tag-comps/Section';
import userStore from './../store/userStore';
import GridRows from './../components/tag-comps/GridRows';
import CourseCards from './../components/cards/CourseCards';

const StudentEnrolledCourse = () => {

  const { fetchEnrollCourse } = studentStore()
  const { profile } = userStore()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    (async () => {

      let courseData = await fetchEnrollCourse(profile?.id)
      if (courseData != 0) {
        setCourses(courseData)
      }

    })()
  }, [])


  return (
    <Section padding={"py-10"} id={"student-enroll"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Enrolled courses</h2>
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

    </Section>
  );
};

export default StudentEnrolledCourse;