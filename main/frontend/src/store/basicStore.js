import axios from 'axios'
import { create } from 'zustand'
import { basicEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, successAlert } from './../helpers/alertMsg';


const basicStore = create((set) => ({
  classes: [],
  subjects: [],

  // fetch classes
  fetchClass: async () => {
    try {
      let result = await axios.get(basicEndpoint + "/classes")

      if (result.data["status"] == 0) {
        errorAlert(result.data['data'])
        return 0
      }
      set({ classes: result.data['data'] })

    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // get subjects
  getSubjects: async () => {
    try {
      let result = await axios.get(basicEndpoint + "/subjects")

      if (result.data["status"] == 0) {
        errorAlert(result.data['data'])
        return 0
      }
      set({ subjects: result.data['data'] })

    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  }

}))

export default basicStore;