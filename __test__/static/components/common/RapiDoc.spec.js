import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Rapidoc from '../../../../src/static/components/common/RapiDoc'

describe('testing Rapidoc Component', () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  const props = {
    style: {height: '100vh', width: '100%'},
    data: {},
    renderStyle: 'focus',
    showHeader: false,
    showInfo: false,
    allowAuthentication: false,
    allowAdvancedSearch: false,
    allowSpecFileLoad: false,
    allowSearch: false,
    usePathInNavBar: false,
  }
  const defaultProps = {
    style: null,
    data: {},
    renderStyle: null,
    showHeader: null,
    showInfo: null,
    allowAuthentication: null,
    allowAdvancedSearch: null,
    allowSpecFileLoad: null,
    allowSearch: null,
    usePathInNavBar: null
  }
  const newProps = {
    style: null,
    data: {},
  }
  it('Should render the component', () => {
    render(<Rapidoc {...props} />)
    expect(screen.getByTestId('rapidocflow').getAttribute('style')).toEqual("height: 100vh; width: 100%;")
    expect(screen.getByTestId('rapidocflow').getAttribute('render-style')).toEqual('focus')
    expect(screen.getByTestId('rapidocflow').getAttribute('show-header')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('show-info')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-authentication')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-advanced-search')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-spec-file-load')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-search')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('use-path-in-nav-bar')).toBe("false")
  })
  it('Should render the component with missing props', () => {
    render(<Rapidoc {...defaultProps} />)
    expect(screen.getByTestId('rapidocflow').getAttribute('style')).toEqual("height: 100vh; width: 100%;")
    expect(screen.getByTestId('rapidocflow').getAttribute('render-style')).toBe('read')
    expect(screen.getByTestId('rapidocflow').getAttribute('show-header')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('show-info')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-authentication')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-advanced-search')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-spec-file-load')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-search')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('use-path-in-nav-bar')).toBe("false")
  })
  it('Should render the component with undefined props', () => {
    render(<Rapidoc {...newProps} />)
    expect(screen.getByTestId('rapidocflow').getAttribute('style')).toEqual("height: 100vh; width: 100%;")
    expect(screen.getByTestId('rapidocflow').getAttribute('render-style')).toBe('read')
    expect(screen.getByTestId('rapidocflow').getAttribute('show-header')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('show-info')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-authentication')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-advanced-search')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-spec-file-load')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('allow-search')).toBe("true")
    expect(screen.getByTestId('rapidocflow').getAttribute('use-path-in-nav-bar')).toBe("true")
  })
})
