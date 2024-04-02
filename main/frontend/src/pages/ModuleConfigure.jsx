import { useForm } from "react-hook-form";
import Section from "../components/tag-comps/Section";
import { NavLink, useParams } from "react-router-dom";
import { errorAlert } from "../helpers/alertMsg";
import { useEffect, useState } from "react";
import instructorStore from "../store/instructorStore";
import { formatDate } from "../helpers/validators";
import LiveCard from "../components/cards/LiveCard";
import OtherInstructorStore from "../store/OtherInstructorStore";
import ResourceCard from './../components/cards/ResourceCard';


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

        <div className="mt-4 mb-6 flex gap-2">
          <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">{flag ? "update" : "create"} assignment</button>
          {flag && <NavLink to={`/instructor/assignments/${moduleId}/${id}`} className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">submitted assignment</NavLink>}
        </div>

      </form>
    </>
  );
}


// live class
const LiveClass = ({ moduleId }) => {

  const { createLive, getALlLive } = instructorStore()
  const [classes, setClasses] = useState([])

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      link: "",
      topic: "",
      moduleId: moduleId || "",
      description: "",
      start: "",
      end: ""
    }
  })

  useEffect(() => {
    (async () => {
      let lives = await getALlLive(moduleId)
      if (lives != 0) {
        if (lives != undefined && lives != null) {
          setClasses(lives)
        }
      }
    })()
  }, [])

  // form submit
  const submitForm = async (data) => {
    let result = await createLive(data)
    if (result == 1) {
      reset()
      let lives = await getALlLive(moduleId)
      if (lives != 0) setClasses(lives)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="pt-6">

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
          <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">create live class</button>
        </div>

      </form>

      {/* title */}
      <div className="title pt-6 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">live classes</h2>
      </div>

      {
        classes.length > 0 &&
        classes.map((e, index) => (
          <LiveCard key={index} data={e} />
        ))
      }

    </>
  );
}

// resource to module
const Resouces = ({ moduleId }) => {

  const { getResource, resourceGet, resourceShare } = OtherInstructorStore()

  const [resource, setResource] = useState("")
  const [data, setData] = useState([])
  const [materials, setMaterials] = useState([])
  const [flag, setFlag] = useState(false)

  // get resource data
  useEffect(() => {
    (async () => {
      let result = await resourceGet()
      if (result == 0) return
      setData(result)
    })()
  }, [])

  // get the added resources
  useEffect(() => {
    (async () => {
      let result = await getResource(moduleId)
      if (result == 0) return
      setMaterials(result)
      setFlag(false)
    })()
  }, [flag])

  // add resource
  const addResource = async () => {
    if(resource.trim() == "") return
    let result = await resourceShare(moduleId, resource)
    if(result == 0) return
    setFlag(true)
  }


  return (
    <>
      {/* title */}
      <div className="title pt-10 pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Add resource</h2>
      </div>

      {/* resource select option */}
      <div className="pb-12">
        <select className="select border-emerald-400 mt-4 mb-6 max-w-xl w-full" value={resource} onChange={(e) => setResource(e.target.value)}>
          <option value={""}>Choose a material</option>
          {
            data.length > 0 &&
            data.map((e, index) => (
              <option value={e.id} key={index}>{e.material_name}</option>
            ))
          }
        </select>

        <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md block" onClick={addResource}>add material</button>
      </div>

      {materials.length == 0 && <h2 className='font-semibold w-full text-center py-2 bg-gray-200'>No resouce found</h2>}

      {/* show resource table */}
      {
        materials.length > 0 &&
        <div className='overflow-x-auto'>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Resource name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                materials.map((e, index) => (
                  <ResourceCard data={e} index={index + 1} key={index} flag={setFlag} />
                ))
              }

            </tbody>
          </table>
        </div>
      }
    </>
  )
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

  // module form
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

      {/* resource module */}
      <Resouces moduleId={params?.id} />

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