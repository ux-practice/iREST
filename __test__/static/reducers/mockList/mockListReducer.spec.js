import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import createMock from '../../../../src/static/reducers/mockList/mockListReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  response: {
    data: null,
  },
  isPending: false
}

const newState = {
  data: {
    mockList: [
      {
        serviceResponseType: 'save',
        statusCode: '200',
        mockStatus: 'enabled',
        allowedMethods: ['GET', 'POST'],
        _id: '62d9300da93e9bf1',
      },
    ],
    totalMocks: 1,
  },
  message: 'Mock List',
  status: 200,
  type: 'MOCK_LIST_SUCCESS',
}

const errorState = {
  data: {
    mockList: [],
  },
  message: 'Mock List',
  status: 404,
  type: 'MOCK_LIST_ERROR',
}

const pendingState = {
  response: {
    isPending: true,
    status: 202,
    type: 'MOCK_LIST_SUCCESS',
  },
}

describe('Mock List Reducer', () => {
  it('should return default state', () => {
    expect(createMock(undefined, {})).toEqual(initialState)
  })

  it('should return CREATE_PROJECT_SUCCESS', () => {
    const mockListSuccessAction = {
      type: types.MOCK_LIST_SUCCESS,
      data: newState.response,
    }

    expect(createMock(newState, mockListSuccessAction)).toEqual(newState)
  })

  it('should return CREATE_PROJECT_ERROR', () => {
    const mockListErrorAction = {
      type: types.MOCK_LIST_ERROR,
      data: errorState.response,
    }

    expect(createMock(errorState, mockListErrorAction)).toEqual(errorState)
  })

  it('should return MOCK_LIST_PENDING', () => {
    const pendingAction = {
      type: types.MOCK_LIST_PENDING,
      isPending: true,
    }
    const response = {
      isPending: true,
      response: {isPending: true, status: 202, type: 'MOCK_LIST_SUCCESS'},
    }

    expect(createMock(pendingState, pendingAction)).toEqual(response)
  })
})
