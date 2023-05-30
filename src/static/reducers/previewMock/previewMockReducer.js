import {
    PREVIEW_MOCK_SUCCESS,
    PREVIEW_MOCK_ERROR,
    PREVIEW_MOCK_CLEAR,
    PREVIEW_MOCK_PENDING
  } from '../../actions/actionTypes'
  import {createPreviewMockInitialState} from '../initialState'
  
  export default function createPreviewMock(state = createPreviewMockInitialState, action) {
    const response = action.data
    switch (action.type) {
      case PREVIEW_MOCK_SUCCESS:
        return {...state, response}
      case PREVIEW_MOCK_ERROR:
        return {...state, response}
      case PREVIEW_MOCK_PENDING:
        return {...state, isPending: action.isPending}
      case PREVIEW_MOCK_CLEAR:
        return createPreviewMockInitialState
      default:
        return state
    }
  }