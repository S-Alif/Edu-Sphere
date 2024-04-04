import { NavLink } from "react-router-dom";
import { formatDate, formatTime } from "../../helpers/validators";
import Swal from "sweetalert2";
import InstructorStore from "../../store/InstructorStore";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";


const InstructorProfileCard = ({ data, index, approve, flag }) => {

    const { approveInstructor } = InstructorStore()

    // approve function
    const approval = () => {
        Swal.fire({
            icon: "question",
            title: "Approve Instructor ?",
            showCancelButton: true,
            confirmButtonText: "Approve",
            confirmButtonColor: "rgb(16,185,129)"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let result = await approveInstructor(data?.instructor_id)
                if (result?.status == 0) return
                flag(true)
                Swal.fire("approved!", "", "success");
            }
        });

    }


    return (
        <tr className="hover">
            <td>{index}</td>
            <td>
                <NavLink to={"/instructors/" + data?.instructor_id} className="flex items-center gap-4">
                    <img src={data?.profile_image} alt="user image" className="w-12 h-12 rounded-full object-cover shadow-md" />

                    <h3 className="font-medium">{data?.first_name} {data?.last_name}</h3>
                </NavLink>
            </td>
            <td><a href={`mailto:${data?.email}`} className="hover:text-emerald-500">{data?.email}</a></td>
            <td>{data?.phone}</td>
            <td>
                {data?.verified ?
                    <span className="text-xl text-emerald-500"><FaCircleCheck /></span> :
                    <span className="text-xl text-red-500"><FaCircleXmark /></span>}
            </td>
            {approve == "notApproved" && <td><button className="btn btn-success text-white" onClick={approval}>approve</button></td>}
            <td>{formatTime(formatDate(data?.register_date))}</td>
        </tr>
    );
};

export default InstructorProfileCard;