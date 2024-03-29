import userStore from './../store/userStore';
import useHandleImage from '../hooks/useHandleImage';
import { errorAlert } from '../helpers/alertMsg';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import studentStore from '../store/studentStore';
import { compareDateTime, formatDate, formatTime } from '../helpers/validators';
import Section from '../components/tag-comps/Section';

const AssignmentPage = () => {

  const params = useParams()
  const [assignment, setAssignment] = useState({})
  const [checked, setChecked] = useState({})

  const { profile } = userStore()
  const { showAssignemnt, checkAssignment, submitAssignment } = studentStore()


  // handle image with custom hook
  const { handleImage } = useHandleImage(
    (result) => {
      if (!params?.id) { setValue("courseBatchImg", result) }
      else { setValue("sub_assignment", result) }
    },
    5000,
    errorAlert
  );

  // form values
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      studentId: "",
      assignmentId: "",
      sub_assignment: "",
    }
  })

  // form submit
  const formSubmit = async (data) => {
    if (data?.sub_assignment == "") return errorAlert("Submit a assignment")
    let result = await submitAssignment(data)
    if (result == 1) {
      let checks = await checkAssignment(params?.id, profile?.id)
      setChecked(checks)
    }
  }

  // fil form values
  useEffect(() => {

    setValue("studentId", profile?.id)
    setValue("assignmentId", params?.id)

  }, [])

  // get data
  useEffect(() => {
    (async () => {
      let result = await showAssignemnt(params?.module)
      setAssignment(result)

      let checks = await checkAssignment(params?.id, profile?.id)
      setChecked(checks)
    })()
  }, [])

  let startTime = compareDateTime(formatDate(assignment?.starts), "assignment")
  let endTime = compareDateTime(formatDate(assignment?.ends), "assignment")

  return (
    <Section id={"show-assignment-page"} padding={"py-10"}>
      {/* title */}
      <div className="title pt-6 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">{assignment?.name ? assignment.name : "Module Assignment"}</h2>
      </div>

      <p className='pt-3 text-xl'><span className='font-bold'>Assignment start : </span> {formatTime(formatDate(assignment?.starts))}</p>
      <p className='text-xl'><span className='font-bold'>Assignment end : </span> {formatTime(formatDate(assignment?.ends))}</p>

      {
        (!checked?.id && (endTime == "future" && startTime == "past")) &&
        <>
          <p className='pt-8'>Submit your assignment : (<span className='text-red-500 font-bold'>AS PDF</span> max file size 5mb)</p>

          {/* submit form */}
          <form action="" onSubmit={handleSubmit(formSubmit)}>
            <input type="file" name='courseBatchImg' id='courseBatchImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success max-w-xl w-full' accept='application/pdf' onChange={handleImage} />
            <div className="mb-6">
              <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">submit assignment</button>
            </div>
          </form>
        </>
      }

      <div className="pt-10">
        {
          checked?.id &&
          <>
            <p className='text-xl'><span className='font-bold'>Total marks : </span> {checked?.totalMark == null ? "Assignment under check" : checked?.totalMark}</p>
            <p className='text-xl'><span className='font-bold'>Remarks : </span> {checked?.remark == null ? "Assignment under check" : checked?.remark}</p>
          </>
        }
      </div>

    </Section>
  );
};

export default AssignmentPage;