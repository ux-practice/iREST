import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import fileUploadService from '../service/fileUpload/fileUploadService'
import {FILE_UPLOAD_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError} from '../actions/fileUpload/fileUploadAction'

export default function* fileUploadSaga(payload) {
  try {
    const response = yield call(fileUploadService, payload)
    response.type = FILE_UPLOAD_SUCCESS
    yield put(receiveDataAction(response))
  } catch (error) {
    yield put(receiveError())
    notifyError('Something went wrong!')
  }
}
