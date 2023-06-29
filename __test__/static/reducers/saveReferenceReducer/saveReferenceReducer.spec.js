import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import saveReference from '../../../../src/static/reducers/saveReferenceReducer/saveReferenceReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = ''

const state = {
  response: {
    data: {id: '25423532gddeg2442'},
    status: 200,
    type: 'SAVE_REFERENCE_ID',
  },
}

const errorState = {
  response: {
    data: {id: ''},
    status: 400,
    type: 'SAVE_REFERENCE_ID_ERROR',
  },
}

describe('Save Reference Reducer', () => {
  it('should return default state', () => {
    expect(saveReference(undefined, {})).toEqual(initialState)
  })

  it('should return SAVE_REFERENCE_ID', () => {
    const saveReferenceUserAction = {
      type: types.SAVE_REFERENCE_ID,
      data: state,
    }

    expect(saveReference(state, saveReferenceUserAction)).toEqual(state)
  })

  it('should return SAVE_REFERENCE_ID_ERROR', () => {
    const saveReferenceErrorAction = {
      type: types.SAVE_REFERENCE_ID_ERROR,
      data: errorState,
    }

    expect(saveReference(errorState, saveReferenceErrorAction)).toBe(errorState)
  })
})
