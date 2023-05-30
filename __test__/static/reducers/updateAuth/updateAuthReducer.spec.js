import '@testing-library/jest-dom/extend-expect'
import updateAuth from '../../../../src/static/reducers/updateAuthReducer/updateAuthReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = []

const newState = {
  response: {
    mockResponse: {},
    status: 201,
    type: 'UPDATE_AUTH_TYPE_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {},
    mockResponse: {},
    status: 404,
    type: 'UPDATE_AUTH_TYPE_ERROR',
  },
}

const pendingState = {
  response: {
    isPending: true,
    status: 202,
    type: 'UPDATE_AUTH_TYPE_SUCCESS',
  },
}

describe('Mock Status Reducer', () => {
  it('should return default state', () => {
    expect(updateAuth(undefined, {})).toEqual(initialState)
  })

  it('should return UPDATE_AUTH_TYPE_SUCCESS', () => {
    const authAction = {
      type: types.UPDATE_AUTH_TYPE_SUCCESS,
      data: newState.response,
    }

    expect(updateAuth(newState, authAction)).toEqual(newState)
  })

  it('should return UPDATE_AUTH_TYPE_ERROR', () => {
    const authAction = {
      type: types.UPDATE_AUTH_TYPE_ERROR,
      data: errorState.response,
    }

    expect(updateAuth(errorState, authAction)).toEqual(errorState)
  })

  it('should return UPDATE_AUTH_TYPE_PENDING', () => {
    const pendingAction = {
      type: types.UPDATE_AUTH_TYPE_PENDING,
      isPending: true,
    }
    const response = {
      isPending: true,
      response: {isPending: true, status: 202, type: 'UPDATE_AUTH_TYPE_SUCCESS'},
    }

    expect(updateAuth(pendingState, pendingAction)).toEqual(response)
  })
})
