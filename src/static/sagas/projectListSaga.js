import {put, call} from 'redux-saga/effects'
import projectListService from '../service/projectList/projectListService'
import {PROJECT_LIST_SUCCESS} from '../actions/actionTypes'
import {receiveDataAction, isProjectListPending} from '../actions/projectList/projectListAction'

export default function* projectListSaga(payload) {
  try {
    yield put(isProjectListPending(true))
    const response = yield call(projectListService, payload)
    response.type = PROJECT_LIST_SUCCESS
    yield put(receiveDataAction(response))
    yield put(isProjectListPending(false))
  } catch (error) {
    const resp = {data: {projectList: []}}
    yield put(receiveDataAction(resp))
  }
}
