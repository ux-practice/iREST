import axios from 'axios'
import {notifyError} from '../../components/common/Toast'

const loginUserService = request => {
  const {API_BASE_URL} = process.env
  const LOGIN_API_ENDPOINT = `${API_BASE_URL}/login`

  return axios({
    method: 'post',
    url: LOGIN_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
    data: request.user,
  })
    .then(response => {
      const token = response.headers["x-access-token"]
      localStorage.setItem("token", token)
      return response.data
    })
    .catch(err => {
      if (err?.response?.data?.status >= 400 && err?.response?.data?.status <= 499) {
        notifyError('Email or password is incorrect.')
        return false
      } 
      return err.response.data
      
    })
}

export default loginUserService
