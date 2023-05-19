import {FETCH_TOKEN,FETCH_TOKEN_SUCCESS,FETCH_TOKEN_ERROR} from '../actionTypes'

export const fetchTokenAction = (data,isMockToken) => {
  return {
    type: FETCH_TOKEN,
    data,
    isMockToken
  }
}

export const fetchTokenSuccessAction = data => {
  return {
    type: FETCH_TOKEN_SUCCESS,
    data,
  }
}

export const fetchTokenFailureAction = data => {
  return {
    type: FETCH_TOKEN_ERROR,
    data,
  }
}
