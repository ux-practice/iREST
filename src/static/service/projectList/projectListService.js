import axios from '../axiosInstance/axiosInstance'

const projectListService = ({data}) => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/project/list`

  return axios({
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

export default projectListService
