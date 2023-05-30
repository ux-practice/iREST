import axios from '../axiosInstance/axiosInstance'

const projectEditService = request => {
  const {API_BASE_URL} = process.env

  const {payload, id} = request
  const URLParam = `${API_BASE_URL}/project/item/${id}`

  return axios({
    method: 'put',
    url: URLParam,
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  })
    .then(resp => {
      return resp
    })
    .catch(err => {
      return err.response.data
    })
}

export default projectEditService
