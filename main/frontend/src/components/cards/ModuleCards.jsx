import { NavLink, useLocation } from 'react-router-dom';
import { compareDateTime, formatDate, formatTime } from './../../helpers/validators';

const ModuleCards = ({ data }) => {

  const location = useLocation()
  let links = location.pathname.substring(0, 15) != "/student/course" ? ("/instructor/modules/" + data?.batchId + "/" + data?.id) : ('/student/module/' + data?.batchId + "/" + data?.id)

  return (
    <NavLink 
    to={location.pathname.substring(0, 15) != "/student/course" ? links : 
        compareDateTime(formatDate(data?.startAt), "module") == "future" ? "" : links} className="card w-full bg-base-100 shadow-xl border-2 border-gray-200 relative">
      <div className="card-body">
        <h3 className="font-semibold pb-3">{data?.name}</h3>
        <p>{data?.detail}</p>

        <p className='text-sm pt-5'><span className="font-medium text-emerald-500">Starts : </span> {formatTime(formatDate(data?.startAt))}</p>
        <p className='text-sm'><span className="text-red-500 font-medium">Ends : </span> {formatTime(formatDate(data?.endAt))}</p>

        <div className="w-full flex justify-end">
          {
            compareDateTime(formatDate(data?.startAt), "module") == "future" ? <span className='badge badge-success text-white'>upcoming</span> :
              compareDateTime(formatDate(data?.endAt), "module") == "future"
                ? <span className='badge badge-success text-white'>ongoing</span> : compareDateTime(formatDate(data?.endAt), "module") == "past" && <span className='badge badge-success text-white'>finished</span>
          }
        </div>
      </div>
    </NavLink>
  );
};

export default ModuleCards;