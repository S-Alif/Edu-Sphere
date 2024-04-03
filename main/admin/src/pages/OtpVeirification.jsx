import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
import Section from "../component/tag-comps/Section";


const OtpVeirification = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")
  const [loader, setLoader] = useState(false)

  const { verifyMail, user } = userStore()

  let email = location?.state?.email


  // submit form
  const submitForm = async (e) => {
    e.preventDefault()
    setLoader(true)
    let result = await verifyMail({ email: email, otpCode: otp })

    if (result?.status == 1) {

      if (user == null && location.state?.location?.pathname != "/register") {
        setTimeout(() => {
          navigate('/update-pass', { replace: true, state: { email: email } })
        }, 3000)

        return
      }

      setTimeout(() => {
        navigate('/', { replace: true })
      }, 3000)

    }

    setLoader(false)
  }


  return (
    <Section padding={"py-10 min-h-screen"} id={"verify-page"}>

      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Verify Account</h2>
      </div>

      <p>An email with verification code has been sent to your email account</p>

      <form action="" onSubmit={submitForm}>
        <input type="text" name='firstName' id='firstName' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-lg w-full' value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button type='submit' className='btn btn-success bg-emerald-500 text-white max-w-sm w-full flex items-center'>Verify otp {loader && <span className="loading loading-spinner loading-sm"></span>}</button>
      </form>

    </Section>
  );
};

export default OtpVeirification;