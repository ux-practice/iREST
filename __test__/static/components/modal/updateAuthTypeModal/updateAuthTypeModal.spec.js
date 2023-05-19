import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UpdateAuthModal from '../../../../../src/static/components/modal/updateAuthTypeModal/updateAuthTypeModal';
import '@testing-library/jest-dom/extend-expect'

describe('UpdateAuthModal', () => {
  const mockProps = {
    isOpen: true,
    mockdata: {
      _id: 'mock-id',
      authenticationType: 'MOCK_SPECIFIC',
    },
    isMock: true,
    tokenData: 'mock-token',
    projData: {
      _id: 'proj-id',
    },
    closeAuthModal: jest.fn(),
    updateMockAuthType: jest.fn(),
    updateToken: jest.fn(),
    openTokenDeleteModal: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal content', () => {
    render(<UpdateAuthModal {...mockProps} />);

    expect(screen.getByText('API secret')).toBeInTheDocument();
    expect(screen.getByText('Select Authentication Type')).toBeInTheDocument();
    expect(screen.getByText('Token')).toBeInTheDocument();
    expect(screen.getByText('An arbitrary bearer token required by the mock (for private APIs only)')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('UPDATE')).toBeInTheDocument();
  });

  it('should call closeAuthModal function when cancel button is clicked', () => {
    render(<UpdateAuthModal {...mockProps} />);
    const cancelButton = screen.getByText('CANCEL');

    fireEvent.click(cancelButton);

    expect(mockProps.closeAuthModal).toHaveBeenCalledWith(false);
  });

  it('should call updateMockAuthType and closeAuthModal functions when UPDATE button is clicked and authType is updated', () => {
    render(<UpdateAuthModal {...mockProps} />);
    const updateButton = screen.getByText('UPDATE');
    const authSelect = screen.getByLabelText('auth-select');

    fireEvent.change(authSelect, { target: { value: 'OFF' } });
    fireEvent.click(updateButton);

    expect(mockProps.updateMockAuthType).toHaveBeenCalledWith({ id: 'mock-id', authenticationType: 'OFF' });
    expect(mockProps.closeAuthModal).toHaveBeenCalledWith(false);
  });

  it('calls openTokenDeleteModal when the button is clicked', () => {
    render(<UpdateAuthModal {...mockProps} />);

    const button = screen.getByAltText('delete_icon').parentElement; 

    fireEvent.click(button); 

    expect(mockProps.openTokenDeleteModal).toHaveBeenCalledTimes(1);
  });

});
