import axios from 'axios'
import { create } from 'zustand'
import { basicEndpoint, instructorEndpoint, studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg';

const userStore = create((set) => ({

  user: JSON.parse(sessionStorage.getItem("user")) || null,
  profile: null,

  // student login
  userLogin: async (data) => {
    try {
      let result = await axios.post(basicEndpoint + "/login", data, { withCredentials: true })
      if (result.data['status'] == 1) {
        // show success msg == here
        sessionStorage.setItem("user", JSON.stringify(result.data['data']))
        set({ user: result.data['data'] })

        successAlert("Login Success")
        return result.data
      }
      else {
        errorAlert(result.data['data'])
        return result.data['status']
      }
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // student registration
  userRegistration: async (data) => {
    try {
      infoAlert("Registering Account ... please wait")
      let result = await axios.post(basicEndpoint + "/register", data)
      if (result.data['status'] == 1) {
        successAlert(result.data['data'])
        return result.data['status']
      }
      else {
        if (result.data?.errorCode?.code) infoAlert(result.data['errorCode']['code'])
        errorAlert(result.data['data'])
        return 0
      }

    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // user profile
  userProfile: async (role) => {
    try {
      if (role == 1) {
        var profileData = await axios.get(instructorEndpoint + "/user", { withCredentials: true })
      }
      else {
        profileData = await axios.get(studentEndpoint + "/user", { withCredentials: true })
      }

      // check response
      if (profileData.data['status'] == 1) {
        set({ profile: profileData.data['data'] })
      }
      else {
        errorAlert(profileData.data['data'])
        return 0
      }
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // user update
  userUpdate: async (role, data) => {
    try {
      infoAlert("Updating account ... please wait")
      if (role == 1) {
        var profileData = await axios.post(instructorEndpoint + "/update", data, { withCredentials: true })
      }
      else {
        profileData = await axios.post(studentEndpoint + "/update", data, { withCredentials: true })
      }

      if (profileData.data['code'] == 401) {
        sessionStorage.clear()
        window.location.replace("/login")
      }

      // check response
      if (profileData.data['status'] == 1) {
        successAlert(profileData.data['data'])
        return 1
      }
      else {
        errorAlert(profileData.data['data'])
        return 0
      }

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // logout
  userLogout: () => {
    sessionStorage.clear()
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

    set({ user: null })
    set({ profile: null })
    successAlert("logout success")

    setTimeout(() => {
      window.location.replace('/')
    }, 3000)
  },

  //send mail
  sendMail: async (data) => {
    try {
      let result = await axios.post(basicEndpoint + "/send-otp/", data, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }

      successAlert(result.data?.data)
      return 1

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  //send mail
  verifyMail: async (data) => {
    try {
      let result = await axios.post(basicEndpoint + "/verify-otp", data, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }

      successAlert(result.data?.data)
      return result.data

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // pass change
  passChange: async (data) => {
    try {
      infoAlert("updating password ... please wait")
      let result = await axios.post(basicEndpoint + "/pass-change", data, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }

      successAlert(result.data?.data)
      return result.data?.status

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // user by email
  userByemail: async (email) => {
    try {
      let result = await axios.get(basicEndpoint + "/user/"+email, {withCredentials: true})

      if (result.data?.status == 0) {
        if (result.data?.errorCode) infoAlert(result.data?.errorCode?.error)
        errorAlert(result.data?.data)
        return 0
      }

      return result.data
      
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  }

}))

export default userStore