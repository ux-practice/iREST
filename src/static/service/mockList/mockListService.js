import client from '../axiosInstance/axiosInstance'

const mockListService = ({data}) => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/mock/list`

  return client({
    method: 'GET',
    url: API_ENDPOINT,
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default mockListService
