import {put, call} from 'redux-saga/effects'
import {
  receiveDataAction,
  isUpdateAuthPending,
} from '../../../src/static/actions/updateAuthType/updateAuthType'
import {UPDATE_AUTH_TYPE} from '../../../src/static/actions/actionTypes'
import updateAuthTypeSaga from '../../../src/static/sagas/updateAuthTypeSaga'
import updateAuthTypeService from '../../../src/static/service/updateAuthType/updateAuthType'

jest.mock('../../../src/static/service/updateAuthType/updateAuthType', () => {
  return jest.fn(() => ({
    updateAuthTypeService: jest.fn(),
  }))
})

describe('updateAuthTypeSaga', () => {
  const payload = {type: 'UPDATE_AUTH_TYPE', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call updateAuthTypeService with payload', () => {
    const response = {data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'}}
    updateAuthTypeService.mockReturnValueOnce(response)

    const generator = updateAuthTypeSaga(payload)
    expect(generator.next().value).toEqual(put(isUpdateAuthPending(true)))
    expect(generator.next().value).toEqual(call(updateAuthTypeService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(put(receiveDataAction({...response, type: UPDATE_AUTH_TYPE})))

    expect(generator.next(response).value).toEqual(put(isUpdateAuthPending(false)))
  })

  it('should dispatch receiveError with message on failure', () => {
    const error = new Error('Something Went Wrong.')
    updateAuthTypeService.mockImplementationOnce(() => {
      throw error
    })

    const generator = updateAuthTypeSaga(payload)

    expect(generator.next().value).toEqual(put(isUpdateAuthPending(true)))
    expect(generator.next().value).toEqual(call(updateAuthTypeService, payload))

    const r = generator.throw(error).value
    expect(r.payload.action.type).toEqual('UPDATE_AUTH_TYPE_ERROR')
  })
})
