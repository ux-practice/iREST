import {PROJECT_LIST_SUCCESS, PROJECT_LIST_ERROR, PROJECT_LIST_PENDING} from '../../actions/actionTypes'
import {projectListInitialState} from '../initialState'

export default function projectList(state = projectListInitialState, action) {
  const response = action.data
  switch (action.type) {
    case PROJECT_LIST_SUCCESS:
      return {...state, response}
    case PROJECT_LIST_ERROR:
      return {...state, response}
      case PROJECT_LIST_PENDING:
        return {
          ...state,
          isPending: action.isPending,
        }
    default:
      return state
  }
}
