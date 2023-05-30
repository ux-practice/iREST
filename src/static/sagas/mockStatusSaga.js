import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import StatuService from '../service/mockStatus/mockStatusService'
import {MOCK_STATUS_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError} from '../actions/mockStatus/mockStatusActions'

export default function* mockStatusSaga(payload) {
  try {
    const response = yield call(StatuService, payload)
    response.type = MOCK_STATUS_SUCCESS
    yield put(receiveDataAction(response))
  } catch (error) {
    yield put(receiveError())
    notifyError('Record not found')
  }
}
