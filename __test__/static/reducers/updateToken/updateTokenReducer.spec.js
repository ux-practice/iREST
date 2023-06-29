import '@testing-library/jest-dom/extend-expect'
import updateTokenReducer from '../../../../src/static/reducers/updateToken/updateToken'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = []

const newState = {
  response: {
    mockResponse: {},
    status: 201,
    type: 'UPDATE_TOKEN_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {},
    mockResponse: {},
    status: 404,
    type: 'UPDATE_TOKEN_ERROR',
  },
}

const pendingState = {
  response: {
    isPending: true,
    status: 202,
    type: 'UPDATE_TOKEN_SUCCESS',
  },
}

describe('Mock Status Reducer', () => {
  it('should return default state', () => {
    expect(updateTokenReducer(undefined, {})).toEqual(initialState)
  })

  it('should return UPDATE_TOKEN_SUCCESS', () => {
    const authAction = {
      type: types.UPDATE_TOKEN_SUCCESS,
      data: newState.response,
    }

    expect(updateTokenReducer(newState, authAction)).toEqual(newState)
  })

  it('should return UPDATE_TOKEN_ERROR', () => {
    const authAction = {
      type: types.UPDATE_TOKEN_ERROR,
      data: errorState.response,
    }

    expect(updateTokenReducer(errorState, authAction)).toEqual(errorState)
  })

  it('should return RESET_STORE', () => {
    const authAction = {
      type: types.RESET_STORE,
    }

    expect(updateTokenReducer(newState, authAction)).toEqual({state: null, response: null})
  })

  it('should return UPDATE_TOKEN_PENDING', () => {
    const pendingAction = {
      type: types.UPDATE_TOKEN_PENDING,
      isPending: true,
    }
    const response = {
      isPending: true,
      response: {isPending: true, status: 202, type: 'UPDATE_TOKEN_SUCCESS'},
    }

    expect(updateTokenReducer(pendingState, pendingAction)).toEqual(response)
  })
})
