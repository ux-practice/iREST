import {UPDATE_TOKEN, UPDATE_TOKEN_ERROR, UPDATE_TOKEN_SUCCESS, RESET_STORE, UPDATE_TOKEN_PENDING} from '../actionTypes'

export const updateTokenAction = (data, isMockToken) => {
  return {
    type: UPDATE_TOKEN,
    data,
    isMockToken
  }
}

export const updateTokenActionSuccess = data => {
  return {
    type: UPDATE_TOKEN_SUCCESS,
    data,
  }
}

export const updateTokenActionError = data => {
  return {
    type: UPDATE_TOKEN_ERROR,
    data,
  }
}

export const resetStore = () => {
  return {
    type: RESET_STORE
  }
}

export const isUpdateTokenPending = isPending => ({
  type: UPDATE_TOKEN_PENDING,
  isPending,
 })

