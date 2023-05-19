import axios from '../axiosInstance/axiosInstance'

const uploadFileService = request => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/file/json-upload`

  return axios({
    method: 'post',
    url: API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
    data: request.data,
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

export default uploadFileService
