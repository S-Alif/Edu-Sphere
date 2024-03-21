import { useEffect, useState } from "react";
import OtherInstructorStore from "../store/OtherInstructorStore";
import Section from './../components/tag-comps/Section';
import instructorStore from "../store/instructorStore";
import { formatDate, formatTime } from "../helpers/validators";

const InstructorPayment = () => {

  const [payInfo, setPayInfo] = useState({})
  const [subject, selectedSubjects] = useState(0)
  const [course, setCourse] = useState([])
  const { instructorPay } = OtherInstructorStore()
  const { fetchCourseNames } = instructorStore()

  // instructor payemnts
  useEffect(() => {
    (async () => {
      let result = await instructorPay(subject)
      setPayInfo(result)
    })()
  }, [subject])

  // course names
  useEffect(() => {
    (async () => {
      let result2 = await fetchCourseNames()
      setCourse(result2)
    })()
  }, [])

  return (
    <Section id={"instructor-payment"} padding={"py-10"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Your payment</h2>
      </div>

      <select className="select select-success select-bordered border-emerald-400 mt-4 mb-6 max-w-xl w-full" value={subject} onChange={(e) => selectedSubjects(e.target.value)}>
        <option value={"0"}>choose a course</option>
        {
          course.length > 0 &&
          course.map((e, index) => (
            <option value={e.id} key={index}>{e.name}</option>
          ))
        }
      </select>

      {payInfo.length == 0 && <h2 className="font-semibold text-center">No payemnt details</h2>}

      {
        payInfo.length > 0 &&
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Student info</th>
                <th>Course name</th>
                <th>Batch name</th>
                <th>Amount</th>
                <th>Enroll date</th>
              </tr>
            </thead>
            <tbody>
              {
                payInfo.map((e, index) => (
                  <tr className="hover" key={index}>
                    <th>{index + 1}</th>
                    <th className="flex items-center gap-3">
                      <img src={e.stdImg} alt="" className="w-10 h-10 rounded-full object-cover object-center shadow-md" />
                      <p>{e.stdFname} {e.stdLName}</p>
                    </th>
                    <th>{e.courseName}</th>
                    <td>{e.batchName}</td>
                    <td>{e.paid}</td>
                    <td>{formatTime(formatDate(e.enrollDate))}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }

    </Section>
  );
};

export default InstructorPayment;