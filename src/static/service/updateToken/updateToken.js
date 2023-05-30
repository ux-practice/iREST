import axios from '../axiosInstance/axiosInstance'

export const updateTokenService = req => {
  const {API_BASE_URL} = process.env
  const {data} = req
  const API_ENDPOINT = req.isMockToken ? `${API_BASE_URL}/token/mockId/${data.id}` : `${API_BASE_URL}/token/projectId/${data.id}`
  delete data.id
  return axios({
    method: 'put',
    url: API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default updateTokenService
