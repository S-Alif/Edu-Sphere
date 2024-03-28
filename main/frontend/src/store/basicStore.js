import axios from 'axios'
import { create } from 'zustand'
import { basicEndpoint, instructorEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg';


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
  },

  // subjects by instructor
  subByInstructor: async (id) => {
    try {
      if (id) {
        var result = await axios.get(basicEndpoint + "/subjects/" + id)
      }
      else {
        result = await axios.get(instructorEndpoint + "/subjects", { withCredentials: true })
      }

      if (result.data?.status == 0) {
        errorAlert(result.data['data'])
        return 0
      }

      return result.data?.data

    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // course cards
  courseCards: async (course, classes) => {
    try {
      var result = await axios.get(basicEndpoint + "/all-course/" + course + "/" + classes)

      if (result.data?.status == 0) {
        errorAlert(result.data['data'])
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // course details
  courseDetail: async (courseID) => {
    try {
      var result = await axios.get(basicEndpoint + "/course/" + courseID)

      if (result.data?.status == 0) {
        errorAlert(result.data['data'])
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // batch detail
  batchDetail: async (batchId) => {
    try {
      var result = await axios.get(basicEndpoint + "/batch/" + batchId)

      if (result.data?.status == 0) {
        errorAlert(result.data['data'])
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // batch detail
  getModule: async (batchId, courseId) => {
    try {
      var result = await axios.get(basicEndpoint + "/module/" + courseId + "/" + batchId)

      if (result.data?.status == 0) {
        errorAlert(result.data['data'])
        return 0
      }

      return result.data?.data
    } catch (error) {
      errorAlert("Something went wrong")
      return 0
    }
  },

  // public pass change
  publicPassChange: async (data) => {
    try {
      infoAlert("updating password ... please wait")
      let result = await axios.post(basicEndpoint + "/pass-public-change", data, { withCredentials: true })

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

  // get instructor review
  getInstructorReviw: async (id) => {
    try {
      let result = await axios.get(basicEndpoint + "/instructor-review/"+id, { withCredentials: true })
      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

   // get course review
  getCourseReview: async (id) => {
    try {
      let result = await axios.get(basicEndpoint + "/course-review/" + id, { withCredentials: true })
      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }
      return result.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  }

}))

export default basicStore;