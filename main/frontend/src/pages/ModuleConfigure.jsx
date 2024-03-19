import { useForm } from "react-hook-form";
import Section from "../components/tag-comps/Section";
import { useParams } from "react-router-dom";
import { errorAlert } from "../helpers/alertMsg";
import { useEffect, useState } from "react";
import instructorStore from "../store/instructorStore";
import { formatDate } from "../helpers/validators";


// assignment form
const AssignmentForm = ({ moduleId }) => {

  const { createAssignment, getAssignment, updateAssignment } = instructorStore()
  const [flag, setFlag] = useState(false)
  const [id, setId] = useState("")

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      moduleId: moduleId || "",
      starts: "",
      ends: ""
    }
  })

  // get data
  useEffect(() => {
    (async () => {
      let result = await getAssignment(moduleId)
      if (result != 0) {
        setId(result?.id || "")

        setValue("name", result?.name || "")
        setValue("starts", result?.starts ? formatDate(result.starts) : "")
        setValue("ends", result?.ends ? formatDate(result.ends) : "")

        setFlag(true)
      }
    })()
  }, [flag])

  // form submit
  const submitForm = async (data) => {
    if (flag == false) {
      let result = await createAssignment(data)
      if (result == 1) {
        reset()
        setFlag(true)
      }
      return
    }

    await updateAssignment(moduleId, id, data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="pt-6">

        {/* assignment name */}
        <label htmlFor="name" className="font-semibold block">Assignment name</label>
        <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch first module" {...register("name", { required: true, maxLength: 100, minLength: 20 })} />
        {errors?.name && errorAlert("type name properly")}

        {/* assignment start */}
        <label htmlFor="start" className="font-semibold block">Assignment start</label>
        <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("starts", { required: true })} />
        {errors?.starts && errorAlert("Please select a valid start date and time")}

        {/* assignment end */}
        <label htmlFor="end" className="font-semibold block">Assignment end</label>
        <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("ends", { required: true })} />
        {errors?.ends && errorAlert("Please select a valid end date and time")}

        <div className="mt-4 mb-6">
          <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">{flag ? "update" : "create"} assignment</button>
        </div>

      </form>
    </>
  );
}


// live class
const LiveClass = ({ moduleId }) => {

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      topic: "",
      moduleId: moduleId || "",
      description: "",
      start: "",
      end: ""
    }
  })

  // form submit
  const submitForm = async (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="pt-6">

        {/* live class name */}
        <label htmlFor="name" className="font-semibold block">live class topic</label>
        <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch first module" {...register("topic", { required: true, maxLength: 100, minLength: 20 })} />
        {errors?.name && errorAlert("type name properly")}

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
          <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">create live class</button>
        </div>

      </form>
    </>
  );
}


// main module configure function
const ModuleConfigure = () => {

  const params = useParams()
  const { getModuleById, updateModule } = instructorStore()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: "",
      detail: "",
      startAt: "",
      endAt: "",
    }
  })

  // form submit
  const submitForm = async (data) => {
    await updateModule(params?.batch, params?.id, data)
  }

  useEffect(() => {
    (async () => {
      let result = await getModuleById(params?.batch, params?.id)
      if (result != 0) {
        setValue("name", result?.name || "")
        setValue("detail", result?.detail || "")
        setValue("startAt", result?.startAt ? formatDate(result.startAt) : "")
        setValue("endAt", result?.endAt ? formatDate(result.endAt) : "")
      }
    })()
  }, [])


  return (
    <Section padding={"py-10"} id={"module-configure-section"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Configure module</h2>
      </div>

      {/* form */}
      <div className="pb-5">
        <form onSubmit={handleSubmit(submitForm)}>

          {/* module name */}
          <label htmlFor="name" className="font-semibold block">Module name</label>
          <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch first module" {...register("name", { required: true, maxLength: 100, minLength: 20 })} />
          {errors?.name && errorAlert("type name properly")}

          {/* module detail */}
          <label htmlFor="name" className="font-semibold block">Module detail</label>
          <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="First module details are here" {...register("detail", { required: true, maxLength: 200, minLength: 20 })} />
          {errors?.detail && errorAlert("type detail properly")}

          {/* module start */}
          <label htmlFor="start" className="font-semibold block">Module start</label>
          <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("startAt", { required: true })} />
          {errors?.startAt && errorAlert("Please select a valid start date and time")}

          {/* module end */}
          <label htmlFor="end" className="font-semibold block">Module end</label>
          <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("endAt", { required: true })} />
          {errors?.endAt && errorAlert("Please select a valid end date and time")}

          <div className="mt-4 mb-6">
            <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">update module</button>
          </div>

        </form>
      </div>

      {/* title */}
      <div className="title pt-10 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Configure assignments</h2>
      </div>

      <p className="text-red-500 opacity-85"><span className="font-bold">NOTE:</span> There can only be one assignment per module</p>

      {/* assignment form */}
      <AssignmentForm moduleId={params?.id} />

      {/* title */}
      <div className="title pt-10 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Live class</h2>
      </div>

      {/* live class */}
      <LiveClass moduleId={params?.id} />


    </Section>
  );
};

export default ModuleConfigure;