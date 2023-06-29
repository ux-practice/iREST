import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import createMock from '../../../../src/static/reducers/createMock/createMockReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  isPending: false,
  response: {
    data: [],
  },
}

const mockState = {
  response: {
    data: {
      mock: [],
    },
    status: 200,
    type: 'CREATE_MOCK_SUCCESS',
  },
}

const errorMockState = {
  response: {
    data: {
      mock: [],
    },
    status: 404,
    type: 'CREATE_MOCK_ERROR',
  },
}

const fetchState = {
  response: {
    data: {
      id: {},
    },
    status: 200,
    type: 'FETCH_LIST_BY_ID_SUCCESS',
  },
}

const errorFetchState = {
  response: {
    data: {
      id: {},
    },
    status: 404,
    type: 'FETCH_LIST_BY_ID_ERROR',
  },
}

describe('Create Mock Reducer', () => {
  it('should return default state', () => {
    expect(createMock(undefined, {})).toEqual(initialState)
  })

  it('should return CREATE_MOCK_SUCCESS', () => {
    const createAction = {
      type: types.CREATE_MOCK_SUCCESS,
      data: mockState.response,
    }

    expect(createMock(mockState, createAction)).toEqual(mockState)
  })

  it('should return CREATE_MOCK_ERROR', () => {
    const createErrorAction = {
      type: types.CREATE_MOCK_ERROR,
      data: errorMockState.response,
    }

    expect(createMock(errorMockState, createErrorAction)).toEqual(errorMockState)
  })

  it('should return CREATE_MOCK_CLEAR', () => {
    const createMockClearAction = {
      type: types.CREATE_MOCK_CLEAR,
    }

    expect(createMock({}, createMockClearAction)).toEqual(initialState)
  })

  it('should return FETCH_LIST_BY_ID_SUCCESS', () => {
    const fetchListAction = {
      type: types.FETCH_LIST_BY_ID_SUCCESS,
      data: fetchState.response,
    }

    expect(createMock(fetchState, fetchListAction)).toEqual(fetchState)
  })

  it('should return FETCH_LIST_BY_ID_ERROR', () => {
    const fetchListIdAction = {
      type: types.FETCH_LIST_BY_ID_ERROR,
      data: errorFetchState.response,
    }

    expect(createMock(errorFetchState, fetchListIdAction)).toEqual(errorFetchState)
  })
})
