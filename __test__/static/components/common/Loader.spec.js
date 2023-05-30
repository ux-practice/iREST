import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../../../src/static/components/common/Loader';
import '@testing-library/jest-dom/extend-expect'
import { Spinner } from 'react-bootstrap';

describe('<Loader />', () => {
    it('should render a Spinner component', () => {
      render(<Loader />);
      const spinnerElement = screen.getByTestId('spinner');
      expect(spinnerElement).toBeInTheDocument();
    });
  
    it('should render an overlay if isOverlay prop is true', () => {
      render(<Loader isOverlay={true} />);
      const spinnerElement = screen.getByTestId('spinner');
      expect(spinnerElement).toHaveClass('overlay');
    });
  
    it('should render a form-group if isOverlay prop is false', () => {
      render(<Loader isOverlay={false} />);
      const spinnerElement = screen.getByTestId('spinner');
      expect(spinnerElement).toHaveClass('form-group');
    });
});
