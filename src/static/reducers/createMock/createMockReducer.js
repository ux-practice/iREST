import {
  CREATE_MOCK_SUCCESS,
  CREATE_MOCK_ERROR,
  CREATE_MOCK_CLEAR,
  FETCH_LIST_BY_ID_SUCCESS,
  FETCH_LIST_BY_ID_ERROR,
  FETCH_LIST_BY_ID_PENDING
} from '../../actions/actionTypes'
import {createMockInitialState} from '../initialState'

export default function createMock(state = createMockInitialState, action) {
  const response = action.data
  switch (action.type) {
    case CREATE_MOCK_SUCCESS:
      return {...state, response}
    case CREATE_MOCK_ERROR:
      return {...state, response}
    case CREATE_MOCK_CLEAR:
      return createMockInitialState
    case FETCH_LIST_BY_ID_SUCCESS:
      return {...state, response}
    case FETCH_LIST_BY_ID_ERROR:
      return {...state, response}
    case FETCH_LIST_BY_ID_PENDING:
      return {...state, isPending: action.isPending}
    default:
      return state
  }
}
