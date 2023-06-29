import {
  fetchTokenAction,
  fetchTokenSuccessAction,
  fetchTokenFailureAction,
} from '../../../../src/static/actions/fetchToken/fetchToken'

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
  expect(fetchTokenAction(data, true)).toEqual({type: 'FETCH_TOKEN', data, isMockToken: true})
  expect(fetchTokenSuccessAction(data)).toEqual({type: 'FETCH_TOKEN_SUCCESS', data})
  expect(fetchTokenFailureAction(errorData)).toEqual({type: 'FETCH_TOKEN_ERROR', data: errorData})
})
