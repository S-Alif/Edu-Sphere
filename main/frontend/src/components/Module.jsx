import { useForm } from 'react-hook-form';
import Section from './tag-comps/Section';
import { useParams } from 'react-router-dom';
import { errorAlert } from '../helpers/alertMsg';
import { useEffect, useState } from 'react';
import instructorStore from '../store/instructorStore';
import GridRows from './tag-comps/GridRows';
import ModuleCards from './cards/ModuleCards';

const Module = () => {

  const params = useParams()
  const { createModule, getModule } = instructorStore()

  const [modules, setModules] = useState([])

  // form values
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      batchId: "",
      courseId: "",
      detail: "",
      startAt: "",
      endAt: "",
    }
  })

  // set values default
  useEffect(() => {
    setValue("courseId", params?.course)
    setValue("batchId", params?.id)
  }, [])

  // get module data
  useEffect(() => {

    (async () => {
      let modules = await getModule(params?.id, params?.course)
      if (modules != 0) setModules(modules)
    })()
  }, [])

  // form submit
  const submitForm = async (data) => {
    let result = await createModule(data)
    if (result == 1) {
      reset()
      let modules = await getModule(params?.id, params?.course)
      if (modules != 0) setModules(modules)
      setValue("courseId", params?.course)
      setValue("batchId", params?.id)
    }
  }

  return (
    <Section padding={"py-10"} id={"module-section"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Modules</h2>
      </div>

      <div className="pb-5">
        <form onSubmit={handleSubmit(submitForm)}>

          {/* module name */}
          <label htmlFor="name" className="font-semibold block">Module name</label>
          <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="English first paper revision batch first module" {...register("name", { required: true, maxLength: 100, minLength: 20 })} />
          {errors?.name && errorAlert("type name properly")}

          {/* module detail */}
          <label htmlFor="name" className="font-semibold block">Module detail</label>
          <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="First module details are here" {...register("detail", { required: true, maxLength: 1000, minLength: 20 })} />
          {errors?.detail && errorAlert("type detail in 255 character")}

          {/* module start */}
          <label htmlFor="start" className="font-semibold block">Module start</label>
          <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("startAt", { required: true })} />
          {errors?.startAt && errorAlert("Please select a valid start date and time")}

          {/* module end */}
          <label htmlFor="end" className="font-semibold block">Module end</label>
          <input type="datetime-local" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' {...register("endAt", { required: true })} />
          {errors?.endAt && errorAlert("Please select a valid end date and time")}

          <div className="mt-4 mb-6">
            <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">Create module</button>
          </div>

        </form>
      </div>

      {/* created modules */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Created Modules</h2>
      </div>

      {/* show cards */}
      <GridRows className={"md:grid-cols-2 xl:grid-cols-3"} gap={"gap-3"}>
        {
          modules.length > 0 &&
          modules.map((e, index) => (
            <ModuleCards key={index} data={e} />
          ))
        }
      </GridRows>

    </Section>
  );
};

export default Module;