import {DELETE_MOCK_SUCCESS, DELETE_MOCK_ERROR, DELETE_MOCK_PENDING} from '../../actions/actionTypes'

export default function deleteMock(state = [], action) {
  const response = action.data
  switch (action.type) {
    case DELETE_MOCK_SUCCESS:
      return {...state, response}
    case DELETE_MOCK_ERROR:
      return {...state, response}
    case DELETE_MOCK_PENDING:
      return {...state, isPending: action.isPending}
    default:
      return state
  }
}
