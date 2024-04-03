import axios from 'axios'
import { create } from 'zustand'
import { basicEndpoint, instructorEndpoint, studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg';

const userStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  profile: null,


}))

export default userStore;