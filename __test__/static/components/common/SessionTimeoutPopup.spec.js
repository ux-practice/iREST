import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SessionTimeoutPopup from '../../../../src/static/components/common/SessionTimeoutPopup'

const renderComponent = ui => {
  render(ui)
}

describe('testing SessionTimeoutPopup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('renders SessionTimeoutPopup screen and test onLogout button', () => {
    const countdown = 9
    const onLogout = jest.fn()
    const onContinue = jest.fn()
    renderComponent(
      <SessionTimeoutPopup countdown={countdown} onLogout={onLogout} onContinue={onContinue} />
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(onLogout).toBeCalledTimes(1)
  })

  test('renders SessionTimeoutPopup screen and test onContinue button', () => {
    const countdown = 9
    const onLogout = jest.fn()
    const onContinue = jest.fn()
    renderComponent(
      <SessionTimeoutPopup countdown={countdown} onLogout={onLogout} onContinue={onContinue} />
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1])
    expect(onContinue).toBeCalledTimes(1)
  })
})
