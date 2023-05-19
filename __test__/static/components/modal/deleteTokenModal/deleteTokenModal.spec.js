import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteTokenModal from '../../../../../src/static/components/modal/deleteTokenModal/deleteTokenModal';
import '@testing-library/jest-dom/extend-expect'

describe('Modal component', () => {
    test('renders modal with delete confirmation message and cancel/delete buttons', () => {
      const props = {
        isOpen: true,
        updateToken: jest.fn(),
        setDeleteTokenMsg: jest.fn(),
        closeDeleteTokenModal: jest.fn(),
        closeTokenModal: jest.fn(),
        closeAuthModal: jest.fn()
      };
      render(<DeleteTokenModal {...props} />);
      expect(screen.getByText(/Are you sure you want to delete token?/i)).toBeInTheDocument();
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();
      fireEvent.click(cancelButton);
      expect(props.closeDeleteTokenModal).toHaveBeenCalledTimes(1);
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);
      expect(props.setDeleteTokenMsg).toHaveBeenCalledTimes(1);
      expect(props.closeTokenModal).toHaveBeenCalledWith(false);
      expect(props.closeAuthModal).toHaveBeenCalledWith(false);
    });
  });
