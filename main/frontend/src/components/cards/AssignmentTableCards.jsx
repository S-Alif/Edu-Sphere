import { FaEye } from "react-icons/fa6";
import { formatDate, formatTime } from "../../helpers/validators";
import Swal from "sweetalert2";
import OtherInstructorStore from "../../store/OtherInstructorStore";

const AssignmentTableCards = ({ data, index, flag }) => {

  const { updateAssignmentMark } = OtherInstructorStore()

  let studentId = data?.studentId
  let assignmentId = data?.assignmentId

  // submit values
  const handleOpenPopup = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update marks",
      html: `
    <input id="swal-input1" class="swal2-input" placeholder="e.g - 9">
    <input id="swal-input2" class="swal2-input" placeholder="e.g - You have done well">`,
      showConfirmButton: true,
      confirmButtonColor: "rgb(16 185 129)",
      confirmButtonText: "Submit marks",
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value
        ];
      }
    });

    if (formValues) {
      if (formValues[0] == "" || formValues[1] == "") return Swal.fire({ icon: "error", text: "Fill all the data", confirmButtonColor: "rgb(225 29 72)" })
      let result = await updateAssignmentMark(studentId, assignmentId, { totalMark: formValues[0], remark: formValues[1] })
      flag(true)
    }
  };

  return (
    <tr className="hover">
      <td>{index}</td>
      <td className="flex gap-3 items-center">
        <img src={data?.profileImg} alt="" className="w-12 h-12 object-cover rounded-full" />
        <p className="font-medium">{data?.firstName} {data?.lastName}</p>
      </td>
      <td>
        <a href={"http://localhost:8000" + data?.sub_assignment} className="btn btn-ghost bg-gray-200" target="_blank" rel="noreferrer"><FaEye /></a>
      </td>
      {(data?.totalMark == null || data?.remark == null) && <td><button className="btn btn-ghost bg-gray-200" onClick={handleOpenPopup}>Update Mark</button></td>}
      {(data?.totalMark || data?.remark) && <td><span className="font-medium">total : </span> {data?.totalMark} <br /> <span className="font-medium">remark : </span> {data?.remark}</td>}
      <td>{formatTime(formatDate(data?.date))}</td>
    </tr>
  );
};

export default AssignmentTableCards;