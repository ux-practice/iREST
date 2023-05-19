import React from 'react'
import {render, screen} from '@testing-library/react'
import MocklistWrapper from '../../../../src/static/components/modal/MocklistWrapper'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import {mockModalWrapperResponse} from './mocks'

const mockStore = configureMockStore()

const store = mockStore(mockModalWrapperResponse)

const renderComponent = props => {
  render(
    <Provider store={store}>
      <MocklistWrapper {...props} />
    </Provider>
  )
}

describe('testing MocklistWrapper Component', () => {
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

  test('Should render the MocklistWrapper component', () => {
    renderComponent()
    expect(screen.getByTestId('rapidocflow')).toBeTruthy()
    expect(screen.getByTestId('rapidocflow').getAttribute('style')).toEqual("height: 100vh; width: 100%;")
    expect(screen.getByTestId('rapidocflow').getAttribute('theme')).toEqual('light')
  })
})
