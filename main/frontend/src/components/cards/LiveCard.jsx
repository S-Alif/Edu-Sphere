import { compareDateTime, formatDate, formatTime } from "../../helpers/validators";
import { NavLink, useLocation, useParams } from "react-router-dom";


const LiveCard = ({ data }) => {

  const location = useLocation()
  const params = useParams()
  let links = location.pathname.substring(0, 15) != "/student/module" ? `/instructor/live-class/${data?.moduleId}/${data?.id}` : "/student/live/" + params?.id + "/" + data?.id

  let time = compareDateTime(formatDate(data?.start), "liveClass")
  let endTime = compareDateTime(formatDate(data?.end), "liveClass")

  return (
    <>
      <NavLink to={location.pathname.substring(0, 15) != "/student/module" ? links :
        (time == "past" && endTime != "future") ? "" : links} className={"card w-full bg-base-100 shadow-xl border-2 border-gray-200 mt-4"}>
        <div className="card-body">
          <h3 className="font-semibold pb-3">{data?.topic}</h3>
          <p>{data?.description}</p>

          <p className='text-sm pt-5'><span className="font-medium text-emerald-500">Starts : </span> {formatTime(formatDate(data?.start))}</p>
          <p className='text-sm'><span className="text-red-500 font-medium">Ends : </span> {formatTime(formatDate(data?.end))}</p>
        </div>
      </NavLink>
    </>
  );
};

export default LiveCard;