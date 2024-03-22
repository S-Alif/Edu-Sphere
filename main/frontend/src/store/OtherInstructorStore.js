import axios from 'axios'
import { create } from 'zustand'
import { basicEndpoint, instructorEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert } from '../helpers/alertMsg'

const OtherInstructorStore = create((set) => ({

  // instructor payment
  instructorPay: async (courseID) => {
    try {
      let result = await axios.get(instructorEndpoint + '/payment/' + courseID, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // instructor public profile
  instructorPublicProfile: async (id) => {
    try {
      let result = await axios.get(basicEndpoint + '/user/' + id + "/"+1, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // instructor public profile subjects
  subByInstructorPublic: async (id) => {
    try {
      let result = await axios.get(basicEndpoint + '/subjects/' + id, { withCredentials: true })
      console.log(result.data?.data)

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // instructor public profile courses
  courseByInstructorPublic: async (id) => {
    try {
      let result = await axios.get(basicEndpoint + '/course-by-instructor/' + id, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  }

}))

export default OtherInstructorStore