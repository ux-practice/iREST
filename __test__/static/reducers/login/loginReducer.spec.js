import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import login from '../../../../src/static/reducers/login/loginReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const state = {
  response: {
    data: {
      email: 'abc@impetus.com',
      name: 'abc',
      _id: '5236326236gdsfa6363',
    },
    message: 'Authorization successful.',
    status: 200,
    type: 'LOGIN_USER_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {},
    status: 400,
    type: 'LOGIN_USER_ERROR',
  },
}

describe('Login Reducer', () => {
  it('should return default state', () => {
    expect(login(undefined, {})).toEqual([])
  })

  it('should return LOGIN_USER_SUCCESS', () => {
    const loginUserAction = {
      type: types.LOGIN_USER_SUCCESS,
      user: state.response
    }

    expect(login(state, loginUserAction)).toEqual(state)
  })

  it('should return LOGIN_USER_ERROR', () => {
    const loginErrorAction = {
      type: types.LOGIN_USER_ERROR,
      user: errorState.response
    }

    expect(login(errorState, loginErrorAction)).toEqual(errorState)
  })

  it('should return LOGIN_USER_CLEAR', () => {
    const loginClearAction = {
      type: types.LOGIN_USER_CLEAR,
    }

    expect(login({}, loginClearAction)).toEqual([])
  })
})
