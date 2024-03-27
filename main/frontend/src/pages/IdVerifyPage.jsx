import { useState } from "react";
import Section from "../components/tag-comps/Section";
import userStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const IdVerifyPage = () => {

  const navigate = useNavigate()
  const [mail, setMail] = useState("")
  const [id, setId] = useState({})

  const { userByemail, sendMail } = userStore()


  // find user
  let findUser = async (e) => {
    e.preventDefault()

    let user = await userByemail(mail)
    if (user?.status == 1) {
      setId(user?.data)
    }
  }

  // send mail and navigate to next page
  const nextBtn = async () => {
    let email = await sendMail({email: mail, type: 1})
    if(email == 1){
      navigate('/otp-verify', {state: {email: mail}, replace: true})
    }
  }


  return (
    <Section className={'email-verify min-h-[calc(100vh-80px)]'} padding={"py-10"}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Find your account</h2>
      </div>

      <form onSubmit={findUser}>
        <label htmlFor="email" className="font-medium block">Type your email</label>
        <input type="email" name='email' id='email' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-lg w-full' value={mail} onChange={(e) => setMail(e.target.value)} required pattern="/^[a-zA-Z0-9._%+-]+@gmail\.com$/" disabled={id?.firstName && true} />

        <div className="max-w-sm">
          <button type='submit' className='btn btn-success bg-emerald-500 text-white w-full' disabled={id?.firstName && true}>find user</button>
        </div>
      </form>

      {/* user info */}
      {
        id?.firstName &&
        <>
          <div className="title pb-4 pt-10 mb-7 border-b-2 border-b-emerald-300">
            <h2 className="font-bold text-3xl">User Info</h2>
          </div>

          <div className="flex gap-4 items-center">
            <img src={id?.profileImg} alt="" className="w-20 h-20 object-cover rounded-full" />
            <p className="font-medium text-xl">{id?.firstName} {id?.lastName}</p>
          </div>

          <div className="pt-5 flex gap-3">
            <button className="btn btn-ghost bg-gray-200" onClick={() => setId({})}>not my account</button>
            <button className="btn btn-success bg-emerald-500 text-white" onClick={nextBtn}>next</button>
          </div>
        </>
      }

    </Section>
  );
};

export default IdVerifyPage;