import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import deleteMock from '../../../../src/static/reducers/deleteMock/deleteMockReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const state = {
  response: {
    message: 'Mock Deleted Successfully.',
    status: 202,
    type: 'DELETE_MOCK_SUCCESS',
  },
}

const errorState = {
  response: {
    status: 404,
    type: 'DELETE_MOCK_ERROR',
  },
}

const pendingState = {
  response: {
    isPending: true,
    status: 202,
    type: 'DELETE_MOCK_SUCCESS',
  },
}

describe('Delete Mock Reducer', () => {
  it('should return default state', () => {
    expect(deleteMock(undefined, {})).toEqual([])
  })

  it('should return DELETE_MOCK_SUCCESS', () => {
    const deleteUserAction = {
      type: types.DELETE_MOCK_SUCCESS,
      data: state.response,
    }

    expect(deleteMock(state, deleteUserAction)).toEqual(state)
  })

  it('should return DELETE_MOCK_ERROR', () => {
    const deleteErrorAction = {
      type: types.DELETE_MOCK_ERROR,
      data: errorState.response,
    }

    expect(deleteMock(errorState, deleteErrorAction)).toEqual(errorState)
  })

  it('should return DELETE_MOCK_PENDING', () => {
    const deletePendingAction = {
      type: types.DELETE_MOCK_PENDING,
      isPending: true,
    }
    const response = {
      isPending: true,
      response: {isPending: true, status: 202, type: 'DELETE_MOCK_SUCCESS'},
    }

    expect(deleteMock(pendingState, deletePendingAction)).toEqual(response)
  })
})
