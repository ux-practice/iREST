import axios from "axios"

const client = axios.create()

client.interceptors.request.use((req) => { 
    const token = localStorage.getItem("token")
    if (token) {
        req.headers['x-access-token'] = `${token}`
    }
    return req
})

client.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
      localStorage.clear()
      window.location.href = "/"
  }
  return Promise.reject(error)
})

export default client