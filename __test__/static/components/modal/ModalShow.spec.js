import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import ModalShow from '../../../../src/static/components/modal/ModalShow'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import {mockModalResponse} from './mocks'

const mockStore = configureMockStore()

const store = mockStore(mockModalResponse)

const defaultProps = {
  urlShowTo: 'modal',
  isOpen: false,
  closeRequest: jest.fn(x => x),
}
const newProps = {
  urlShowTo: 'modal',
  isOpen: true,
  closeRequest: jest.fn(x => x),
}
const oldProps = {
  urlShowTo: '',
  isOpen: true,
  closeRequest: jest.fn(x => x),
}

const renderComponent = props => {
  render(
    <Provider store={store}>
      <ModalShow {...props} />
    </Provider>
  )
}

describe('testing ModalShow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()

    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  test('Should render the component', () => {
    renderComponent(defaultProps)
    expect(screen.queryByTestId('closeButton')).toBeFalsy()
  })
  test('Should render the component when modal is open', () => {
    renderComponent(newProps)
    expect(screen.getByTestId('closeButton')).toBeTruthy()
    const btn = screen.getByTestId('closeButton')
    fireEvent.click(btn)
    expect(newProps.closeRequest).toBeCalledTimes(1)
  })
  test('Should render the component when urlToShow is empty', () => {
    renderComponent(oldProps)
    expect(screen.queryByTestId('closeButton')).toBeFalsy()
  })
})
