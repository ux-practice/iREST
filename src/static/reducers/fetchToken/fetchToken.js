import {FETCH_TOKEN_SUCCESS, FETCH_TOKEN_ERROR} from '../../actions/actionTypes'

export default function fetchToken(state = [], action) {
  const response = action.data
  switch (action.type) {
    case FETCH_TOKEN_SUCCESS:
      return {...state, response}
    case FETCH_TOKEN_ERROR:
      return {...state, response}
    default:
      return state
  }
}
