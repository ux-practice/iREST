import {put, call} from 'redux-saga/effects'
import {
  receiveDataAction,
  receiveError,
  isPreviewMockPending,
} from '../../../src/static/actions/previewMock/previewMockAction'
import {PREVIEW_MOCK_SUCCESS} from '../../../src/static/actions/actionTypes'
import createPreviewMockSaga from '../../../src/static/sagas/createPreviewMockSaga'
import createPreviewService from '../../../src/static/service/previewMock/previewMockService'

jest.mock('../../../src/static/service/previewMock/previewMockService', () => {
  return jest.fn(() => ({
    createPreviewService: jest.fn(),
  }))
})

describe('createPreviewMockSaga', () => {
  const payload = {type: 'PREVIEW_MOCK', data: {projectName: 'createproj'}}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call createPreviewService with payload', () => {
    const response = {data: {id: '123', mockName: 'newproj', mockUrl: '/api/rest/createproj/proj'}}
    createPreviewService.mockReturnValueOnce(response)

    const generator = createPreviewMockSaga(payload)
    expect(generator.next().value).toEqual(put(isPreviewMockPending(true)))
    expect(generator.next().value).toEqual(call(createPreviewService, payload))

    const r = generator.next(response).value
    expect(r.payload.action.data).toEqual(response)

    expect(r).toEqual(
      put(receiveDataAction({...response, type: PREVIEW_MOCK_SUCCESS}))
    )

    expect(generator.next(response).value).toEqual(put(isPreviewMockPending(false)))
  })

  it('should dispatch receiveError with message on failure', () => {
    const error = new Error('Something Went Wrong.');
    createPreviewService.mockImplementationOnce(() => {
      throw error;
    });

    const generator = createPreviewMockSaga(payload);

    expect(generator.next().value).toEqual(put(isPreviewMockPending(true)))
    expect(generator.next().value).toEqual(call(createPreviewService, payload))

    const r = generator.throw(error).value
    expect(r.payload.action.data).toEqual({ message: 'Something Went Wrong.' })
  });

})
