import {
  PROJECT_LIST,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_SUCCESS,
  PROJECT_EDIT,
  PROJECT_EDIT_SUCCESS,
  PROJECT_EDIT_ERROR,
  PROJECT_DELETE,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_ERROR,
  PROJECT_LIST_PENDING
} from '../actionTypes'

export const projectListAction = data => {
  return {
    type: PROJECT_LIST,
    data,
  }
}

export const receiveDataAction = data => {
  return {
    type: PROJECT_LIST_SUCCESS,
    data,
  }
}

export const isProjectListPending = isPending => ({
  type: PROJECT_LIST_PENDING,
  isPending,
})

export const receiveError = data => {
  return {
    type: PROJECT_LIST_ERROR,
    data,
  }
}

export const projectListEditAction = data => {
  return {
    type: PROJECT_EDIT,
    data,
  }
}

export const receiveDataEditAction = data => {
  return {
    type: PROJECT_EDIT_SUCCESS,
    data,
  }
}

export const receiveEditError = data => {
  return {
    type: PROJECT_EDIT_ERROR,
    data,
  }
}

export const projectListDeleteAction = data => {
  return {
    type: PROJECT_DELETE,
    data,
  }
}

export const receiveDataDeleteAction = data => {
  return {
    type: PROJECT_DELETE_SUCCESS,
    data,
  }
}

export const receiveDeleteError = data => {
  return {
    type: PROJECT_DELETE_ERROR,
    data,
  }
}
