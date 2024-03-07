import axios from 'axios'
import { create } from 'zustand'
import { instructorEndpoint, studentEndpoint } from '../helpers/apiEndpoints'
import { errorAlert, infoAlert, successAlert } from './../helpers/alertMsg'


const instructorStore = create((set) => ({

}))

export default instructorStore