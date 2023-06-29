import {REGISTER_USER_SUCCESS, REGISTER_USER_ERROR} from '../../actions/actionTypes'

export default function register(state = [], action) {
  const response = action.user
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {...state, response}
    case REGISTER_USER_ERROR:
      return {...state, response}
    default:
      return state
  }
}
