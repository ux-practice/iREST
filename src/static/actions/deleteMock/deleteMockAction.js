import {DELETE_MOCK, DELETE_MOCK_SUCCESS, DELETE_MOCK_ERROR, DELETE_MOCK_PENDING} from '../actionTypes'

export const deleteMockAction = data => {
  return {
    type: DELETE_MOCK,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: DELETE_MOCK_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: DELETE_MOCK_ERROR,
    data,
  }
}

export const isDeleteMockPending = isPending => ({
  type: DELETE_MOCK_PENDING,
  isPending,
 })
