import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import mockListService from '../service/mockList/mockListService'
import {MOCK_LIST_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError, isMockListPending} from '../actions/mockList/mockListActions'

export default function* createMockSaga(payload) {
  try {
    yield put(isMockListPending(true))
    const response = yield call(mockListService, payload)
    response.type = MOCK_LIST_SUCCESS
    yield put(receiveDataAction(response))
    yield put(isMockListPending(false))
  } catch (error) {
    yield put(receiveError())
    notifyError('Record not found')
  }
}
