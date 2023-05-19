import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_CLEAR} from '../actionTypes'

export const loginUserAction = user => {
  return {
    type: LOGIN_USER,
    user,
  }
}

export const receiveDataAction = user => {
  return {
    type: LOGIN_USER_SUCCESS,
    user,
  }
}

export const receiveError = user => {
  return {
    type: LOGIN_USER_ERROR,
    user,
  }
}

export const flushUserData = () => {
  return {
    type: LOGIN_USER_CLEAR,
  }
}
