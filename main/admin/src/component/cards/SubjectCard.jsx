import { FaTrashCan } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import OtherStore from "../../store/OtherStore";
import Swal from "sweetalert2";

const SubjectCard = ({ data, index, flag }) => {

  const { subUpdate, subDelete } = OtherStore()

  // update subjects
  const update = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update marks",
      html: `
    <input id="swal-input1" class="swal2-input" value="${data?.name}">
    <input id="swal-input2" class="swal2-input" value="${data?.code}">`,
      showConfirmButton: true,
      confirmButtonColor: "rgb(16 185 129)",
      confirmButtonText: "update subject",
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
      let result = await subUpdate({ name: formValues[0], code: formValues[1] }, data?.id)
      if(result == 1){
        flag(true)
        Swal.fire({
          icon: "success",
          title: "subject updated",
          confirmButtonColor: "rgb(16 185 129)",
        })
      }
    }
  }

  // delete subject
  const deleteSub = async () => {
    Swal.fire({
      icon: 'warning',
      title: "Do you want to delete the subject ?",
      showCancelButton: true,
      confirmButtonText: "delete",
      confirmButtonColor: "rgb(220 38 38)",
      cancelButtonColor: "rgb(16 185 129)"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await subDelete(data?.id)
        if (result == 0) return
        flag(true)
        Swal.fire("subject deleted!", "", "success");
      }
    });
  }


  return (
    <tr className="hover">
      <td>{index}</td>
      <td className="font-semibold">{data?.name}</td>
      <td>{data?.code}</td>
      <td className="flex gap-2">
        <button className="btn btn-success text-white" onClick={update}><RxUpdate /></button>
        <button className="btn btn-error text-white" onClick={deleteSub}><FaTrashCan /></button>
      </td>
    </tr>
  );
};

export default SubjectCard;