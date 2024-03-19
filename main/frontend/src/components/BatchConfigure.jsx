import { useNavigate, useParams } from 'react-router-dom';
import Section from './tag-comps/Section';
import { useEffect, useState } from 'react';
import instructorStore from '../store/instructorStore';
import { useForm } from 'react-hook-form';
import useHandleImage from './../hooks/useHandleImage';
import { errorAlert } from '../helpers/alertMsg';
import { formatDate } from '../helpers/validators';

const BatchConfigure = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { fetchCourseNames, createBatch, batchById, updateBatch } = instructorStore()

  const [courseNames, setCourseNames] = useState([])

  // handle image with custom hook
  const { handleImage, preview } = useHandleImage(
    (result) => {
      if (!params?.id) { setValue("courseBatchImg", result) }
      else { setValue("newCourseBatchImg", result) }
    },
    5000,
    errorAlert
  );

  // form values
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      courseId: "",
      courseBatchImg: "",
      start: "",
      end: "",
      enrollmentEnd: "",
      newCourseBatchImg: "",
      published: "0"
    }
  })

  // submit the form
  let onSubmit = async (data) => {
    if (data.courseBatchImg == "") return errorAlert("Select an image")
    if (!params?.id) {
      let result = await createBatch(data)
      if (result == 1) return reset()
    }

    let result = await updateBatch(params?.course, params?.id, data)
    if (result == 1) {
      setTimeout(() => { navigate("/instructor/courses") })
    }
  }

  // get course names
  useEffect(() => {
    (async () => {
      let result = await fetchCourseNames()
      if (result != null && result && result.length > 0) {
        setCourseNames(result)
      }
    })()
  }, [])

  // batch info
  useEffect(() => {
    if (params?.id) {
      (async () => {
        let result = await batchById(params?.course, params?.id);
        if (result != 0) {
          setValue("name", result?.name || "");
          setValue("courseId", result?.courseId || "");
          setValue("courseBatchImg", result?.courseBatchImg || "");
          setValue("start", result?.start ? formatDate(result?.start) : "");
          setValue("end", result?.end ? formatDate(result?.end) : "");
          setValue("enrollmentEnd", result?.enrollmentEnd ? formatDate(result?.enrollmentEnd) : "");
          setValue("published", result?.published.toString() || "0");
        }
      })();
    }
  }, []);

  const { newCourseBatchImg, courseBatchImg } = watch();


  return (
    <>
      <Section className={"batch-configure-section"} padding={"py-10"}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">{params?.id ? "Update batch" : "Create a batch for an existing course"}</h2>
        </div>

        {/* course image preview */}
        <div className="pt-2">
          <div className="max-w-3xl aspect-video w-full rounded-md shadow-lg overflow-hidden">
            {
              !params?.id ?
                <img src={preview} alt="" className='w-full h-full object-cover object-center' /> :
                <img src={newCourseBatchImg != "" ? newCourseBatchImg : courseBatchImg} alt="" className='w-full h-full object-cover object-center' />
            }
          </div>
        </div>

        {/* batch configure form */}
        <div className="pt-8">
          <form action="" onSubmit={handleSubmit(onSubmit)}>

            {/* batch image */}
            <label htmlFor="courseBatchImg" className="font-semibold block">Batch image</label>
            <input type="file" name='courseBatchImg' id='courseBatchImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success max-w-xl w-full' accept='image/jpg, image/png' onChange={handleImage} />

            {/* batch name */}
            <label htmlFor="name" className="font-semibold block">Batch name</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch - 01" {...register("name", { required: true, maxLength: 100, minLength: 20 })} />
            {errors?.name && errorAlert("type name properly")}

            {/* Choose a course */}
            <label htmlFor="name" className="font-semibold block">Choose a course</label>
            <select className="select border-emerald-400 mt-4 mb-6 max-w-xl w-full" {...register("courseId", { required: true })}>
              <option value={""}>choose a course</option>
              {courseNames.length > 0 && courseNames.map((e, index) => (
                <option value={e.id} key={index}>{e.name}</option>
              ))}

            </select>
            {errors?.courseId && errorAlert("Select a course")}

            {/* Batch start */}
            <label htmlFor="start" className="font-semibold block">Batch start</label>
            <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("start", { required: true })} />
            {errors?.start && errorAlert("Please select a valid start date and time")}

            {/* Batch end */}
            <label htmlFor="end" className="font-semibold block">Batch end</label>
            <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("end", { required: true })} />
            {errors?.end && errorAlert("Please select a valid end date and time")}

            {/* Enrollment end */}
            <label htmlFor="enrollmentEnd" className="font-semibold block">Enrollment end</label>
            <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("enrollmentEnd", { required: true })} />
            {errors?.enrollmentEnd && errorAlert("Please select a valid enrollment end date and time")}

            {/* published */}
            <label htmlFor="enrollmentEnd" className="font-semibold block">Published</label>
            <select className="select border-emerald-400 mt-4 mb-6 max-w-xl w-full" {...register("published", { required: true })}>
              <option value={"1"}>Yes</option>
              <option value={"0"}>No</option>
            </select>

            <div className="mt-4 mb-6">
              <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">{params?.id ? "update" : "create"} batch</button>
            </div>

          </form>
        </div>

      </Section>
    </>
  );
};

export default BatchConfigure;