import {put, call} from 'redux-saga/effects'
import createPreviewService from '../service/previewMock/previewMockService'
import {receiveDataAction, receiveError, isPreviewMockPending} from '../actions/previewMock/previewMockAction'
import {PREVIEW_MOCK_SUCCESS} from '../actions/actionTypes'

export default function* createPreviewMockSaga(payload) {
  try {
    yield put(isPreviewMockPending(true))
    const response = yield call(createPreviewService, payload)
    response.type = PREVIEW_MOCK_SUCCESS
    yield put(receiveDataAction(response))
    yield put(isPreviewMockPending(false))
  } catch (error) {
    yield put(receiveError({message: 'Something Went Wrong.'}))
  }
}
