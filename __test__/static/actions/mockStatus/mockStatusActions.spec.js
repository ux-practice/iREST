import {
  mockStatusAction,
  receiveDataAction,
  receiveError,
  flushMockStatus,
} from '../../../../src/static/actions/mockStatus/mockStatusActions'

test('testing actions function', () => {
  expect(mockStatusAction()).toBeInstanceOf(Object)
  expect(receiveDataAction()).toBeInstanceOf(Object)
  expect(receiveError()).toBeInstanceOf(Object)
  expect(flushMockStatus()).toBeInstanceOf(Object)
})
