import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import previewMock from '../../../../src/static/reducers/previewMock/previewMockReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  response: {
    data: [],
  },
  isPending: false
}

const newState = {
  response: {
    data: {
      id: '62e8c25dd12e4045a4170854',
      mockName: 'mock_name_1',
      mockUrl: 'http://localhost:9000/api/rest/user371/endpoint_0',
      allowedMethods: ['GET'],
    },
    message: 'Mock created successfully.',
    mockResponse: {},
    status: 201,
    type: 'PREVIEW_MOCK_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {},
    mockResponse: {},
    status: 404,
    type: 'PREVIEW_MOCK_ERROR',
  },
}

const pendingState = {
  response: {
    isPending: true,
    status: 202,
    type: 'PREVIEW_MOCK_SUCCESS',
  },
}

describe('Mock Status Reducer', () => {
  it('should return default state', () => {
    expect(previewMock(undefined, {})).toEqual(initialState)
  })

  it('should return PREVIEW_MOCK_SUCCESS', () => {
    const previewMockAction = {
      type: types.PREVIEW_MOCK_SUCCESS,
      data: newState.response,
    }

    expect(previewMock(newState, previewMockAction)).toEqual(newState)
  })

  it('should return PREVIEW_MOCK_ERROR', () => {
    const previewMockErrorAction = {
      type: types.PREVIEW_MOCK_ERROR,
      data: errorState.response,
    }

    expect(previewMock(errorState, previewMockErrorAction)).toEqual(errorState)
  })
  it('should return PREVIEW_MOCK_CLEAR', () => {
    const previewMockClearAction = {
      type: types.PREVIEW_MOCK_CLEAR,
    }

    expect(previewMock({}, previewMockClearAction)).toEqual(initialState)
  })

  it('should return PREVIEW_MOCK_PENDING', () => {
    const pendingAction = {
      type: types.PREVIEW_MOCK_PENDING,
      isPending: true,
    }
    const response = {
      isPending: true,
      response: {isPending: true, status: 202, type: 'PREVIEW_MOCK_SUCCESS'},
    }

    expect(previewMock(pendingState, pendingAction)).toEqual(response)
  })
})
