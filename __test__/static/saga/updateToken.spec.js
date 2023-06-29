import {put} from 'redux-saga/effects'
import {
  updateTokenActionError,
  resetStore,
  isUpdateTokenPending,
} from '../../../src/static/actions/updateToken/updateToken'
import updateTokenSaga from '../../../src/static/sagas/updateToken'
import updateTokenService from '../../../src/static/service/updateToken/updateToken'

jest.mock('../../../src/static/service/updateToken/updateToken', () => {
  return jest.fn(() => ({
    updateTokenService: jest.fn(),
  }))
})

describe('updateTokenSaga', () => {
  const payload = {
    type: 'UPDATE_TOKEN',
    data: {projectName: 'createproj', token: '123', isMockToken: true},
    isMockToken: true,
    id: 0
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call updateTokenService with payload', () => {
    const response = {data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'}}
    updateTokenService.mockReturnValueOnce(response)

    const generator = updateTokenSaga(payload)

    expect(generator.next().value).toEqual(put(isUpdateTokenPending(true)))
    expect(generator.next().value).toEqual(put(updateTokenActionError()))
    expect(generator.next().value).toEqual(put(resetStore()))
    expect(generator.next().done).toBe(true)
  })
})
