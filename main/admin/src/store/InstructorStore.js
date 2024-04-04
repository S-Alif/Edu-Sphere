import axios from 'axios'
import { create } from 'zustand'
import { adminEndpoint } from '../helpers/apiEndpoints'
import { errorAlert } from './../helpers/alertMsg';

const InstructorStore = create((set) => ({

  // get instructors
  getInstructors: async (filter) => {
    try {
      let result = await axios.get(adminEndpoint + "/instructors/" + filter, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  approveInstructor: async (id) => {
    try {
      let result = await axios.get(adminEndpoint + "/instructors/approve/" + id, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // get instructor by id
  getInstructorById: async (id) => {
    try {
      let result = await axios.get(adminEndpoint + "/instructors/" + id + "/1", { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // instructor subjects
  subByInstructor: async (id) => {
    try {
      let result = await axios.get(adminEndpoint + "/instructors/subjects/" + id, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // instructor courses
  instructorCourses: async (id) => {
    try {
      let result = await axios.get(adminEndpoint + "/instructors/course/" + id, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // instructor reviews
  instructorReviews: async (id) => {
    try {
      let result = await axios.get(adminEndpoint + "/instructors/reviews/" + id, { withCredentials: true })

      if (result.data?.status == 0) {
        errorAlert(result.data?.data)
        return 0
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },


}))

export default InstructorStore