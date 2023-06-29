import {
  createProjectAction,
  receiveDataAction,
  receiveError,
} from '../../../../src/static/actions/createProject/createProjectAction'

test('testing actions function', () => {
  expect(createProjectAction()).toBeInstanceOf(Object)
  expect(receiveDataAction()).toBeInstanceOf(Object)
  expect(receiveError()).toBeInstanceOf(Object)
})

