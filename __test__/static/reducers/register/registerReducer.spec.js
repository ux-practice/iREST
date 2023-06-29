import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import register from '../../../../src/static/reducers/register/registerReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const state = {
  response: {
    data: {
      email: 'abc@impetus.com',
      name: 'abc',
    },
    message: 'Authorization successful.',
    status: 200,
    type: 'REGISTER_USER_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {},
    status: 400,
    type: 'REGISTER_USER_ERROR',
  },
}

describe('Register Reducer', () => {
  it('should return default state', () => {
    expect(register(undefined, {})).toEqual([])
  })

  it('should return REGISTER_USER_SUCCESS', () => {
    const registerUserAction = {
      type: types.REGISTER_USER_SUCCESS,
      user: state.response,
    }

    expect(register(state, registerUserAction)).toEqual(state)
  })

  it('should return REGISTER_USER_ERROR', () => {
    const registerErrorAction = {
      type: types.REGISTER_USER_ERROR,
      user: errorState.response,
    }

    expect(register(errorState, registerErrorAction)).toEqual(errorState)
  })
})
