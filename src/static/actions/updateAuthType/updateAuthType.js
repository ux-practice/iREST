import {UPDATE_AUTH_TYPE, UPDATE_AUTH_TYPE_SUCCESS, UPDATE_AUTH_TYPE_ERROR, UPDATE_AUTH_TYPE_PENDING} from '../actionTypes'

export const updateAuthTypeAction = (data,isMockAuth) => {
  return {
    type: UPDATE_AUTH_TYPE,
    data,
    isMockAuth
  }
}

export const receiveDataAction = data => {
  return {
    type: UPDATE_AUTH_TYPE_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: UPDATE_AUTH_TYPE_ERROR,
    data,
  }
}

export const isUpdateAuthPending = isPending => ({
  type: UPDATE_AUTH_TYPE_PENDING,
  isPending,
 })
