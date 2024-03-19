import { formatDate, formatTime } from "../../helpers/validators";
import { NavLink } from "react-router-dom";


const LiveCard = ({ data }) => {
  return (
    <>
      <NavLink to={`/instructor/live-class/${data?.moduleId}/${data?.id}`} className={"card w-full bg-base-100 shadow-xl border-2 border-gray-200 mt-4"}>
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