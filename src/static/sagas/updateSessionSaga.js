import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import updateSessionService from '../service/updateSession/updateSessionService'
import {SESSION_UPDATE_SUCCESS} from '../actions/actionTypes'
import {sessionDataAction, sessionError} from '../actions/sessionUpdate/sessionUpdateAction'

export default function* updateSessionSaga(payload) {
  try {
    const response = yield call(updateSessionService, payload)
    response.type = SESSION_UPDATE_SUCCESS
    yield put(sessionDataAction(response))
  } catch (error) {
    yield put(sessionError())
    notifyError('Something went wrong!')
  }
}
