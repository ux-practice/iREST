import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import mockStatus from '../../../../src/static/reducers/mockStatus/mockStatusReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  response: {
    data: [],
  },
}

const newState = {
  response: {
    data: {
      status: 'enabled',
      serviceResponseType: 'save',
      path: '/rest',
      statusCode: '200',
      isDelay: false,
    },
    message: 'Status changes succesfully.',
    status: 200,
    type: 'MOCK_STATUS_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {},
    status: 404,
    type: 'MOCK_STATUS_ERROR',
  },
}

describe('Mock Status Reducer', () => {
  it('should return default state', () => {
    expect(mockStatus(undefined, {})).toEqual(initialState)
  })

  it('should return MOCK_STATUS_SUCCESS', () => {
    const mockStatusAction = {
      type: types.MOCK_STATUS_SUCCESS,
      data: newState.response,
    }

    expect(mockStatus(newState, mockStatusAction)).toEqual(newState)
  })

  it('should return MOCK_STATUS_ERROR', () => {
    const mockStatusErrorAction = {
      type: types.MOCK_STATUS_ERROR,
      data: errorState.response,
    }

    expect(mockStatus(errorState, mockStatusErrorAction)).toEqual(errorState)
  })
  it('should return MOCK_STATUS_CLEAR', () => {
    const mockStatusClearAction = {
      type: types.MOCK_STATUS_CLEAR,
    }

    expect(mockStatus({}, mockStatusClearAction)).toEqual(initialState)
  })
})
