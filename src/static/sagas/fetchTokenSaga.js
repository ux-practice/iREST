import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import fetchTokenService from '../service/fetchToken/fetchToken'
import {FETCH_TOKEN} from '../actions/actionTypes'
import {fetchTokenSuccessAction, fetchTokenFailureAction} from '../actions/fetchToken/fetchToken'

export default function* fetchTokenSaga(payload) {
  try {
    const response = yield call(fetchTokenService, payload)
    response.type = FETCH_TOKEN
    yield put(fetchTokenSuccessAction(response))
  } catch (error) {
    yield put(fetchTokenFailureAction())
    notifyError('Record not found')
  }
}
