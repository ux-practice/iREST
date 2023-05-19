import {put, call} from 'redux-saga/effects'
import {notifyError, notifySuccess} from '../components/common/Toast'
import {createMockService} from '../service/createMock/createMockService'
import {CREATE_MOCK_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError} from '../actions/createMock/createMockAction'
import {isMockListPending} from '../actions/mockList/mockListActions'

export default function* createMockSaga(payload) {
  try {
    const response = yield call(createMockService, payload)
    if (response.status === 200) {
      if (payload.data.isPreview) {
        response.type = 'PREVIEW_MOCK'
        yield put(receiveDataAction(response))
      } else {
        response.type = CREATE_MOCK_SUCCESS
        yield put(receiveDataAction(response))
        yield put(isMockListPending(false))
        notifySuccess('Mock updated successfully!')
      }
    }
    if (response.status === 201) {
      if (payload.data.isPreview) {
        yield put(receiveDataAction(response))
      } else {
        response.type = CREATE_MOCK_SUCCESS
        yield put(receiveDataAction(response))
        notifySuccess('Mock created successfully!')
      }
    }
    if (response.status === 417) {
      notifyError('Endpoint already exists. Choose different endpoint.')
    }
  } catch (error) {
    yield put(receiveError())
    notifyError('Something went wrong!')
  }
}
