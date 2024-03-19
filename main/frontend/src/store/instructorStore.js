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

      let result = await axios.get(instructorEndpoint + "/get-batch", { withCredentials: true })

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
      let result = await axios.get(instructorEndpoint + "/course/" + id, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
        return
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
        return
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
  },

  // get batch by id
  batchById: async (course, id) => {
    try {
      let result = await axios.get(instructorEndpoint + "/batch/" + course + "/" + id, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)

        return
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

  // update batch
  updateBatch: async (course, id, data) => {
    try {
      let result = await axios.post(instructorEndpoint + "/update-batch/" + course + "/" + id, data, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)

        return
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
  },

  createModule: async (data) => {
    try {
      infoAlert("creating module ... please wait")
      let result = await axios.post(instructorEndpoint + "/create-module", data, { withCredentials: true })

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

  // get modules
  getModule: async (batch, course) => {
    try {
      let result = await axios.get(instructorEndpoint + "/modules/" + course + "/" + batch, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
        return
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

  // module by id
  getModuleById: async (batch, id) => {
    try {
      let result = await axios.get(instructorEndpoint + "/get-module/" + batch + "/" + id, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
        return
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

  // update module
  updateModule: async (batch, id, data) => {
    try {
      let result = await axios.post(instructorEndpoint + "/update-module/" + batch + "/" + id, data, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)

        return
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
  },

  // create assignment
  createAssignment: async (data) => {
    try {
      infoAlert("creating assignment ... please wait")
      let result = await axios.post(instructorEndpoint + "/create-assignment", data, { withCredentials: true })

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

  // get assignment
  getAssignment: async (module) => {
    try {
      let result = await axios.get(instructorEndpoint + "/get-assignment/" + module, { withCredentials: true })

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

      return result.data?.data || 0
    } catch (error) {
      return errorAlert("something went wrong")
    }
  },

  // update assignment
  updateAssignment: async (module, id, data) => {
    try {
      let result = await axios.post(instructorEndpoint + "/update-assignment/" + module + "/" + id, data, { withCredentials: true })

      if (result.data?.code == 401) {
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)

        return
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
  },

  // create live
  createLive: async (data) => {
    try {
      infoAlert("creating live class ... please wait")
      let result = await axios.post(instructorEndpoint + "/create-live", data, { withCredentials: true })

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
}))

export default instructorStore