import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
import { errorAlert } from "../helpers/alertMsg";
import Section from './tag-comps/Section';
import { Toaster } from "sonner";


const ChangePass = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")

  const { passChange, publicPassChange } = userStore()

  let email = location?.state?.email

  // form submit
  const formSubmit = async (e) => {
    e.preventDefault()
    if (currentPass == "" || newPass == "") return errorAlert("password cannot be empty")

    if (location.pathname == "/update-pass") {
      //code here
      if (currentPass != newPass) return errorAlert("password don't match")
      let result = await publicPassChange({ currentPass, newPass, email: email })
      if (result == 1) {
        setCurrentPass("")
        setNewPass("")
        setTimeout(() => {
          navigate("/", {replace: true})
        }, 2000)

        return
      }
    }

    let result = await passChange({ currentPass, newPass })
    if (result == 1) { setCurrentPass(""); setNewPass("") }
  }

  return (
    <Section padding={`${location.pathname == "/update-pass" ? "py-10" : "pb-10"}`}>
      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Change password</h2>
      </div>

      {/* password forms */}
      <div className="pass-forms">

        {/* current pass */}
        <label htmlFor="currentPass" className='font-semibold block'>{location.pathname == "/update-pass" ? "New" : "Current"} password</label>
        <input type="password" name='currentPass' id='currentPass' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />

        {/* new pass */}
        <label htmlFor="newPass" className='font-semibold block'>{location.pathname == "/update-pass" ? "Confirm" : "New"} password</label>
        <input type="password" name="newPass" id='newPass' className='input input-bordered border-emerald-500 mt-4 mb-6 max-w-xl w-full' value={newPass} onChange={(e) => setNewPass(e.target.value)} />

        <div className="mt-4 mb-6">
          <button className="btn bg-emerald-400 hover:bg-emerald-500 duration-300 text-white text-xl rounded-md" onClick={formSubmit}>Update password</button>
        </div>

      </div>

      <Toaster visibleToasts={5} richColors={true} closeButton={true} />
    </Section>
  );
};

export default ChangePass;