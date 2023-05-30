import client from '../axiosInstance/axiosInstance'

const updateSessionService = ({data}) => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/updatesession`

  return client({
    method: 'GET',
    url: API_ENDPOINT,
    params: data,
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default updateSessionService
