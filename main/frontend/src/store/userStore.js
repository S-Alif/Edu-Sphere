import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint, studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, successAlert } from './../helpers/alertMsg';

const userStore = create((set) => ({

  user: JSON.parse(sessionStorage.getItem("user")) || null,

  // student login
  studentLogin: async (data) => {
    try {
      let result = await axios.post(studentEndpoint + "/login", data)
      if (result.data['status'] == 1) {
        // show success msg == here
        sessionStorage.setItem("user", JSON.stringify(result.data['data']))
        set({ user: result.data['data'] })

        successAlert("Login Success")
        return result.data['status']
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

  // instructor login
  instrutorLogin: async (data) => {
    try {
      let result = await axios.post(instructorEndpoint + "/login", data)
      if (result.data['status'] == 1) {
        // show success msg == here
        sessionStorage.setItem("user", JSON.stringify(result.data['data']))
        set({ user: result.data['data'] })

        successAlert("Login Success")
        return result.data['status']
      }
      else {
        errorAlert(result.data['data'])
      }
    } catch (error) {
      errorAlert("Something went wrong")
    }
  },

}))

export default userStore