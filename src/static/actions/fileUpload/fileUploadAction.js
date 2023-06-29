import {
  FILE_UPLOAD,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_CLEAR,
} from '../actionTypes'

export const fileUploadAction = data => {
  return {
    type: FILE_UPLOAD,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: FILE_UPLOAD_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: FILE_UPLOAD_ERROR,
    data,
  }
}

export const flushUploadedData = () => {
  return {
    type: FILE_UPLOAD_CLEAR,
  }
}
