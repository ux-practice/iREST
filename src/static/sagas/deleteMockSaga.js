import {put, call} from 'redux-saga/effects'
import {deleteMockService} from '../service/deleteMock/deleteMockService'
import {DELETE_MOCK_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError, isDeleteMockPending} from '../actions/deleteMock/deleteMockAction'

export default function* deleteMockSaga(payload) {
  try {
    yield put(isDeleteMockPending(true))
    const response = yield call(deleteMockService, payload)
    response.type = DELETE_MOCK_SUCCESS
    yield put(receiveDataAction(response))
    yield put(isDeleteMockPending(false))
  } catch (error) {
    yield put(receiveError({message: 'Something Went Wrong.'}))
  }
}
