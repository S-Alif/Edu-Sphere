import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Section from "../components/tag-comps/Section";
import basicStore from "../store/basicStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userStore from './../store/userStore';
import { errorAlert } from "../helpers/alertMsg";
import { formatDate, formatTime } from "../helpers/validators";
import studentStore from "../store/studentStore";

import { FaBangladeshiTakaSign } from "react-icons/fa6";

const EnrollPage = () => {

  const params = useParams()
  const [courseData, setCourseData] = useState({})
  const [batch, setBatch] = useState({})

  let fee = parseInt(courseData?.courseDiscount) > 0 ? (parseInt(courseData?.coursePrice) - parseInt(courseData?.courseDiscount)) : parseInt(courseData?.coursePrice)

  const { courseDetail, batchDetail } = basicStore()
  const { profile } = userStore()
  const { courseEnroll } = studentStore()

  // form values
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      courseId: "",
      batchId: "",
      studentId: "",
    }
  })

  // submit the form
  let submitForm = async (data) => {
    let result = await courseEnroll(data)
    if(result?.status == 1){
      window.location.href = result?.data.GatewayPageURL
    }
  }

  // get data
  useEffect(() => {
    (async () => {

      let courseDetailData = await courseDetail(params?.course)
      setCourseData(courseDetailData)

      let batchData = await batchDetail(params?.batch)
      setBatch(batchData)
    })()
  }, [])


  // set values
  useEffect(() => {
    setValue('batchId', params?.batch)
    setValue('courseId', params?.course)
    setValue('studentId', profile?.id)
  }, [])

  return (
    <>
      <PageHeader pageTitle={"Enroll in course"} pageText={"Enroll in your course"} headerBg={"https://plus.unsplash.com/premium_photo-1661779063367-0576efaad7d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />

      <Section className={"enroll-info"}>

        <h2 className="text-3xl font-bold">{courseData?.courseName}</h2>
        <h4 className="text-xl font-medium pt-2 text-gray-400 pb-10">{batch?.name}</h4>

        {/* checkout section */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* course image */}
          <div className="image aspect-video w-full overflow-hidden rounded-lg shadow-lg lg:w-1/2">
            <img src={batch?.courseBatchImg} alt="course image" className="w-full h-full object-cover object-center" />
          </div>

          {/* course total */}
          <div className="w-full lg:w-1/2">

            <table className="table">
              <tbody className="text-xl">

                <th colSpan={2} className="text-xl border border-slate-300 text-gray-500">Course payment details</th>

                <tr className="border border-slate-300 hover">
                  <th>Course fee</th>
                  <td><span className="text-sm inline-block"><FaBangladeshiTakaSign /></span> {courseData?.coursePrice}</td>
                </tr>

                <tr className="border border-slate-300 hover">
                  <th>Discount</th>
                  <td><span className="text-sm inline-block"><FaBangladeshiTakaSign /></span> {courseData?.courseDiscount}</td>
                </tr>

                <tr className="border border-slate-300 hover">
                  <th>total</th>
                  <td><span className="text-sm inline-block"><FaBangladeshiTakaSign /></span> {fee}</td>
                </tr>

              </tbody>
            </table>

            {/* payment form */}
            <form action="" className="pt-10" onSubmit={handleSubmit(submitForm)}>
              <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md w-full">Enroll now</button>
            </form>

          </div>

        </div>

        {/* other data */}
        <table className="table mt-16">
          <th colSpan={2} className="text-xl border border-slate-300">Essential course details</th>

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
          </tbody>
        </table>
      </Section>

    </>
  );
};

export default EnrollPage;