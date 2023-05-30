import {
  loginUserAction,
  receiveDataAction,
  receiveError,
  flushUserData
} from '../../../../src/static/actions/login/authenticationActions'

test('testing actions function', () => {
  expect(loginUserAction()).toBeInstanceOf(Object)
  expect(receiveDataAction()).toBeInstanceOf(Object)
  expect(receiveError()).toBeInstanceOf(Object)
  expect(flushUserData()).toBeInstanceOf(Object)
})


