import client from '../axiosInstance/axiosInstance'

const createProjectService = ({data}) => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/project/create`

  return client({
    method: 'post',
    url: API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default createProjectService
