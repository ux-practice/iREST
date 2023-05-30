import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import updateAuthTypeService from '../service/updateAuthType/updateAuthType'
import {UPDATE_AUTH_TYPE} from '../actions/actionTypes'
import {receiveDataAction, receiveError, isUpdateAuthPending} from '../actions/updateAuthType/updateAuthType'

export default function* updateAuthTypeSaga(payload) {
  try {
    yield put(isUpdateAuthPending(true))
    const response = yield call(updateAuthTypeService, payload)
    response.type = UPDATE_AUTH_TYPE
    yield put(receiveDataAction(response))
    yield put(isUpdateAuthPending(false))
  } catch (error) {
    yield put(receiveError())
    notifyError('Something went wrong!')
  }
}
