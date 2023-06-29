import {put, call} from 'redux-saga/effects'
import {
    sessionDataAction,
    sessionError,
} from '../../../src/static/actions/sessionUpdate/sessionUpdateAction'
import {SESSION_UPDATE_SUCCESS} from '../../../src/static/actions/actionTypes'
import updateSessionSaga from '../../../src/static/sagas/updateSessionSaga'
import updateSessionService from '../../../src/static/service/updateSession/updateSessionService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('../../../src/static/service/updateSession/updateSessionService', () => {
  return jest.fn(() => ({
    updateSessionService: jest.fn(),
  }))
})

describe('testing updateSessionSaga', () => {
  const payload = {type: 'SESSION_UPDATE_SUCCESS', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call updateSessionService with payload', () => {
    const response = {
      data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'},
      status: 201,
    }
    updateSessionService.mockReturnValueOnce(response)

    const generator = updateSessionSaga(payload)
    expect(generator.next().value).toEqual(call(updateSessionService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(put(sessionDataAction({...response, type: SESSION_UPDATE_SUCCESS})))
    expect(generator.next().done).toBe(true)
  })

  it('should dispatch sessionError with message on failure', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error')
    const error = new Error('Something went wrong!')
    updateSessionService.mockImplementationOnce(() => {
      throw error
    })

    const generator = updateSessionSaga(payload)
    expect(generator.next().value).toEqual(call(updateSessionService, payload))
    const r = generator.throw(error).value
    expect(r).toEqual(put(sessionError()))
    expect(generator.next().done).toBe(true)
    const errorMessage = 'Something went wrong!'
    expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
  })
})
