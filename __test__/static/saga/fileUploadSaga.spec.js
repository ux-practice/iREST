import {put, call} from 'redux-saga/effects'
import {
  receiveDataAction,
  receiveError,
} from '../../../src/static/actions/fileUpload/fileUploadAction'
import {FILE_UPLOAD_SUCCESS} from '../../../src/static/actions/actionTypes'
import fileUploadSaga from '../../../src/static/sagas/fileUploadSaga'
import fileUploadService from '../../../src/static/service/fileUpload/fileUploadService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('../../../src/static/service/fileUpload/fileUploadService', () => {
  return jest.fn(() => ({
    fileUploadService: jest.fn(),
  }))
})

describe('fileUploadSaga', () => {
  const payload = {type: 'FILE_UPLOAD_SUCCESS', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call fileUploadService with payload', () => {
    const response = {
      data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'},
      status: 201,
    }
    fileUploadService.mockReturnValueOnce(response)

    const generator = fileUploadSaga(payload)
    expect(generator.next().value).toEqual(call(fileUploadService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(put(receiveDataAction({...response, type: FILE_UPLOAD_SUCCESS})))
    expect(generator.next().done).toBe(true)
  })

  it('should dispatch receiveError with message on failure', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error')
    const error = new Error('Something Went Wrong.')
    fileUploadService.mockImplementationOnce(() => {
      throw error
    })

    const generator = fileUploadSaga(payload)
    expect(generator.next().value).toEqual(call(fileUploadService, payload))
    const r = generator.throw(error).value
    expect(r).toEqual(put(receiveError()))
    expect(generator.next().done).toBe(true)
    const errorMessage = 'Something went wrong!'
    expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
  })
})
