import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import projectList from '../../../../src/static/reducers/projectList/projectListReducer'
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
      projectList: [{_id: '6284de552d637c06f820c465', projectName: 'testing'}],
    },
    message: 'Project List',
    status: 200,
    type: 'PROJECT_LIST_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {
      projectList: [],
    },
    message: 'Project List',
    status: 400,
  },
}

const pendingState = {
  response: {
    isPending: true,
    status: 202,
    type: 'PROJECT_LIST_SUCCESS',
  },
}

describe('Project List Reducer', () => {
  it('should return default state', () => {
    expect(projectList(undefined, {})).toEqual(initialState)
  })

  it('should return PROJECT_LIST_SUCCESS', () => {
    const projectListAction = {
      type: types.PROJECT_LIST_SUCCESS,
      data: newState.response,
    }

    expect(projectList(newState, projectListAction)).toEqual(newState)
  })

  it('should return PROJECT_LIST_ERROR', () => {
    const projectListErrorAction = {
      type: types.PROJECT_LIST_ERROR,
      data: errorState.response,
    }

    expect(projectList(errorState, projectListErrorAction)).toEqual(errorState)
  })

  it('should return PROJECT_LIST_PENDING', () => {
    const pendingAction = {
      type: types.PROJECT_LIST_PENDING,
      isPending: true,
    }
    const response = {
      isPending: true,
      response: {isPending: true, status: 202, type: 'PROJECT_LIST_SUCCESS'},
    }

    expect(projectList(pendingState, pendingAction)).toEqual(response)
  })
})
