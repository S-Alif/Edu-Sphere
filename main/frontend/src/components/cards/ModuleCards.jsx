
import { NavLink } from 'react-router-dom';
import { formatDate, formatTime } from './../../helpers/validators';

const ModuleCards = ({ data }) => {
  return (
    <NavLink to={"/instructor/modules/" + data?.batchId + "/" + data?.id} className="card w-full bg-base-100 shadow-xl border-2 border-gray-200 relative">
      <div className="card-body">
        <h3 className="font-semibold pb-3">{data?.name}</h3>
        <p>{data?.detail}</p>

        <p className='text-sm pt-5'><span className="font-medium text-emerald-500">Starts : </span> {formatTime(formatDate(data?.startAt))}</p>
        <p className='text-sm'><span className="text-red-500 font-medium">Ends : </span> {formatTime(formatDate(data?.endAt))}</p>
      </div>
    </NavLink>
  );
};

export default ModuleCards;