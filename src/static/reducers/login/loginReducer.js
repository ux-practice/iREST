import {LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_CLEAR} from '../../actions/actionTypes'

export default function login(state = [], action) {
  const response = action.user
  const emptyResponse = []
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, response}
    case LOGIN_USER_ERROR:
      return {...state, response}
    case LOGIN_USER_CLEAR:
      return emptyResponse
    default:
      return state
  }
}
