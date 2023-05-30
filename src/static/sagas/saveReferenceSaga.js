import {call} from 'redux-saga/effects'
import {saveReferenceId} from '../actions/saveReference/saveReferenceAction'

export default function* saveReference(data) {
  try {
    yield call(saveReferenceId(data))
  } catch (error) {
    // yield call(saveReferenceIdError(data))
  }
}
