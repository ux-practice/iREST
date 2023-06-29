import {CREATE_PROJECT, CREATE_PROJECT_ERROR, CREATE_PROJECT_SUCCESS} from '../actionTypes'

export const createProjectAction = data => {
  return {
    type: CREATE_PROJECT,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    data,
  }
}

export const receiveError = data => {
  return {
    type: CREATE_PROJECT_ERROR,
    data,
  }
}
