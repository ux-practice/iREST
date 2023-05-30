import {
  updateTokenAction,
  updateTokenActionSuccess,
  updateTokenActionError,
  resetStore,
  isUpdateTokenPending,
} from '../../../../src/static/actions/updateToken/updateToken'

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
  expect(updateTokenAction(data, true)).toEqual({
    type: 'UPDATE_TOKEN',
    data,
    isMockToken: true,
  })
  expect(updateTokenActionSuccess(data)).toEqual({type: 'UPDATE_TOKEN_SUCCESS', data})
  expect(updateTokenActionError(errorData)).toEqual({type: 'UPDATE_TOKEN_ERROR', data: errorData})
  expect(resetStore()).toEqual({type: 'RESET_STORE'})
  expect(isUpdateTokenPending(true)).toEqual({type: 'UPDATE_TOKEN_PENDING', isPending: true})
})
