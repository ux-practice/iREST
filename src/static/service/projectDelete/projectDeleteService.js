import axios from '../axiosInstance/axiosInstance'

const projectDeleteService = request => {
  const {API_BASE_URL} = process.env

  const API_ENDPOINT = `${API_BASE_URL}/project/item/`
  const params = request.id

  return axios({
    method: 'delete',
    url: API_ENDPOINT + params,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default projectDeleteService
