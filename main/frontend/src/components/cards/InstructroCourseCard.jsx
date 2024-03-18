import { NavLink } from "react-router-dom";

const InstructroCourseCard = ({batchData}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl border-2 border-gray-200 relative">

      <div className="absolute left-[calc(100%-32px)] top-4">
        {batchData?.published ? <div className="badge bg-emerald-500 badge-sm"></div> : <div className="badge bg-red-600 badge-sm"></div>}
      </div>

      {/* card body */}
      <div className="card-body">

        <h2 className="text-lg font-bold">{batchData?.name}</h2>
        <div className="pt-3">
          <p>created at : {batchData?.createdAt.substr(0, 10)}</p>
          <p>updated at : {batchData?.updatedAt.substr(0, 10)}</p>
        </div>

        <NavLink to={"/instructor/courses/" + batchData?.id} className={"btn btn-sm mt-4 bg-emerald-400 text-white hover:bg-emerald-500"}>update course</NavLink>

        {/* batches */}
        <div className="pt-5">
          {(batchData?.batches && batchData?.batches.length > 0) && <h6 className="text-sm font-bold pb-2 border-b-2 border-b-gray-200"> Batches</h6>}
        </div>
        {
          (batchData?.batches && batchData?.batches.length > 0) && 
          batchData?.batches.map((e, index) => (
            <NavLink to={"/instructor/batch-configure/"+e.id} key={index} className={"rounded-lg border-2 border-gray-200 block p-2 hover:border-emerald-400"}>{e.name}</NavLink>
          ))
        }
      </div>
    </div>
  );
};

export default InstructroCourseCard;