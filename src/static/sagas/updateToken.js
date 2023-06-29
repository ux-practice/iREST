import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import {updateTokenService} from '../service/updateToken/updateToken'
import {UPDATE_TOKEN} from '../actions/actionTypes'
import {updateTokenActionError, updateTokenActionSuccess, resetStore, isUpdateTokenPending} from '../actions/updateToken/updateToken'

export default function* updateTokenSaga(payload) {
  try {
    yield put(isUpdateTokenPending(true))
    const response = yield call(updateTokenService, payload)
    response.type = UPDATE_TOKEN
    yield put(updateTokenActionSuccess(response))
    yield put(isUpdateTokenPending(false))
  } catch (error) {
    yield put(updateTokenActionError())
    notifyError('Something went wrong!')
  }
  yield put(resetStore())
}
