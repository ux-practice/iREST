import {
  createMockAction,
  receiveDataAction,
  receiveError,
  flushMockData,
  fetchListById,
  fetchListByIdSuccess,
  fetchListByIdError,
} from '../../../../src/static/actions/createMock/createMockAction'

test('testing actions function', () => {
  expect(createMockAction()).toBeInstanceOf(Object)
  expect(receiveDataAction()).toBeInstanceOf(Object)
  expect(receiveError()).toBeInstanceOf(Object)
  expect(flushMockData()).toBeInstanceOf(Object)
  expect(fetchListById()).toBeInstanceOf(Object)
  expect(fetchListByIdSuccess()).toBeInstanceOf(Object)
  expect(fetchListByIdError()).toBeInstanceOf(Object)
})