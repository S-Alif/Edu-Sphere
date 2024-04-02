import { NavLink } from "react-router-dom";
import { formatDate, formatTime } from "../../helpers/validators";

const InstructroCourseCard = ({ batchData }) => {
  return (
    <NavLink to={"/instructor/courses/" + batchData?.id} className={`card w-full bg-base-100 shadow-xl border-2 ${batchData?.published ? "border-emerald-400" : "border-gray-200"} relative`}>

      {/* card body */}
      <div className="card-body">

        <h2 className="text-lg font-bold">{batchData?.name}</h2>
        <div className="pt-3 text-sm">
          <p>created : {formatTime(formatDate(batchData?.createdAt))}</p>
          <p>updated : {formatTime(formatDate(batchData?.updatedAt))}</p>
        </div>

      </div>
    </NavLink>
  );
};

export default InstructroCourseCard;