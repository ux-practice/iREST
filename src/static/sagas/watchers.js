import {takeLatest} from 'redux-saga/effects'
import loginSaga from './authenticationSaga'
import createMockSaga from './createMockSaga'
import mockListSaga from './mockListSaga'
import projectListSaga from './projectListSaga'
import ceateProjectSaga from './createProjectSaga'
import editMockSaga from './editMockSaga'
import fileUploadSaga from './fileUploadSaga'
import registerSaga from './registerSaga'
import updateSessionSaga from './updateSessionSaga'
import saveReferenceSaga from './saveReferenceSaga'
import mockStatusSaga from './mockStatusSaga'
import deleteMockSaga from './deleteMockSaga'
import createPreviewMockSaga from './createPreviewMockSaga'
import fetchTokenSaga from './fetchTokenSaga'
import updateTokenSaga from './updateToken'
import updateAuthTypeSaga from './updateAuthTypeSaga'


import {
  LOGIN_USER,
  CREATE_MOCK,
  MOCK_LIST,
  PROJECT_LIST,
  CREATE_PROJECT,
  FETCH_LIST_BY_ID,
  FILE_UPLOAD,
  SESSION_UPDATE,
  REGISTER_USER,
  SAVE_REFERENCE_ID,
  MOCK_STATUS,
  DELETE_MOCK,
  PREVIEW_MOCK,
  FETCH_TOKEN,
  UPDATE_TOKEN,
  UPDATE_AUTH_TYPE
} from '../actions/actionTypes'

export default function* watchUserAuthentication() {
  yield takeLatest(LOGIN_USER, loginSaga)
  yield takeLatest(REGISTER_USER, registerSaga)
  yield takeLatest(CREATE_MOCK, createMockSaga)
  yield takeLatest(MOCK_LIST, mockListSaga)
  yield takeLatest(PROJECT_LIST, projectListSaga)
  yield takeLatest(CREATE_PROJECT, ceateProjectSaga)
  yield takeLatest(FETCH_LIST_BY_ID, editMockSaga)
  yield takeLatest(FILE_UPLOAD, fileUploadSaga)
  yield takeLatest(SESSION_UPDATE, updateSessionSaga)
  yield takeLatest(SAVE_REFERENCE_ID, saveReferenceSaga)
  yield takeLatest(MOCK_STATUS, mockStatusSaga)
  yield takeLatest(DELETE_MOCK, deleteMockSaga)
  yield takeLatest(PREVIEW_MOCK, createPreviewMockSaga)
  yield takeLatest(FETCH_TOKEN, fetchTokenSaga)
  yield takeLatest(UPDATE_TOKEN, updateTokenSaga)
  yield takeLatest(UPDATE_AUTH_TYPE, updateAuthTypeSaga)
}
