import {UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_ERROR, RESET_STORE, UPDATE_TOKEN_PENDING} from '../../actions/actionTypes'

export default function updateTokenReducer(state = [], action) {
  const response = action.data
  switch (action.type) {
    case UPDATE_TOKEN_SUCCESS:
      return {...state, response}
    case UPDATE_TOKEN_ERROR:
      return {...state, response}
    case RESET_STORE:
      return {state:null, response:null}
    case UPDATE_TOKEN_PENDING:
      return {...state, isPending: action.isPending}
    default:
      return state
  }
}