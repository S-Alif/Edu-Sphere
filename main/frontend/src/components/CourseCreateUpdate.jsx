import basicStore from './../store/basicStore';
import userStore from './../store/userStore';
import instructorStore from './../store/instructorStore';
import { useForm } from 'react-hook-form';
import Section from './tag-comps/Section';
import { errorAlert } from '../helpers/alertMsg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const CourseCreateUpdate = () => {

  const params = useParams()
  const navigate = useNavigate()

  // stores
  const { classes, subjects } = basicStore()
  const { profile } = userStore()
  const { createCourse, getCourseById, updateCourse } = instructorStore()

  // form values
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      forClass: "",
      subject: "",
      detail: "",
      duration: "",
      classDay: "",
      classTime: "",
      preRequisite: "",
      price: "",
      discount: "",
      published: 0
    }
  })

  // if params exist get the data of the course
  useEffect(() => {
    if (params?.id) {
      (async () => {
        let result = await getCourseById(params.id)
        if(result != 0){
          setValue("name", result?.name || "")
          setValue("forClass", result?.forClass || "")
          setValue("subject", result?.subject || "")
          setValue("detail", result?.detail || "")
          setValue("duration", result?.duration || "")
          setValue("classDay", result?.classDay || "")
          setValue("classTime", result?.classTime || "")
          setValue("preRequisite", result?.preRequisite || "")
          setValue("price", result?.price || "")
          setValue("discount", result?.discount || "")
          setValue("published", result?.published || 0)
        }
      })()
    }
  }, [])

  // submit data
  const submitData = async (data) => {

    if(params?.id){
      let result = await updateCourse(data, params.id)
      if(result == 1){
        setTimeout(() => {navigate("/instructor/courses")}, 3000)
      }
      return
    }

    let result = await createCourse(data)

    if (result == true) {
      reset()
    }
  }

  return (
    <>
      <Section className={"create-course-section"} padding={"py-10"}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">{params?.id ? "Update course" : "Create a course"}</h2>
        </div>

        {/* form content */}
        <div className="pt-5">

          {/* form */}
          <form action="" onSubmit={handleSubmit(submitData)}>

            {/* course name */}
            <label htmlFor="name" className="font-semibold block">Course name</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="Course name (English second paper revision)" {...register("name", { required: true, maxLength: 100, minLength: 20 })} />
            {errors?.name && errorAlert("type name properly")}

            {/* course class */}
            <label htmlFor="forClass" className="font-semibold block">For class</label>
            <select className="select select-success select-bordered border-emerald-400 mt-4 mb-6 max-w-xl w-full" {...register("forClass", { required: true })}>
              <option value={""}>choose a class</option>
              {
                classes.length > 0 &&
                classes.map((e, index) => (
                  <option value={e} key={index}>{e}</option>
                ))
              }
            </select>
            {errors?.forClass && errorAlert("Select a class")}

            {/* course subject */}
            <label htmlFor="subject" className="font-semibold block">Subject</label>
            <select className="select border-emerald-400 mt-4 mb-6 max-w-xl w-full" {...register("subject", { required: true })}>
              <option value={""}>choose a subject</option>

              {subjects.length > 0 && subjects.map((e, index) => (
                <option value={e.id} key={index}>{e.name}</option>
              ))}
            </select>
            {errors?.subject && errorAlert("Select a course")}

            {/* course detail */}
            <label htmlFor="detail" className="font-semibold block">Course detail</label>
            <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={10} placeholder="Course detail" {...register("detail", { required: true, minLength: 150, maxLength: 2000 })} />
            {errors?.detail && errorAlert("Detail should be of 150-255 characters")}

            {/* course duration */}
            <label htmlFor="duration" className="font-semibold block">Course duration</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: 06 months" {...register("duration", { required: true, minLength: 8, maxLength: 10 })} />
            {errors?.duration && errorAlert("type duration properly")}

            {/* course class days */}
            <label htmlFor="classDay" className="font-semibold block">Class days</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: Saturday, Monday, Wednesday" {...register("classDay", { required: true, minLength: 20, maxLength: 50 })} />
            {errors?.classDay && errorAlert("type at least three class days")}

            {/* course class time */}
            <label htmlFor="classTime" className="font-semibold block">Class time</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: 9:00 AM - 11:00 AM, For two hours on the given day" {...register("classTime", { required: true, minLength: 20, maxLength: 100 })} />
            {errors?.classTime && errorAlert("properly describe class times")}

            {/* course prerequisite */}
            <label htmlFor="preRequisite" className="font-semibold block">Course prerequisite</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: Must know tense" {...register("preRequisite", { required: true, maxLength: 100, minLength: 20 })} />
            {errors?.preRequisite && errorAlert("Prerequisite should not be more than 100 characters")}

            {/* course price */}
            <label htmlFor="price" className="font-semibold block">Course price <span className="text-sm text-red-500">(in taka)</span></label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="6000" {...register("price", { required: true, minLength: 4, maxLength: 5, pattern: /^[0-9]*$/ })} />
            {errors?.price && errorAlert("Write price properly")}

            {/* course discount */}
            <label htmlFor="discount" className="font-semibold block">Course discount <span className="text-sm text-red-500">(in taka, only works if you put the discount amount)</span> <span className="text-sm text-gray-400">(put "0" is there is no discount)</span></label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="2000" {...register("discount", { required: true, maxLength: 5, pattern: /^[0-9]*$/ })} />
            {errors?.discount && errorAlert("write discount properly")}

            {params?.id && 
              <>
              <label htmlFor="detail" className="font-semibold block">Publish course</label>
              <select className="select border-emerald-400 mt-4 mb-6 max-w-xl w-full" {...register("published")}>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              </>
            }

            <div className="mt-4 mb-6">
              <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">{params?.id ? "Update course" : "Create a course"}</button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

export default CourseCreateUpdate;