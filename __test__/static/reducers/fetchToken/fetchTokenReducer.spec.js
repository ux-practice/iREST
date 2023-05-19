import '@testing-library/jest-dom/extend-expect'
import fetchToken from '../../../../src/static/reducers/fetchToken/fetchToken'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = []

const newState = {
  response: {
    data: {
      file: '',
    },
    status: 200,
    type: 'FETCH_TOKEN_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {
      file: '',
    },
    status: 400,
    type: 'FETCH_TOKEN_ERROR',
  },
}

describe('File Upload Reducer', () => {
  it('should return default state', () => {
    expect(fetchToken(undefined, {})).toEqual(initialState)
  })

  it('should return FETCH_TOKEN_SUCCESS', () => {
    const fetchTokenSuccessAction = {
      type: types.FETCH_TOKEN_SUCCESS,
      data: newState.response,
    }

    expect(fetchToken(newState, fetchTokenSuccessAction)).toEqual(newState)
  })

  it('should return FETCH_TOKEN_ERROR', () => {
    const fetchTokenErrorAction = {
      type: types.FETCH_TOKEN_ERROR,
      data: errorState.response,
    }

    expect(fetchToken(errorState, fetchTokenErrorAction)).toEqual(errorState)
  })
})
