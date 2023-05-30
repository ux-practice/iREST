import {
  updateAuthTypeAction,
  receiveDataAction,
  receiveError,
  isUpdateAuthPending,
} from '../../../../src/static/actions/updateAuthType/updateAuthType'

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
  expect(updateAuthTypeAction(data, true)).toEqual({
    type: 'UPDATE_AUTH_TYPE',
    data,
    isMockAuth: true,
  })
  expect(receiveDataAction(data)).toEqual({type: 'UPDATE_AUTH_TYPE_SUCCESS', data})
  expect(receiveError(errorData)).toEqual({type: 'UPDATE_AUTH_TYPE_ERROR', data: errorData})
  expect(isUpdateAuthPending(true)).toEqual({type: 'UPDATE_AUTH_TYPE_PENDING', isPending: true})
})
