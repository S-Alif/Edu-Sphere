import { useParams } from "react-router-dom";
import Section from "../components/tag-comps/Section";
import instructorStore from "../store/instructorStore";
import { useEffect, useState } from "react";
import { formatDate, formatTime } from "../helpers/validators";
import OtherInstructorStore from "../store/OtherInstructorStore";
import AssignmentTableCards from "../components/cards/AssignmentTableCards";


const InstructorCheckAssignments = () => {

  const params = useParams()
  const [data, setData] = useState({})
  const [submits, setSubmits] = useState([])
  const [flag, setFlag] = useState(false)

  const { getAssignment } = instructorStore()
  const { fetchAssignmentToCheck } = OtherInstructorStore()


  // get assignment info
  useEffect(() => {
    (async () => {
      let result = await getAssignment(params?.module)
      if (result != 0) {
        setData(result)
      }
    })()
  }, [])

  // fetch assignments
  useEffect(() => {
    (async () => {
      let result = await fetchAssignmentToCheck(params?.id)
      if (result != 0) setSubmits(result)
      setFlag(false)
    })()
  }, [flag])

  return (
    <Section padding={"py-10"} id={"check-assignments"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Submitted assignments</h2>
      </div>

      <h3 className="pb-4 font-semibold">{data?.name}</h3>
      <p><span className="font-medium pb-2">Start : </span> {formatTime(formatDate(data?.starts))}</p>
      <p><span className="font-medium pb-2">End : </span> {formatTime(formatDate(data?.ends))}</p>

      {/* title */}
      <div className="title pb-4 pt-10 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-xl">Submissions ({submits.length})</h2>
      </div>

      {submits.length == 0 && <h2 className="font-medium">No submitted assignment yet</h2>}

      {
        submits.length > 0 &&
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Student</th>
                <th>Assignment</th>
                <th>Remark</th>
                <th>submit date</th>
              </tr>
            </thead>
            <tbody>
              {
                submits.map((e, index) => (
                  <AssignmentTableCards key={index} index={index + 1} data={e} flag={setFlag} />
                ))
              }
            </tbody>
          </table>
        </div>
      }

    </Section>
  );
};

export default InstructorCheckAssignments;