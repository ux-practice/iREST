import axios from '../axiosInstance/axiosInstance'

const updateAuthTypeService = req => {
  const {API_BASE_URL} = process.env
  const {data} = req
  const API_ENDPOINT = req.isMockAuth ? `${API_BASE_URL}/authentication/mockId/${data.id}` : 
  `${API_BASE_URL}/authentication/projectId/${data.id}`
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

export default updateAuthTypeService
