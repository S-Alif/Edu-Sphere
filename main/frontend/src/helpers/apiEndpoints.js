// api endpoint
const baseUrl = "http://localhost:8000"
const mainEndpoint = "/public"

// export specific endpoints
export const studentEndpoint = baseUrl + mainEndpoint + "/student"
export const instructorEndpoint = baseUrl + mainEndpoint + "/instructor"
export const basicEndpoint = baseUrl + mainEndpoint + "/basic"