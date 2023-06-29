import {put, call} from 'redux-saga/effects'
import {
  receiveDataAction,
  receiveError,
} from '../../../src/static/actions/mockStatus/mockStatusActions'
import {MOCK_STATUS_SUCCESS} from '../../../src/static/actions/actionTypes'
import mockStatusSaga from '../../../src/static/sagas/mockStatusSaga'
import StatuService from '../../../src/static/service/mockStatus/mockStatusService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('../../../src/static/service/mockStatus/mockStatusService', () => {
  return jest.fn(() => ({
    StatuService: jest.fn(),
  }))
})

describe('testing mockStatusSaga', () => {
  const payload = {type: 'MOCK_STATUS_SUCCESS', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call StatuService with payload', () => {
    const response = {
      data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'},
      status: 201,
    }
    StatuService.mockReturnValueOnce(response)

    const generator = mockStatusSaga(payload)
    expect(generator.next().value).toEqual(call(StatuService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(put(receiveDataAction({...response, type: MOCK_STATUS_SUCCESS})))
    expect(generator.next().done).toBe(true)
  })

  it('should dispatch receiveError with message on failure', () => {
    const toastErrorSpy = jest.spyOn(toast, 'error')
    const error = new Error('Record not found')
    StatuService.mockImplementationOnce(() => {
      throw error
    })

    const generator = mockStatusSaga(payload)
    expect(generator.next().value).toEqual(call(StatuService, payload))
    const r = generator.throw(error).value
    expect(r).toEqual(put(receiveError()))
    expect(generator.next().done).toBe(true)
    const errorMessage = 'Record not found'
    expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
  })
})
