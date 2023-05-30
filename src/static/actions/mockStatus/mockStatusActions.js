import {
  MOCK_STATUS,
  MOCK_STATUS_SUCCESS,
  MOCK_STATUS_ERROR,
  MOCK_STATUS_CLEAR,
} from '../actionTypes'

export const mockStatusAction = data => {
  return {
    type: MOCK_STATUS,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: MOCK_STATUS_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: MOCK_STATUS_ERROR,
    data,
  }
}

export const flushMockStatus = () => {
  return {
    type: MOCK_STATUS_CLEAR,
  }
}
