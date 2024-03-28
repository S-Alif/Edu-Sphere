import axios from 'axios'
import { create } from 'zustand'
import { mainEndpoint, studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg'
import { baseUrl } from './../helpers/apiEndpoints';

const studentStore = create((set) => ({
  // course enroll
  courseEnroll: async (data) => {
    try {
      infoAlert("enrolling ... please wait")
      let result = await axios.post(baseUrl + mainEndpoint + "/payment" + '/invoice-create', data, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data

    } catch (error) {
      return errorAlert("something went wrong")
    }
  },

  // fetch enroll courses
  fetchEnrollCourse: async (id) => {
    try {
      let result = await axios.get(studentEndpoint + "/enroll-course/" + id, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // get assignment
  getAssignment: async (ModuleId) => {
    try {
      let result = await axios.get(studentEndpoint + "/get-assignments/" + ModuleId, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // get lives
  getLives: async (moduleId) => {
    try {
      let result = await axios.get(studentEndpoint + "/get-lives/" + moduleId, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // get live id
  getLiveById: async (moduleId, id) => {
    try {
      let result = await axios.get(studentEndpoint + "/live/" + moduleId + "/" + id, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data

    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // show assignment
  showAssignemnt: async (moduleId) => {
    try {
      let result = await axios.get(studentEndpoint + "/assignment/" + moduleId, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // check Assignment
  checkAssignment: async (assignmentId, studentId) => {
    try {
      let result = await axios.get(studentEndpoint + "/check-assignment/" + assignmentId + "/" + studentId, { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // submit assignment
  submitAssignment: async (data) => {
    try {
      infoAlert("uploading assignment ... please wait")
      let result = await axios.post(studentEndpoint + "/submit-assignment/", data, { withCredentials: true })
      
      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      successAlert(result.data?.data)
      return result.data?.status
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // payment info
  paymentInfo: async () => {
    try {
      let result = await axios.get(studentEndpoint + "/payment/", { withCredentials: true })

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return result.data?.status
      }

      return result.data?.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // post instructor review
  postInstructorReviw: async (data) => {
    try {
      let result = await axios.post(studentEndpoint + "/instructor-review", data, { withCredentials: true })
      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      successAlert(result.data?.data)
      return result.data?.status
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  }

}))

export default studentStore