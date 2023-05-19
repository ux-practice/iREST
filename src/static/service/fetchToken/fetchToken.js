import client from '../axiosInstance/axiosInstance'

const fetchTokenService = (payload) => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = payload.isMockToken ? `${API_BASE_URL}/token/mockId/${payload?.data}` :
  `${API_BASE_URL}/token/projectId/${payload?.data}`
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

export default fetchTokenService
