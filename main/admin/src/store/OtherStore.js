import axios from 'axios'
import { create } from 'zustand'
import { adminEndpoint, adminModify } from '../helpers/apiEndpoints'
import { errorAlert, successAlert } from './../helpers/alertMsg';


const OtherStore = create((set) => ({

  // charts
  charts: async () => {
    try {
      let result = await axios.get(adminEndpoint + "/data-chart", { withCredentials: true })

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

  //create subject
  subCreate: async (data) => {
    try {
      let result = await axios.post(adminModify + "/create-sub", data, { withCredentials: true })

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

  //update subject
  subUpdate: async (data, id) => {
    try {
      let result = await axios.post(adminModify + "/update-sub/" + id, data, { withCredentials: true })

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

  //delete subject
  subDelete: async (id) => {
    try {
      let result = await axios.get(adminModify + "/delete-sub/" + id, { withCredentials: true })

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

  //delete subject
  getSubs: async () => {
    try {
      let result = await axios.get(adminModify + "/get-all-sub", { withCredentials: true })

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

  //mail notify
  sendNotifyMail: async (email, data) => {
    try {
      let result = await axios.post(adminEndpoint + "/notify/"+email, data, { withCredentials: true })

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
  }

}))

export default OtherStore