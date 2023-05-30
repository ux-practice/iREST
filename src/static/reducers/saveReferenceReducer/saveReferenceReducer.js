import {SAVE_REFERENCE_ID, SAVE_REFERENCE_ID_ERROR} from '../../actions/actionTypes'

const initialState = ''

export default function saveReference(state = initialState, action) {
  const response = action.data
  switch (action.type) {
    case SAVE_REFERENCE_ID:
      return response
    case SAVE_REFERENCE_ID_ERROR:
      return response
    default:
      return state
  }
}
