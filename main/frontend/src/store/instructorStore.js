import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg'


const instructorStore = create((set) => ({

  createCourse: async (data) => {
    try {
      let result = await axios.post(instructorEndpoint + "/create-course", data, { withCredentials: true })

      if(result.data?.status == 100){
        errorAlert(result.data?.data)
        setTimeout(() => {
          window.location.replace("/login")
        }, 3000)
      }
      
      if(result.data?.status == 0){
        if(result.data?.errorCode?.code) infoAlert(result.data.errorCode.code)
        return errorAlert(result.data?.data)
      }

      successAlert(result.data?.data)
      return true

    } catch (error) {
      errorAlert("something went wrong")
    }
  }

}))

export default instructorStore