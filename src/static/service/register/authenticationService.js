import axios from 'axios'

const registerUserService = request => {
  const {API_BASE_URL} = process.env
  const REGISTER_API_ENDPOINT = `${API_BASE_URL}/register`

  return axios({
    method: 'post',
    url: REGISTER_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
    data: request.user,
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default registerUserService
