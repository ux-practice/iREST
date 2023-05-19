import {REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR} from '../actionTypes'

export const registerUserAction = user => {
  return {
    type: REGISTER_USER,
    user,
  }
}

export const receiveDataAction = user => {
  return {
    type: REGISTER_USER_SUCCESS,
    user,
  }
}

export const receiveError = user => {
  return {
    type: REGISTER_USER_ERROR,
    user,
  }
}
