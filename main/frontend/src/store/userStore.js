import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint, studentEndpoint } from '../helpers/apiEndpoints'

const userStore = create((set) => ({

  user: sessionStorage.getItem("user") || null,

  // student login
  studentLogin: async (data) => {
    try {
      let result = await axios.post(studentEndpoint + "/login", data)
      if (result.data['status'] == 1) {
        // show success msg == here
        set({user: result.data['data']})
      }
      else{
        // show error msg
      }
    } catch (error) {
      // show error msg from frontend
    }
  },

  // instructor login
  instrutorLogin: async (data) => {
    try {
      let result = await axios.post(instructorEndpoint + "/login", data)
      if (result.data['status'] == 1) {
        // show success msg == here
        set({ user: result.data['data'] })
      }
      else {
        // show error msg
      }
    } catch (error) {
      // show error msg from frontend
    }
  },

}))

export default userStore