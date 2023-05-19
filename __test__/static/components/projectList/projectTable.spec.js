import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import ProjectTable from '../../../../src/static/components/projectList/projectTable'
import {mockEmptyProps, mockProps} from './mocks'

describe('testing ProjectTable Component', () => {
  test('rendering ProjectTable with empty projectList', () => {
    const props = mockEmptyProps

    render(<ProjectTable {...props} />)
    expect(screen.getByText(/PROJECT NAME/i)).toBeTruthy()
    expect(screen.getByText(/MOCK COUNT/i)).toBeTruthy()
    expect(screen.getByText(/ACTION/i)).toBeTruthy()
  })

  test('rendering ProjectTable with non-empty projectList with edit button clicked', () => {
    const props = mockProps

    render(<ProjectTable {...props} />)

    const editButton = screen.getAllByRole('button', {name: /edit-button/i})
    fireEvent.click(editButton[0])
    expect(props.openEditModal).toBeCalledTimes(1)
    expect(props.setEditId).toBeCalledTimes(1)
    expect(props.setProjectName).toBeCalledTimes(1)
  })

  test('rendering ProjectTable with non-empty projectList  with delete button clicked', () => {
    const props = mockProps

    render(<ProjectTable {...props} />)

    const deleteButton = screen.getAllByRole('button', {name: /delete-button/i})
    fireEvent.click(deleteButton[0])
    expect(props.openDeleteModal).toBeCalledTimes(1)
    expect(props.setDeleteId).toBeCalledTimes(1)
  })
})
