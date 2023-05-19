import {put, call} from 'redux-saga/effects'
import registerUserService from '../service/register/authenticationService'
import {REGISTER_USER_SUCCESS, REGISTER_USER_ERROR} from '../actions/actionTypes'
import {receiveDataAction, receiveError} from '../actions/register/authenticationActions'
import {notifyError, notifySuccess} from '../components/common/Toast'

export default function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload)
    if (response.status === 201) {
      response.type = REGISTER_USER_SUCCESS
      yield put(receiveDataAction(response))
      notifySuccess('You are successfully registered!')
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } else {
      response.type = REGISTER_USER_ERROR
      yield put(receiveError(response))
      notifyError(response.message)
    }
  } catch (error) {
    yield put(receiveError())
    notifyError('Something went wrong!')
  }
}
