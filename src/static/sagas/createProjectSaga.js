import {put, call} from 'redux-saga/effects'
import {notifyError} from '../components/common/Toast'
import createProjectService from '../service/createProject/createProjectService'
import {CREATE_PROJECT_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, receiveError} from '../actions/createMock/createMockAction'

export default function* createMockSaga(payload) {
  try {
    const response = yield call(createProjectService, payload)
    if (response.status === 201) {
      response.type = CREATE_PROJECT_SUCCESS
      yield put(receiveDataAction(response))
    }
  } catch (error) {
    yield put(receiveError())
    notifyError('Something went wrong!')
  }
}
