import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint, studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg'


const studentStore = create((set) => ({

}))

export default studentStore