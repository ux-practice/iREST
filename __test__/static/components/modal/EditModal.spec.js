import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditModal from '../../../../src/static/components/modal/EditModal'

describe('testing ModalShow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  const defaultProps = {
    projectName: '',
    isOpen: false,
    closeDeleteModal: jest.fn(),
    setProjectNameProp: jest.fn(),
  }
  const newProps = {
    projectName: 'project 1',
    isOpen: true,
    closeDeleteModal: jest.fn(),
    setProjectNameProp: jest.fn(),
  }

  const newProp = {
    projectName: '',
    isOpen: true,
    closeDeleteModal: jest.fn(),
    setProjectNameProp: jest.fn(),
  }

  it('Should render the component', () => {
    render(<EditModal {...defaultProps} />)
    expect(screen.queryByText(/Project name is required/i)).toBeFalsy()
    expect(screen.queryByText('UPDATE')).toBeFalsy()
  })

  it('click on cancel button', async () => {
    render(<EditModal {...newProps} />)
    await waitFor(() => expect(screen.findByText(/Project name is required/i)).toBeTruthy())
    const cancelBtn = screen.getByText('CANCEL')
    await userEvent.click(cancelBtn)
    expect(newProps.closeDeleteModal).toBeCalledTimes(1)
  })

  it('click on update button', async () => {
    render(<EditModal {...newProps} />)
    await waitFor(() => expect(screen.findByText(/Project name is required/i)).toBeTruthy())
    expect(screen.queryByText('UPDATE')).toBeTruthy()
    const updateBtn = screen.getByText('UPDATE')
    await userEvent.click(updateBtn)
    expect(newProps.closeDeleteModal).toBeCalledTimes(1)
    expect(screen.getByText('UPDATE').disabled).toBeFalsy()

    expect(screen.getByRole('textbox').value).toBe('project 1')
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'project'}})
    expect(screen.getByRole('textbox').value).toBe('project')
  })

  it('click on disabled update button', async () => {
    render(<EditModal {...newProp} />)
    await waitFor(() => expect(screen.findByText(/Project name is required/i)).toBeTruthy())
    expect(screen.queryByText('UPDATE')).toBeTruthy()
    const updateBtn = screen.getByText('UPDATE')
    await userEvent.click(updateBtn)
    expect(newProp.closeDeleteModal).toBeCalledTimes(0)
    expect(screen.getByText('UPDATE').disabled).toBeTruthy()

    expect(screen.getByRole('textbox').value).toBe('')
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'project'}})
    expect(screen.getByRole('textbox').value).toBe('project')
  })
})
