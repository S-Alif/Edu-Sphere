import { NavLink } from "react-router-dom";
import { formatDate, formatTime } from "../../helpers/validators";

import { FaBangladeshiTakaSign } from "react-icons/fa6";


const CourseCard = ({ data }) => {

    let links = ""

    return (
        <>
            <NavLink to={links} className="card w-full bg-base-100 shadow-xl">
                <figure className="aspect-video"><img src={data?.batchImg} alt="batch image" /></figure>
                <div className="card-body pb-2">
                    <h2 className="card-title">{data?.batchName}</h2>

                    <p className="pt-4 text-sm"><span className="font-bold text-emerald-500">Course : </span>{data?.courseName}</p>
                    <p className="text-sm"><span className="font-bold text-emerald-500">For class : </span>{data?.class}</p>
                    <p className="text-sm"><span className="font-bold text-emerald-500">Enroll : </span>{formatTime(formatDate(data?.batchEnroll))}</p>

                    <div className="card-actions pt-4 flex justify-between items-center">
                        <div className="badge badge-outline">{data?.subjectName}</div>
                        {location.pathname != "/student/courses" && <div className="font-bold text-emerald-500"><span className="text-sm inline-block"><FaBangladeshiTakaSign /></span> {data?.price}</div>}
                    </div>

                    {/* instructor info */}
                    <div className="border-t-2 border-t-gray-200 flex py-3 mt-4 gap-2 items-center">
                        <div className="image w-8 h-8 rounded-full overflow-hidden">
                            <img src={data?.instructorImg} alt="instructor" className="w-full h-full object-cover object-center" />
                        </div>

                        <h3 className="text-sm">{data?.instructorFname} {data?.instructorLname}</h3>
                    </div>
                </div>
            </NavLink>
        </>
    );
};

export default CourseCard;