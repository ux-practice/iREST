import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import fileUpload from '../../../../src/static/reducers/fileUpload/fileUploadReducer'
import * as types from '../../../../src/static/actions/actionTypes'

const initialState = {
  response: {
    data: [],
  },
}

const newState = {
  response: {
    data: {
      file: '',
    },
    status: 200,
    type: 'FILE_UPLOAD_SUCCESS',
  },
}

const errorState = {
  response: {
    data: {
      file: '',
    },
    status: 400,
    type: 'FILE_UPLOAD_ERROR',
  },
}

describe('File Upload Reducer', () => {
  it('should return default state', () => {
    expect(fileUpload(undefined, {})).toEqual(initialState)
  })

  it('should return FILE_UPLOAD_SUCCESS', () => {
    const fileUploadSuccessAction = {
      type: types.FILE_UPLOAD_SUCCESS,
      data: newState.response,
    }

    expect(fileUpload(newState, fileUploadSuccessAction)).toEqual(newState)
  })

  it('should return FILE_UPLOAD_ERROR', () => {
    const fileUploadErrorAction = {
      type: types.FILE_UPLOAD_ERROR,
      data: errorState.response,
    }

    expect(fileUpload(errorState, fileUploadErrorAction)).toEqual(errorState)
  })

  it('should return FILE_UPLOAD_CLEAR', () => {
    const fileUploadClearAction = {
      type: types.FILE_UPLOAD_CLEAR,
    }

    expect(fileUpload({}, fileUploadClearAction)).toEqual(initialState)
  })
})
