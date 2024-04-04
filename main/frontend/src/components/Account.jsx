import Section from './tag-comps/Section';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import userStore from './../store/userStore';
import { errorAlert } from '../helpers/alertMsg';
import useHandleImage from '../hooks/useHandleImage';
import ChangePass from './ChangePass';


const Account = () => {

  const { profile, userUpdate, userProfile } = userStore()


  // form values
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profileImg: "",
      about: "",
      address: "",
      education: "",
      currentStats: "",
      newProfileImg: ""
    }
  })

  const { handleImage } = useHandleImage(
    (result) => setValue("newProfileImg", result),
    5000,
    errorAlert
  );

  // submti data
  const submitData = async (data) => {
    let result = await userUpdate(profile?.role, data)
    if (result == 1) {
      await userProfile(profile?.role)
    }
  }

  // get profile data
  useEffect(() => {

    (async () => {

      setValue("firstName", profile?.firstName)
      setValue("lastName", profile?.lastName)
      setValue("email", profile?.email)
      setValue("phone", profile?.phone)
      setValue("profileImg", profile?.profileImg)
      setValue("about", profile?.about)
      setValue("address", profile?.address)

      if(profile?.role == 1){
        setValue("education", profile?.education)
        setValue("currentStats", profile?.currentStats)
      }

    })()

  }, [])

  const { newProfileImg, profileImg } = watch();

  return (
    <>
      <Section padding={"py-10"}>
        {/* title */}
        <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
          <h2 className="font-bold text-3xl">Account</h2>
        </div>

        {/* form content */}
        <div className="pt-5" onSubmit={handleSubmit(submitData)}>

          {/* image */}
          <div className="image w-80 h-80 overflow-hidden shadow-xl">
            <img src={newProfileImg != "" ? newProfileImg : profileImg} alt="user-image" className="w-full h-full object-cover object-center rounded-lg" />
          </div>

          {/* form */}
          <form action="" className='pt-5'>

            {/* profile image upload */}
            <label htmlFor="profileImg" className='font-semibold block'>Profile image</label>
            <input type="file" name='profileImg' id='profileImg' className='mt-4 mb-6 file-input file-input-bordered file-input-success max-w-xl w-full' accept='image/jpg, image/png' onChange={handleImage} />

            {/* first name */}
            <label htmlFor="firstName" className='font-semibold block'>First name</label>
            <input type="text" name='firstName' id='firstName' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' {...register("firstName", { required: true, minLength: 2 })} />

            {/* last name */}
            <label htmlFor="lastName" className='font-semibold block'>Last name</label>
            <input type="text" name='lastName' id='lastName' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' {...register("lastName", { required: true, minLength: 2 })} />

            {/* email */}
            <label htmlFor="email" className='font-semibold block'>Email</label>
            <input type="email" name='email' id='email' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' {...register("email")} disabled />

            {/* phone */}
            <label htmlFor="phone" className='font-semibold block'>Phone</label>
            <input type="text" name='phone' id='phone' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' {...register('phone', { required: true, minLength: 11, maxLength: 15 })} />

            {/* address */}
            <label htmlFor="address" className='font-semibold block'>Address</label>
            <input type="text" name='address' id='address' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' placeholder='City or village, District, Bangladesh' {...register("address")} />

            {/* about yourself */}
            <label htmlFor="detail" className="font-semibold block">About yourself</label>
            <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={5} placeholder="About Yourself in 500 characters" {...register("about", { required: true, minLength: 150, maxLength: 500 })} />
            {errors?.detail && errorAlert("Detail should be of 150-500 characters")}

            {
              profile?.role == 1 &&
              <>
                {/* education */}
                <label htmlFor="education" className="font-semibold block">Your education</label>
                <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={5} placeholder="About your education in 500 characters" {...register("education", { required: true, minLength: 80, maxLength: 500 })} />
                {errors?.education && errorAlert("About your education in 80-500 characters")}

                {/* current status */}
                <label htmlFor="currentStats" className="font-semibold block">Current job</label>
                <textarea className="textarea textarea-success mt-4 mb-6 border-emerald-500 max-w-xl w-full" rows={5} placeholder="About your current job in 500 characters" {...register("currentStats", { required: true, minLength: 20, maxLength: 500 })} />
                {errors?.currentStats && errorAlert("About your current job 20-500 characters")}
              </>
            }

            <div className="mt-4 mb-6">
              <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md">Update profile</button>
            </div>

          </form>

        </div>

      </Section>

      {/* pass word form */}
      <ChangePass />

    </>
  );
};

export default Account;