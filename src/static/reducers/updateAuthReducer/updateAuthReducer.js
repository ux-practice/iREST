import {UPDATE_AUTH_TYPE_SUCCESS, UPDATE_AUTH_TYPE_ERROR, UPDATE_AUTH_TYPE_PENDING} from '../../actions/actionTypes'

export default function updateAuth(state = [], action) {
  const response = action.data
  switch (action.type) {
    case UPDATE_AUTH_TYPE_SUCCESS:
      return {...state, response}
    case UPDATE_AUTH_TYPE_ERROR:
      return {...state, response}
    case UPDATE_AUTH_TYPE_PENDING:
      return {...state, isPending: action.isPending}
    default:
      return state
  }
}
