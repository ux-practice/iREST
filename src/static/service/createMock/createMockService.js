import axios from '../axiosInstance/axiosInstance'

export const createMockService = request => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/mock/create`
  const URLParam = request.data.mockId
    ? `${API_BASE_URL}/mock/item/${request.data.mockId}`
    : API_ENDPOINT

  return axios({
    method: request.data.mockId ? 'put' : 'post',
    url: URLParam,
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

export const fetchListByIdService = request => {
  const {API_BASE_URL} = process.env
  const API_ENDPOINT = `${API_BASE_URL}/mock/item/`

  return axios({
    method: 'get',
    url: API_ENDPOINT + request.data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}
