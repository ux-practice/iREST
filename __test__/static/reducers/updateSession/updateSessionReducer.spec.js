import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import updateSession from '../../../../src/static/reducers/updateSession/updateSessionReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  response: {
    data: [],
  },
}

const newState = {
  response: {
    data: [{token: 'efegfef34353t3t'}],
    status: 200,
  },
}

const errorState = {
  response: {
    data: [],
    status: 400,
  },
}

describe('Update Session Reducer', () => {
  it('should return default state', () => {
    expect(updateSession(undefined, {})).toEqual(initialState)
  })

  it('should return SESSION_UPDATE_SUCCESS', () => {
    const updateSessionAction = {
      type: types.SESSION_UPDATE_SUCCESS,
      data: newState.response,
    }

    expect(updateSession(newState, updateSessionAction)).toEqual(newState)
  })

  it('should return SESSION_UPDATE_ERROR', () => {
    const updateSessionErrorAction = {
      type: types.SESSION_UPDATE_ERROR,
      data: errorState.response,
    }

    expect(updateSession(errorState, updateSessionErrorAction)).toEqual(errorState)
  })
})
