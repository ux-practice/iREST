import axios from '../axiosInstance/axiosInstance'

const createPreviewService = request => {
  const {API_BASE_URL} = process.env
  const mockObj = {}

  // If isPreview tag is present in payload
  if (request.data.isPreview) {
    const payload = {...request.data}
    delete payload._id
    const bulkSize = payload.bulkDataSize * 1024
    payload.bulkDataSize = bulkSize
    const URLParam = `${API_BASE_URL}/mock/create?isPreview=true`

    return axios({
      method: 'post',
      url: URLParam,
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    })
      .then(resp => {
        const {headers} = resp
        const respObj = resp.data
        respObj.headers = headers
        respObj.mockResponse = mockObj
        return respObj
      })
      .catch(err => {
        return err.response.data
      })
  }
}

export default createPreviewService
