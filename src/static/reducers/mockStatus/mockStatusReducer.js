import {MOCK_STATUS_SUCCESS, MOCK_STATUS_ERROR, MOCK_STATUS_CLEAR} from '../../actions/actionTypes'
import {mockStatusInitialState} from '../initialState'

export default function mockStatus(state = mockStatusInitialState, action) {
  const response = action.data
  switch (action.type) {
    case MOCK_STATUS_SUCCESS:
      return {...state, response}
    case MOCK_STATUS_CLEAR:
      return mockStatusInitialState
    case MOCK_STATUS_ERROR:
      return {...state, response}
    default:
      return state
  }
}
