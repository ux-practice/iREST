import {
  registerUserAction,
  receiveDataAction,
  receiveError,
} from '../../../../src/static/actions/register/authenticationActions'

test('testing actions function', () => {
  expect(registerUserAction()).toBeInstanceOf(Object)
  expect(receiveDataAction()).toBeInstanceOf(Object)
  expect(receiveError()).toBeInstanceOf(Object)
})
