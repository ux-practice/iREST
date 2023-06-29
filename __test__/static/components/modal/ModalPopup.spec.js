import React from 'react'
import { render, screen,act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalPopup from '../../../../src/static/components/modal/ModalPopup'

describe('testing ModalShow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  const defaultProps = {
    isOpen: false,
    closeDeleteModal: jest.fn(),
  }
  const newProps = {
    isOpen: true,
    closeDeleteModal: jest.fn(),
  }
  it('Should render the component and match its snapshot', () => {
    render(<ModalPopup {...defaultProps} />)
  })
  it('click on cancel button', async () => {
    render(<ModalPopup {...newProps} />)
    const cancelBtn = screen.getByText('CANCEL')
    await userEvent.click(cancelBtn)
    expect(newProps.closeDeleteModal).toBeCalledTimes(1)
  })
  it('click on delete button', async () => {
    act(() => {
      render(<ModalPopup {...newProps} />)
    })
    const deleteBtn = screen.getByText('DELETE')
    await userEvent.click(deleteBtn)
    expect(newProps.closeDeleteModal).toBeCalledTimes(1)
  })
})
