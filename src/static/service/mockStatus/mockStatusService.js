import axios from '../axiosInstance/axiosInstance'

export const mockStatusService = data => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/mock/item/`
  const params = data.data.id
  return axios({
    method: 'patch',
    url: API_ENDPOINT + params,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {mockStatus: data.data.mockStatus},
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default mockStatusService
