import {put, call} from 'redux-saga/effects'
import {
  receiveDataAction,
  receiveError,
} from '../../../src/static/actions/createMock/createMockAction'
import {CREATE_PROJECT_SUCCESS} from '../../../src/static/actions/actionTypes'
import createMockSaga from '../../../src/static/sagas/createProjectSaga'
import createProjectService from '../../../src/static/service/createProject/createProjectService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('../../../src/static/service/createProject/createProjectService', () => {
  return jest.fn(() => ({
    createProjectService: jest.fn(),
  }))
})

describe('createMockSaga', () => {
  const payload = {type: 'CREATE_PROJECT_SUCCESS', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call createProjectService with payload', () => {
    const response = {
      data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'},
      status: 201,
    }
    createProjectService.mockReturnValueOnce(response)

    const generator = createMockSaga(payload)
    expect(generator.next().value).toEqual(call(createProjectService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(put(receiveDataAction({...response, type: CREATE_PROJECT_SUCCESS})))
    expect(generator.next().done).toBe(true)
  })

  it('should dispatch receiveError with message on failure', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error')
    const error = new Error('Something Went Wrong.')
    createProjectService.mockImplementationOnce(() => {
      throw error
    })

    const generator = createMockSaga(payload)
    expect(generator.next().value).toEqual(call(createProjectService, payload))
    const r = generator.throw(error).value
    expect(r).toEqual(put(receiveError()))
    expect(generator.next().done).toBe(true)
    const errorMessage = 'Something went wrong!'
    expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
  })
})
