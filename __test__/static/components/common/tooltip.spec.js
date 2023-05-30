import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Tooltip from '../../../../src/static/components/common/Tooltip';

describe('Tooltip component', () => {
  test('should show the tooltip', () => {
    render(
      <Tooltip  />
    );
    const tooltip = screen.getByTestId('tooltip-tip');
    fireEvent.mouseEnter(tooltip);
    expect(tooltip).toBeInTheDocument();
  });

  test('should render correct direction', async() => {
    const direction = 'bottom';
     render(
      <Tooltip direction={direction}/>
    );
    const tooltipWrapper = screen.getByTestId('tooltip-tip');
    expect(tooltipWrapper).toHaveClass('Tooltip-Wrapper');
    fireEvent.mouseEnter(tooltipWrapper);
    await waitFor(() => {    
      expect(tooltipWrapper.querySelector('.Tooltip-Tip')).toHaveClass('bottom');
    });
  });

  test('should render when mouse leave', () => {
    render(
      <Tooltip/>
    );
    const tooltipWrapper = screen.getByTestId('tooltip-tip');
    fireEvent.mouseLeave(tooltipWrapper);
    expect(tooltipWrapper).toHaveClass('Tooltip-Wrapper');
  });
  
});
