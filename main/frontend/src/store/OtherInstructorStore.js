import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert } from '../helpers/alertMsg'

const OtherInstructorStore = create((set) => ({

  // instructor payment
  instructorPay: async (courseID) => {
    try {
      let result = await axios.get(instructorEndpoint + '/payment/'+courseID, { withCredentials: true })

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


}))

export default OtherInstructorStore