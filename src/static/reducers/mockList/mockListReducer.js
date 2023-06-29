import {MOCK_LIST_SUCCESS, MOCK_LIST_ERROR, MOCK_LIST_PENDING} from '../../actions/actionTypes'
import {mockListInitialState} from '../initialState'

export default function createMock(state = mockListInitialState, action) {
  const response = action.data
  switch (action.type) {
    case MOCK_LIST_SUCCESS:
      return {...state, response}
    case MOCK_LIST_ERROR:
      return {...state, response}
    case MOCK_LIST_PENDING:
      return {...state, isPending: action.isPending,}
    default:
      return state
  }
}
