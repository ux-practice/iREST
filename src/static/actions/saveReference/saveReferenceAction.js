import {SAVE_REFERENCE_ID, SAVE_REFERENCE_ID_ERROR} from '../actionTypes'

export const saveReferenceId = data => {
  return {
    type: SAVE_REFERENCE_ID,
    data,
  }
}

export const saveReferenceIdError = data => {
  return {
    type: SAVE_REFERENCE_ID_ERROR,
    data,
  }
}
