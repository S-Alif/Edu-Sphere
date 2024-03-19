import { useForm } from 'react-hook-form';
import { errorAlert } from '../helpers/alertMsg';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instructorStore from './../store/instructorStore';
import { formatDate } from '../helpers/validators';

const LiveUpdate = () => {

  const params = useParams()
  const { getLiveClass, updateLive } = instructorStore()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      link: "",
      topic: "",
      moduleId: "",
      description: "",
      start: "",
      end: ""
    }
  })

  useEffect(() => {
    (async () => {
      let result = await getLiveClass(params?.module, params?.id)
      if(result != 0) {
        setValue("link", result?.link)
        setValue("topic", result?.topic)
        setValue("description", result?.description)
        setValue("start", formatDate(result?.start) || "")
        setValue("end", formatDate(result?.end) || "")
      }
    })()
  }, [])

  // form submit
  const submitForm = async (data) => {
    await updateLive(params?.module, params?.id, data)
  }

  return (
    <div>
      {/* title */}
      <div className="title pt-6 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Update live classes</h2>
      </div>


      <form onSubmit={handleSubmit(submitForm)}>

        {/* live class link */}
        <label htmlFor="name" className="font-semibold block">live class link</label>
        <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="Zoom link" {...register("link", { required: true, maxLength: 3000, minLength: 20 })} />
        {errors?.name && errorAlert("type zoom link properly")}

        {/* live class name */}
        <label htmlFor="name" className="font-semibold block">live class topic</label>
        <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch first module" {...register("topic", { required: true, maxLength: 100, minLength: 20 })} />
        {errors?.name && errorAlert("type topic properly")}

        {/* live class name */}
        <label htmlFor="name" className="font-semibold block">live class description</label>
        <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch first module" {...register("description", { required: true, maxLength: 254, minLength: 20 })} />
        {errors?.name && errorAlert("type description properly")}

        {/* live class start */}
        <label htmlFor="start" className="font-semibold block">live class start</label>
        <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("start", { required: true })} />
        {errors?.start && errorAlert("Please select a valid start date and time")}

        {/* live class end */}
        <label htmlFor="end" className="font-semibold block">live class end</label>
        <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("end", { required: true })} />
        {errors?.end && errorAlert("Please select a valid end date and time")}

        <div className="mt-4 mb-6">
          <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">update live class</button>
        </div>

      </form>
    </div>
  );
};

export default LiveUpdate;