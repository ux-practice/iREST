import axios from '../axiosInstance/axiosInstance'

export const deleteMockService = data => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/mock/item/`
  const params = data.data.id
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

export default deleteMockService
