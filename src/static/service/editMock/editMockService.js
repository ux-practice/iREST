import axios from '../axiosInstance/axiosInstance'

const editMockService = request => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/mock/item/`

  return axios({
    method: 'get',
    url: API_ENDPOINT + request.data,
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

export default editMockService
