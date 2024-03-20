import axios from 'axios'
import { create } from 'zustand'
import { studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg'

const studentStore = create((set) => ({
  // course enroll
  courseEnroll: async (data) => {
    try {
      infoAlert("enrolling you in course ... please wait")

      let result = await axios.post(studentEndpoint + '/enroll', data, {withCredentials: true})

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      successAlert(result.data?.data)
      return result.data?.status

    } catch (error) {
      return errorAlert("something went wrong")
    }
  },
}))

export default studentStore