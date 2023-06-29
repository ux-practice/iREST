import {put, call} from 'redux-saga/effects'
import {
  receiveDataAction,
  receiveError,
} from '../../../src/static/actions/login/authenticationActions'
import {LOGIN_USER_SUCCESS} from '../../../src/static/actions/actionTypes'
import loginSaga from '../../../src/static/sagas/authenticationSaga'
import loginUserService from '../../../src/static/service/login/authenticationService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('../../../src/static/service/login/authenticationService', () => {
  return jest.fn(() => ({
    loginUserService: jest.fn(),
  }))
})

describe('loginSaga', () => {
  const payload = {type: 'LOGIN_USER_SUCCESS', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call loginUserService with payload', () => {
    const response = {data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'}}
    loginUserService.mockReturnValueOnce(response)

    const generator = loginSaga(payload)
    expect(generator.next().value).toEqual(call(loginUserService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.user).toEqual(response)

    expect(r).toEqual(put(receiveDataAction({...response, type: LOGIN_USER_SUCCESS})))
    expect(generator.next().done).toBe(true)
  })

  it('should dispatch receiveError with message on failure', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error')
    const error = new Error('Something Went Wrong.')
    loginUserService.mockImplementationOnce(() => {
      throw error
    })

    const generator = loginSaga(payload)
    expect(generator.next().value).toEqual(call(loginUserService, payload))
    const r = generator.throw(error).value
    expect(r).toEqual(put(receiveError()))
    expect(generator.next().done).toBe(true)
    const errorMessage = 'Something went wrong!'
    expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
  })
})
