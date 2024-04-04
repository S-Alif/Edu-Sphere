import { FaDownload, FaTrashCan, FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import OtherInstructorStore from "../../store/OtherInstructorStore";
import { useLocation, useParams } from "react-router-dom";

const ResourceCard = ({ data, index, flag }) => {

  const { resourceDelete, resourceRemove } = OtherInstructorStore()

  const location = useLocation()
  const params = useParams()

  // delete
  const deleteResource = async () => {
    Swal.fire({
      icon: 'warning',
      title: "Do you want to delete the resource ?",
      showCancelButton: true,
      confirmButtonText: "delete",
      confirmButtonColor: "rgb(220 38 38)",
      cancelButtonColor: "rgb(16 185 129)"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await resourceDelete(data?.id)
        if (result == 0) return
        flag(true)
        Swal.fire("resource deleted!", "", "success");
      }
    });
  }

  const removeResource = async () => {
    Swal.fire({
      icon: 'warning',
      title: "Do you want to remove the resource ?",
      showCancelButton: true,
      confirmButtonText: "remove",
      confirmButtonColor: "rgb(220 38 38)",
      cancelButtonColor: "rgb(16 185 129)"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await resourceRemove(params?.id, data?.id)
        if (result == 0) return
        flag(true)
        Swal.fire("resource removed!", "", "success");
      }
    });
  }


  return (
    <tr className='hover'>
      <th>{index}</th>
      <td>{data?.material_name}</td>
      <td className="flex gap-2">
        <a href={"http://localhost:8000" + data?.material} className="btn btn-ghost bg-gray-200" target="_blank" rel="noreferrer"><FaDownload /></a>
        {location.pathname == "/instructor/resource" && <button className="btn btn-error text-white" onClick={deleteResource}><FaTrashCan /></button>}
        {location.pathname.substring(0, 19) == "/instructor/modules" && <button className="btn btn-error text-white" onClick={removeResource} ><FaXmark /></button>}
      </td>
    </tr>
  );
};

export default ResourceCard;