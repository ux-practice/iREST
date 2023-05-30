import {SESSION_UPDATE, SESSION_UPDATE_SUCCESS, SESSION_UPDATE_ERROR} from '../actionTypes'

export const sessionUpdateAction = data => {
  return {
    type: SESSION_UPDATE,
    data,
  }
}

export const sessionDataAction = data => {
  return {
    type: SESSION_UPDATE_SUCCESS,
    data,
  }
}

export const sessionError = data => {
  return {
    type: SESSION_UPDATE_ERROR,
    data,
  }
}
