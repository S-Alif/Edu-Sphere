import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg'


const instructorStore = create((set) => ({

  createCourse: async (data) => {
    try {
      infoAlert("creating course ... please wait")
      let result = await axios.post(instructorEndpoint + "/create-course", data, { withCredentials: true })

      if (result.data?.status == 100) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      successAlert(result.data?.data)
      return true

    } catch (error) {
      errorAlert("something went wrong")
    }
  },

  // course names for batches
  fetchCourseNames: async () => {
    try {
      let result = await axios.get(instructorEndpoint + "/course-names", { withCredentials: true })

      if (result.data?.status == 100) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      return result.data?.data
    } catch (error) {
      return errorAlert("something went wrong")
    }
  },

  // create batch
  createBatch: async (data) => {
    try {
      infoAlert("creating batch ... please wait")
      let result = await axios.post(instructorEndpoint + "/create-batch", data, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }

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

  //get batch by instructor
  getBatchInstructor: async () => {
    try {
      infoAlert("loading data ... please wait")

      let result = await axios.get(instructorEndpoint + "/get-batch", {withCredentials: true})

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }
      successAlert("data loaded")
      return result.data?.data

    } catch (error) {
      errorAlert("something went wrong")
      return 0 
    }
  },

  // get course by id
  getCourseById: async (id) => {
    try {
      let result = await axios.get(instructorEndpoint + "/course/"+id, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }
      
      return result.data?.data
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  },

  // update course
  updateCourse: async (data, id) => {
    try {
      infoAlert("updating course ... please wait")
      let result = await axios.post(instructorEndpoint + "/update-course/" + id, data, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }

      if (result.data?.status == 0) {
        if (result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        errorAlert(result.data?.data)
        return 0
      }
      successAlert(result.data?.data)
      return result.data?.status
    } catch (error) {
      errorAlert("something went wrong")
      return 0
    }
  }

}))

export default instructorStore