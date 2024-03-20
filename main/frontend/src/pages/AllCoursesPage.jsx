import { useEffect, useState } from "react";
import Section from "../components/tag-comps/Section";
import basicStore from './../store/basicStore';
import GridRows from './../components/tag-comps/GridRows';
import CourseCards from "../components/cards/CourseCards";

const AllCoursesPage = () => {

    const { classes, subjects, courseCards } = basicStore()
    const [courses, setCourses] = useState([])
    const [forClass, setForClass] = useState("0")
    const [course, setCourse] = useState("0")

    useEffect(() => {
        (async () => {
            let result = await courseCards(course, forClass)
            if (result) {
                setCourses(result)
            }
        })()
    }, [forClass, course])

    return (
        <>
            <Section className={"all-course min-h-screen"} id={"all-course-section"} padding={"py-10"}>
                {/* title */}
                <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
                    <h2 className="font-bold text-3xl">All courses</h2>
                </div>

                {/* search fields */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* class */}
                    <select className="select select-success select-bordered border-emerald-400 mt-4 mb-6 max-w-xl w-full" value={forClass} onChange={(e) => setForClass(e.target.value)}>
                        <option value={"0"}>choose a class</option>
                        {
                            classes.length > 0 &&
                            classes.map((e, index) => (
                                <option value={e} key={index}>{e}</option>
                            ))
                        }
                    </select>

                    {/* subjects */}
                    <select className="select select-success select-bordered border-emerald-400 mt-4 mb-6 max-w-xl w-full" value={course} onChange={(e) => setCourse(e.target.value)}>
                        <option value={"0"}>choose a subject</option>
                        {
                            subjects.length > 0 &&
                            subjects.map((e, index) => (
                                <option value={e.id} key={index}>{e.name}</option>
                            ))
                        }
                    </select>
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
        </>
    );
};

export default AllCoursesPage;