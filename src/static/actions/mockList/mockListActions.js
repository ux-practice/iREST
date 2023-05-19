import {MOCK_LIST, MOCK_LIST_SUCCESS, MOCK_LIST_ERROR, MOCK_LIST_PENDING} from '../actionTypes'

export const mockListAction = data => {
  return {
    type: MOCK_LIST,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: MOCK_LIST_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: MOCK_LIST_ERROR,
    data,
  }
}

export const isMockListPending = isPending => ({
  type: MOCK_LIST_PENDING,
  isPending,
})
