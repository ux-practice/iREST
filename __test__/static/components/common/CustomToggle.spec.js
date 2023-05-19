import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CustomToggle from '../../../../src/static/components/common/CustomToggle'

const renderComponent = ui => {
  render(ui)
}

describe('testing CustomToggle Component', () => {
  let realUseContext
  let useContextMock
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    realUseContext = React.useContext
    useContextMock = React.useContext = jest.fn()
  })

  afterEach(() => {
    React.useContext = realUseContext
  })

  test('renders CustomToggle with same event key', () => {
    const children = []
    const eventKey = 'a'
    const callback = jest.fn()
    useContextMock.mockReturnValue('a')
    renderComponent(<CustomToggle children={children} eventKey={eventKey} callback={callback} />)
    expect(screen.getByRole('img')).toBeTruthy()
  })

  test('renders CustomToggle with different event key', () => {
    const children = []
    const eventKey = 'a'
    const callback = jest.fn()
    useContextMock.mockReturnValue('b')
    renderComponent(<CustomToggle children={children} eventKey={eventKey} callback={callback} />)
    expect(screen.getByRole('img')).toBeTruthy()
  })
})
