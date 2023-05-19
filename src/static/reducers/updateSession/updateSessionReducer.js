import {SESSION_UPDATE_SUCCESS, SESSION_UPDATE_ERROR} from '../../actions/actionTypes'
import {updateSessionInitialState} from '../initialState'

export default function updateSession(state = updateSessionInitialState, action) {
  const response = action.data
  switch (action.type) {
    case SESSION_UPDATE_SUCCESS:
      return {...state, response}
    case SESSION_UPDATE_ERROR:
      return {...state, response}
    default:
      return state
  }
}
