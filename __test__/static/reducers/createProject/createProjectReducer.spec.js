import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import createProject from '../../../../src/static/reducers/createProject/createProjectReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  response: {
    data: [],
  },
}

const newState = {
  response: {
    data: {
      project: {
        _id: '6284de552d637c06f820c465',
        projectName: 'testing',
        mockName: 'mock_1',
        endpoint: 'endpoint_1',
      },
    },
    status: 200,
    type: 'CREATE_PROJECT_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {
      project: {},
    },
    status: 400,
    type: 'CREATE_PROJECT_ERROR',
  },
}

describe('Create Project Reducer', () => {
  it('should return default state', () => {
    expect(createProject(undefined, {})).toEqual(initialState)
  })

  it('should return CREATE_PROJECT_SUCCESS', () => {
    const createProjectUserAction = {
      type: types.CREATE_PROJECT_SUCCESS,
      data: newState.response,
    }

    expect(createProject(newState, createProjectUserAction)).toEqual(newState)
  })

  it('should return CREATE_PROJECT_ERROR', () => {
    const createProjectErrorAction = {
      type: types.CREATE_PROJECT_ERROR,
      data: errorState.response,
    }

    expect(createProject(errorState, createProjectErrorAction)).toEqual(errorState)
  })
})
