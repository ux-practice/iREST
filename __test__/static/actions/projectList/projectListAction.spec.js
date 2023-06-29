import {
  projectListAction,
  receiveDataAction,
  receiveError,
  projectListEditAction,
  receiveDataEditAction,
  receiveEditError,
  projectListDeleteAction,
  receiveDataDeleteAction,
  receiveDeleteError,
  isProjectListPending,
} from '../../../../src/static/actions/projectList/projectListAction'

test('testing actions function', () => {
  const data = {
    response: {
      data: {
        mock: [
          {id: 0, name: 'project 1'},
          {id: 1, name: 'project 2'},
        ],
      },
    },
  }
  const errorData = {
    response: {
      data: {
        mock: 'No mocks found'
      }
    },
  }

  const isPending = true

  expect(projectListAction(data)).toEqual({type: 'PROJECT_LIST', data})
  expect(receiveDataAction(data)).toEqual({type: 'PROJECT_LIST_SUCCESS', data})
  expect(receiveError(errorData)).toEqual({type: 'PROJECT_LIST_ERROR', data: errorData})

  expect(projectListEditAction(data)).toEqual({type: 'PROJECT_EDIT', data})
  expect(receiveDataEditAction(data)).toEqual({type: 'PROJECT_EDIT_SUCCESS', data})
  expect(receiveEditError(errorData)).toEqual({type: 'PROJECT_EDIT_ERROR', data: errorData})

  expect(projectListDeleteAction(data)).toEqual({type: 'PROJECT_DELETE', data})
  expect(receiveDataDeleteAction(data)).toEqual({type: 'PROJECT_DELETE_SUCCESS', data})
  expect(receiveDeleteError(errorData)).toEqual({type: 'PROJECT_DELETE_ERROR', data: errorData})

  expect(isProjectListPending(isPending)).toEqual({type: 'PROJECT_LIST_PENDING', isPending: isPending})
})
