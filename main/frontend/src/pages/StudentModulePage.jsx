import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import studentStore from "../store/studentStore";
import Section from "../components/tag-comps/Section";
import LiveCard from "../components/cards/LiveCard";
import { formatDate, formatTime } from "../helpers/validators";


const StudentModulePage = () => {

  const params = useParams()

  const { getAssignment, getLives } = studentStore()

  const [lives, setLives] = useState([])
  const [assignment, setAssignment] = useState({})

  useEffect(() => {
    (async () => {

      let live = await getLives(params?.id)
      setLives(live)

      let assignments = await getAssignment(params?.id)
      setAssignment(assignments)

    })()
  }, [])

  return (
    <Section padding={"py-10"} id={"student-module-details"}>
      {/* title */}
      <div className="title pt-6 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">live classes</h2>
      </div>
      {lives.length == 0 && <h3>Now live classes found</h3>}

      {
        lives.length > 0 &&
        lives.map((e, index) => (
          <LiveCard key={index} data={e} />
        ))
      }

      {/* title */}
      <div className="title pt-6 pb-4 mb-7 border-b-2 border-b-emerald-300 mt-10">
        <h2 className="font-bold text-3xl">Assignment</h2>
      </div>
      {!assignment?.id && <h3>Now assignments found</h3>}
      {
        assignment?.id &&
        <NavLink className={"card w-full bg-base-100 shadow-xl border-2 border-gray-200 mt-4"}>
          <div className="card-body">
            <h3 className="font-semibold pb-3">Module Assignment</h3>

            <p className='text-sm pt-5'><span className="font-medium text-emerald-500">Starts : </span> {formatTime(formatDate(assignment?.starts))}</p>
            <p className='text-sm'><span className="text-red-500 font-medium">Ends : </span> {formatTime(formatDate(assignment?.ends))}</p>
          </div>
        </NavLink>
      }
    </Section>
  );
};

export default StudentModulePage;