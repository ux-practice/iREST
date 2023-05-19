import {
  deleteMockAction,
  receiveDataAction,
  receiveError,
  isDeleteMockPending,
} from '../../../../src/static/actions/deleteMock/deleteMockAction'

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
  expect(deleteMockAction(data)).toEqual({type: 'DELETE_MOCK', data})
  expect(receiveDataAction(data)).toEqual({type: 'DELETE_MOCK_SUCCESS', data})
  expect(receiveError(errorData)).toEqual({type: 'DELETE_MOCK_ERROR', data: errorData})
  expect(isDeleteMockPending(isPending)).toEqual({
    type: 'DELETE_MOCK_PENDING',
    isPending: isPending,
  })
})
