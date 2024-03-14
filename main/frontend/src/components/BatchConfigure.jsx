import { useParams } from 'react-router-dom';
import Section from './tag-comps/Section';
import { useEffect, useState } from 'react';
import instructorStore from '../store/instructorStore';
import { useForm } from 'react-hook-form';
import useHandleImage from './../hooks/useHandleImage';
import { errorAlert } from '../helpers/alertMsg';

const BatchConfigure = () => {

  const params = useParams()
  const { fetchCourseNames } = instructorStore()

  const [courseNames, setCourseNames] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")

  // handle image with custom hook
  const { handleImage, preview } = useHandleImage(
    (result) => setValue("courseBatchImg", result),
    5000,
    errorAlert
  );

  // form values
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      courseId: "",
      courseBatchImg: "",
      start: "",
      end: "",
      enrollmentEnd: ""
    }
  })

  // get course names
  useEffect(() => {
    (async () => {
      let result = await fetchCourseNames()
      if (result != null && result && result.length > 0) {
        setCourseNames(result)
      }
    })()
  }, [])


  return (
    <>
      <Section className={"batch-configure-section"} padding={"py-10"}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Create a batch for an existing course</h2>
        </div>

        {/* course image preview */}
        <div className="pt-2">
          <div className=" max-w-3xl aspect-video w-full rounded-md shadow-lg overflow-hidden">
            <img src={preview} alt="" className='w-full h-full object-cover object-center' />
          </div>
        </div>


      </Section>
    </>
  );
};

export default BatchConfigure;