import { useForm } from "react-hook-form";
import Section from "../components/tag-comps/Section";
import basicStore from "../store/basicStore";
import { errorAlert } from "../helpers/alertMsg";
import useHandleImage from "../hooks/useHandleImage";
import userStore from './../store/userStore';


const CreateCoursePage = () => {

  const { classes } = basicStore()
  const { profile } = userStore()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  // handle image with custom hook
  const { handleImage, preview } = useHandleImage(
    (result) => setValue("courseImg", result),
    5000,
    errorAlert
  );

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

          {/* preview image */}
          <div className="mb-12 max-w-3xl">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative">
              <img src={preview} alt='course-image' className="w-full h-full object-cover object-center" />
              {/* image overlay */}
              <div className="absolute w-full h-full top-0 left-0 bg-gray-900 bg-opacity-75 opacity-0 hover:opacity-100 duration-500 flex flex-col justify-center items-center text-white">
                <h3 className="font-bold pb-2 text-2xl">16 : 9</h3>
                <p className="text-xl">aspect ratio</p>
              </div>
            </div>
          </div>

          {/* form */}
          <form action="" onSubmit={handleSubmit(submitData)}>

            {/* course image */}
            <label htmlFor="courseImg" className="font-semibold block">Course image</label>
            <input type="file" name='courseImg' id='courseImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success max-w-xl w-full' accept='image/jpg, image/png' onChange={handleImage} />

            {/* course name */}
            <label htmlFor="name" className="font-semibold block">Course name</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="Course name (English second paper revision)" {...register("name", { required: true, minLength: 100, maxLength: 100 })} />
            {errors?.name && errorAlert("type name properly")}

            {/* course class */}
            <label htmlFor="forClass" className="font-semibold block">For class</label>
            <select className="select select-success mt-4 mb-6 max-w-xl w-full">
              <option value={""}>choose a class</option>
              {
                classes.length > 0 &&
                classes.map((e, index) => (
                  <option value={e} key={index}>{e}</option>
                ))
              }
            </select>

            {/* course subject */}
            <label htmlFor="subject" className="font-semibold block">Subject</label>
            <select className="select bg-emerald-400 mt-4 mb-6 max-w-xl w-full">
              <option value={""}>choose a subject</option>
              {profile?.sub1 && <option value={profile?.sub1?.id}>{profile?.sub1?.name}</option>}
              {profile?.sub2 && <option value={profile?.sub2?.id}>{profile?.sub2?.name}</option>}
            </select>

            {/* course detail */}
            <label htmlFor="detail" className="font-semibold block">Course detail</label>
            <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={10} placeholder="Course detail" />

            {/* course duration */}
            <label htmlFor="duration" className="font-semibold block">Course duration</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: 6 months" />

            {/* course class days */}
            <label htmlFor="classDay" className="font-semibold block">Class days</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: Saturday, Monday, Wednesday" />

            {/* course prerequisite */}
            <label htmlFor="preRequisite" className="font-semibold block">Course prerequisite</label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="eg: Must know tense" />

            {/* course price */}
            <label htmlFor="preRequisite" className="font-semibold block">Course price <span className="text-sm text-red-500">(in taka)</span></label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="6000" />

            {/* course discount */}
            <label htmlFor="preRequisite" className="font-semibold block">Course discount <span className="text-sm text-red-500">(in taka, only works if you put the discount amount)</span> <span className="text-sm text-gray-400">(keep empty if there is no discount)</span></label>
            <input type="text" className='mt-4 mb-6 input input-bordered border-emerald-500 max-w-xl w-full' placeholder="2000" />

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