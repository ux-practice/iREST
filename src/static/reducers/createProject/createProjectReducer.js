import {CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR} from '../../actions/actionTypes'
import {createProjectInitialState} from '../initialState'

export default function createProject(state = createProjectInitialState, action) {
  const response = action.data
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return {...state, response}
    case CREATE_PROJECT_ERROR:
      return {...state, response}
    default:
      return state
  }
}
