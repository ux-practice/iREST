import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import {fetchListByIdService} from '../service/createMock/createMockService'
import {FETCH_LIST_BY_ID_SUCCESS} from '../actions/actionTypes'
import {fetchListByIdSuccess, fetchListByIdError, isfetchListByIdPending} from '../actions/createMock/createMockAction'

export default function* editMockSaga(payload) {
  try {
    yield put(isfetchListByIdPending(true))
    const response = yield call(fetchListByIdService, payload)
    response.type = FETCH_LIST_BY_ID_SUCCESS
    yield put(fetchListByIdSuccess(response))
    yield put(isfetchListByIdPending(false))
  } catch (error) {
    yield put(fetchListByIdError())
    notifyError('Something went wrong!')
  }
}
