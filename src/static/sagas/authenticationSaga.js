import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import history from '../history/createBrowserHistory'
import loginUserService from '../service/login/authenticationService'
import {LOGIN_USER_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError} from '../actions/login/authenticationActions'
import {DashboardUrl} from '../constants/url'

export default function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload)
    if (response) {
      response.type = LOGIN_USER_SUCCESS
      yield put(receiveDataAction(response))
      history.push(DashboardUrl)
    }
    else {
      yield put(receiveError())
    }
  } catch (error) {
    yield put(receiveError())
    notifyError('Something went wrong!')
  }
}
