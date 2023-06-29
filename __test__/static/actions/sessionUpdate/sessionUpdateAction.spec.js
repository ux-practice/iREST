import {
  sessionUpdateAction,
  sessionDataAction,
  sessionError,
} from '../../../../src/static/actions/sessionUpdate/sessionUpdateAction'

test('testing actions function', () => {
  expect(sessionUpdateAction()).toBeInstanceOf(Object)
  expect(sessionDataAction()).toBeInstanceOf(Object)
  expect(sessionError()).toBeInstanceOf(Object)
})
