import {
  mockListAction,
  receiveDataAction,
  receiveError,
  isMockListPending,
} from '../../../../src/static/actions/mockList/mockListActions'

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

  expect(mockListAction(data)).toEqual({type: 'MOCK_LIST', data})
  expect(receiveDataAction(data)).toEqual({type: 'MOCK_LIST_SUCCESS', data})
  expect(receiveError(errorData)).toEqual({type: 'MOCK_LIST_ERROR', data: errorData})
  expect(isMockListPending(isPending)).toEqual({
    type: 'MOCK_LIST_PENDING',
    isPending: isPending,
  })
})
