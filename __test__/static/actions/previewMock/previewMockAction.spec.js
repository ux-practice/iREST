import {
  createPreviewMockAction,
  receiveDataAction,
  receiveError,
  flushPreviewMockData,
  isPreviewMockPending,
} from '../../../../src/static/actions/previewMock/previewMockAction'

test('testing actions function', () => {
  const data = {
    response: {
      data: {},
    },
  }
  const errorData = {
    response: {
      data: {
        mock: 'No mocks found',
      },
    },
  }
  const isPending = true

  expect(createPreviewMockAction(data)).toEqual({type: 'PREVIEW_MOCK', data})
  expect(receiveDataAction(data)).toEqual({type: 'PREVIEW_MOCK_SUCCESS', data})
  expect(receiveError(errorData)).toEqual({type: 'PREVIEW_MOCK_ERROR', data: errorData})
  expect(flushPreviewMockData()).toEqual({
    type: 'PREVIEW_MOCK_CLEAR',
  })
  expect(isPreviewMockPending(isPending)).toEqual({
    type: 'PREVIEW_MOCK_PENDING',
    isPending: isPending,
  })
})
