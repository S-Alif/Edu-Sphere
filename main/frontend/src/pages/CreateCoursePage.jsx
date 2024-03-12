import { useForm } from "react-hook-form";
import Section from "../components/tag-comps/Section";
import basicStore from "../store/basicStore";
import { errorAlert } from "../helpers/alertMsg";
import userStore from './../store/userStore';


const CreateCoursePage = () => {

  const { classes } = basicStore()
  const { profile } = userStore()

  const { register, handleSubmit, formState: { errors } } = useForm({
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
      discount: ""
    }
  })

  const submitData = async (data) => {
    console.log(data)
  }

  return (
    <>
      <Section className={"create-course-section"} padding={"py-10"}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Create a course</h2>
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
              {profile?.sub1 && <option value={profile?.sub1?.id}>{profile?.sub1?.name}</option>}
              {profile?.sub2 && <option value={profile?.sub2?.id}>{profile?.sub2?.name}</option>}
            </select>
            {errors?.subject && errorAlert("Select a course")}

            {/* course detail */}
            <label htmlFor="detail" className="font-semibold block">Course detail</label>
            <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={10} placeholder="Course detail" {...register("detail", { required: true, minLength: 150, maxLength: 300 })} />
            {errors?.detail && errorAlert("Detail should be of 150-300 characters")}

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
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: 9:00 AM - 11 AM, for two hours" {...register("classTime", { required: true, minLength: 20, maxLength: 100 })} />
            {errors?.classTime && errorAlert("type at least three class days")}

            {/* course prerequisite */}
            <label htmlFor="preRequisite" className="font-semibold block">Course prerequisite</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: Must know tense" {...register("preRequisite", { required: true, maxLength: 100, minLength: 20 })} />
            {errors?.preRequisite && errorAlert("Prerequisite should not be more than 100 characters")}

            {/* course price */}
            <label htmlFor="price" className="font-semibold block">Course price <span className="text-sm text-red-500">(in taka)</span></label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="6000" {...register("price", { required: true, minLength: 4, maxLength: 5, pattern: /^[0-9]*$/ })} />
            {errors?.price && errorAlert("Write price properly")}

            {/* course discount */}
            <label htmlFor="discount" className="font-semibold block">Course discount <span className="text-sm text-red-500">(in taka, only works if you put the discount amount)</span> <span className="text-sm text-gray-400">(keep empty if there is no discount)</span></label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="2000" {...register("discount", { required: false, minLength: 4, maxLength: 5, pattern: /^[0-9]*$/ })} />
            {errors?.discount && errorAlert("write discount properly")}

            <div className="mt-4 mb-6">
              <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">create course</button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

export default CreateCoursePage;