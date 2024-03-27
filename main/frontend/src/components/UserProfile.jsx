import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

import avatar from '../assets/imgs/avatar-1577909_640.png'
import { useEffect, useState } from "react";
import basicStore from "../store/basicStore";

const UserProfile = () => {

  const naviagte = useNavigate()
  const location = useLocation()
  const { user, profile } = userStore()
  const { subByInstructor } = basicStore()

  const [subjects, setSubjects] = useState([])

  // check if the user is logged in
  if (user == null || (user?.role != 0 && user?.role != 1)) {
    naviagte("/login", { state: { from: location }, replace: true })
  }

  useEffect(() => {
    if (profile?.role == 1) {
      (async () => {
        let result = await subByInstructor()
        if (result != 0) {
          setSubjects(result)
        }
      })()
    }
  }, [])

  return (
    <div className="user-profile">

      {/* title */}
      <div className="title pb-4 mb-7 border-b-2 border-b-emerald-300">
        <h2 className="font-bold text-3xl">Profile</h2>
      </div>

      {/* user detail table */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* image */}
        <div className="image w-80 h-80 overflow-hidden shadow-xl">
          <img src={profile?.profileImg ? profile?.profileImg : avatar} alt="user-image" className="w-full h-full object-cover object-center rounded-lg" />
        </div>

        {/* profile form */}
        <div className="form-content flex-grow">
          <div className="overflow-x-auto">
            <table className="table">
              <tbody className="text-[17px]">
                <tr className="hover">
                  <th>Name</th>
                  <td>{profile?.firstName} {profile?.lastName}</td>
                </tr>
                <tr className="hover">
                  <th>Email</th>
                  <td><a href={`mailto:${profile?.email}`} className="hover:text-emerald-500">{profile?.email}</a></td>
                </tr>
                <tr className="hover">
                  <th>Phone</th>
                  <td>{profile?.phone}</td>
                </tr>
                {
                  profile?.address && profile?.address != "" &&
                  <tr className="hover">
                    <th>Address</th>
                    <td>{profile?.address}</td>
                  </tr>
                }
                <tr className="hover">
                  <th>Register date</th>
                  <td>{profile?.registerDate.substr(0, 10)}</td>
                </tr>
                <tr className="hover">
                  <th>Update date</th>
                  <td>{profile?.updateDate.substr(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* subjects */}
      {subjects.length != 0 && profile?.role == 1 &&
        <div className="mt-5 p-5 rounded-lg shadow-lg">
          <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">Your subjects</h3>
          <div className="flex gap-4">
            {subjects.map((e, index) => (
              <button className="btn" key={index}>{e.name}</button>
            ))}
          </div>
        </div>
      }

      {profile?.about != "" && profile?.about &&
        <div className="mt-5 p-5 rounded-lg shadow-lg">
          <h3 className="font-bold border-b-2 border-b-gray-200 text-xl mb-4 pb-2">About</h3>
          <p>{profile.about}</p>
        </div>}

    </div>
  );
};

export default UserProfile;