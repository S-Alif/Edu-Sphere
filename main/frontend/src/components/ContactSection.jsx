import Section from "./tag-comps/Section";
import { contactMsgValidate } from "../helpers/validators"

// icons
import { FaFacebook, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useState } from "react";

const ContactSection = ({ className }) => {

  let classes = className || ""

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [msg, setMsg] = useState("")

  const submitMsg = async (e) => {
    e.preventDefault()
    let validate = contactMsgValidate({ name, email, phone, msg })

    if (validate == true) {
      console.log(validate)
    }
  }

  return (
    <Section className={classes} id={"contact"}>
      <div className="grid md:grid-cols-2 items-center gap-16 p-8 mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div>
          <h1 className="text-3xl font-extrabold">Let&apos;s Talk</h1>
          <p className="mt-3">
            Have some big idea or brand to develop and need help? Then reach out
            we&apos;d love to hear about your project and provide help.
          </p>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Email</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <div className="bg-emerald-500 text-white rounded-full flex items-center justify-center p-3 text-2xl">
                  <FaEnvelope />
                </div>
                <a target="blank" href="mailto:edusphere.example@gmail.com" className="text-emerald-500 ml-3">
                  <small className="block">Mail</small>
                  <strong>edusphere.example@gmail.com</strong>
                </a>
              </li>
            </ul>
          </div>

          {/* social media */}
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Socials</h2>
            <ul className="flex mt-3 space-x-4">
              <li>
                <a href="" className="bg-emerald-500 text-white rounded-full flex items-center justify-center p-3 text-2xl"><FaFacebook /></a>
              </li>
              <li>
                <a href="" className="bg-emerald-500 text-white rounded-full flex items-center justify-center p-3 text-2xl"><FaXTwitter /></a>
              </li>
              <li >
                <a href="" className="bg-emerald-500 text-white rounded-full flex items-center justify-center p-3 text-2xl"><AiFillInstagram /></a>
              </li>
              <li>
                <a href="" className="bg-emerald-500 text-white rounded-full flex items-center justify-center p-3 text-2xl"><FaLinkedinIn /></a>
              </li>
            </ul>
          </div>
        </div>

        {/* message form  */}
        <form className="ml-auto space-y-4" onSubmit={submitMsg}>
          <input type="text" name="name" placeholder="Name" className="w-full font-semibold rounded-md py-2.5 px-4 border outline-emerald-500" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" name="email" placeholder="Email" className="w-full font-semibold rounded-md py-2.5 px-4 border outline-emerald-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Phone" name="phone" className="w-full font-semibold rounded-md py-2.5 px-4 border outline-emerald-500" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea placeholder="Message" rows={6} name="message" className="w-full font-semibold rounded-md px-4 border pt-2.5 outline-emerald-500 resize-none" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button type="submit" className="text-white btn bg-emerald-400 hover:bg-emerald-500 font-semibold rounded-md text-sm px-4 py-2.5 w-full">
            Send
          </button>
        </form>
      </div>

    </Section>
  );
};

export default ContactSection;