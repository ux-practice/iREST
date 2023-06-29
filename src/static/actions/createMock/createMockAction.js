import {
  CREATE_MOCK,
  CREATE_MOCK_SUCCESS,
  CREATE_MOCK_ERROR,
  CREATE_MOCK_CLEAR,
  FETCH_LIST_BY_ID,
  FETCH_LIST_BY_ID_SUCCESS,
  FETCH_LIST_BY_ID_ERROR,
  FETCH_LIST_BY_ID_PENDING
} from '../actionTypes'

export const createMockAction = data => {
  return {
    type: CREATE_MOCK,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: CREATE_MOCK_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: CREATE_MOCK_ERROR,
    data,
  }
}

export const flushMockData = () => {
  return {
    type: CREATE_MOCK_CLEAR,
  }
}

export const fetchListById = data => {
  return {
    type: FETCH_LIST_BY_ID,
    data,
  }
}

export const fetchListByIdSuccess = data => {
  return {
    type: FETCH_LIST_BY_ID_SUCCESS,
    data,
  }
}

export const fetchListByIdError = data => {
  return {
    type: FETCH_LIST_BY_ID_ERROR,
    data,
  }
}

export const isfetchListByIdPending = isPending => ({
  type: FETCH_LIST_BY_ID_PENDING,
  isPending,
})