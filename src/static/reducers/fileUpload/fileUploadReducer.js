import {FILE_UPLOAD_SUCCESS, FILE_UPLOAD_ERROR, FILE_UPLOAD_CLEAR} from '../../actions/actionTypes'
import {fileUploadInitialState} from '../initialState'

export default function fileUpload(state = fileUploadInitialState, action) {
  const response = action.data
  switch (action.type) {
    case FILE_UPLOAD_SUCCESS:
      return {...state, response}
    case FILE_UPLOAD_ERROR:
      return {...state, response}
    case FILE_UPLOAD_CLEAR:
      return fileUploadInitialState
    default:
      return state
  }
}
