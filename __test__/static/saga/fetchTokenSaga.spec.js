import {put, call} from 'redux-saga/effects'
import {
  fetchTokenSuccessAction,
  fetchTokenFailureAction,
} from '../../../src/static/actions/fetchToken/fetchToken'
import {FETCH_TOKEN} from '../../../src/static/actions/actionTypes'
import fetchTokenSaga from '../../../src/static/sagas/fetchTokenSaga'
import fetchTokenService from '../../../src/static/service/fetchToken/fetchToken'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('../../../src/static/service/fetchToken/fetchToken', () => {
  return jest.fn(() => ({
    fetchTokenService: jest.fn(),
  }))
})

describe('fetchTokenSaga', () => {
  const payload = {type: 'FETCH_TOKEN', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetchTokenService with payload', () => {
    const response = {data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'}}
    fetchTokenService.mockReturnValueOnce(response)

    const generator = fetchTokenSaga(payload)
    expect(generator.next().value).toEqual(call(fetchTokenService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(put(fetchTokenSuccessAction({...response, type: FETCH_TOKEN})))
  })

  it('should dispatch receiveError with message on failure', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error')
    const error = new Error('Something Went Wrong.')
    fetchTokenService.mockImplementationOnce(() => {
      throw error
    })

    const generator = fetchTokenSaga(payload)
    expect(generator.next().value).toEqual(call(fetchTokenService, payload))
    const r = generator.throw(error).value
    expect(r).toEqual(put(fetchTokenFailureAction()))
    expect(generator.next().done).toBe(true);
    const errorMessage = 'Record not found'
    expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
  })
})
