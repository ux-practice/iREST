import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from '../../../../src/static/history/createBrowserHistory'
import RegisterPage from '../../../../src/static/components/register/registerPage'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

const store = mockStore({
  register: {
    response: {
      data: {
        _id: 0,
        name: 'name',
        email: 'abc@impetus.com',
      },
      message: 'Authorization successful',
    },
  },
})

const renderComponent = ui => {
  render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>
  )
}

describe('testing register page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('renders name input correctly', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('name-input')).toBeTruthy()
    userEvent.type(screen.getByTestId('name-input'), 'person')
    expect(screen.getByTestId('name-input')).toHaveValue('person')
  })

  test('renders email input correctly', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('email-input')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-input'), 'test@gmail.com')
    expect(screen.getByTestId('email-input')).toHaveValue('test@gmail.com')
  })

  test('renders password input correctly', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('email-pass')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-pass'), '123456')
    expect(screen.getByTestId('email-pass')).toHaveValue('123456')
  })

  test('renders password input correctly with zero length', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('email-pass')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-pass'), '123')
    expect(screen.getByTestId('email-pass')).toHaveValue('123')
    fireEvent.change(screen.getByTestId('email-pass'), {target: {value: ''}})
    userEvent.click(screen.getByTestId('registerbtn'))
    expect(screen.getByText('This field is Required')).toBeTruthy()
  })

  test('renders password input correctly more than 30', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('email-pass')).toBeTruthy()
    userEvent.type(
      screen.getByTestId('email-pass'),
      '6357863276378563825879326587326587623876582365632875'
    )
    expect(screen.getByTestId('email-pass')).toHaveValue(
      '6357863276378563825879326587326587623876582365632875'
    )
  })

  test('renders Register Button correctly', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('registerbtn')).toBeTruthy()
    userEvent.click(screen.getByTestId('registerbtn'), 'Register')
    expect(screen.getByTestId('registerbtn')).toHaveValue('Create Account')
  })

  test('test email and password match after button click', () => {
    renderComponent(<RegisterPage />)
    expect(screen.getByTestId('name-input')).toBeTruthy()
    userEvent.type(screen.getByTestId('name-input'), 'person')
    expect(screen.getByTestId('email-input')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-input'), 'test@gmail.com')
    expect(screen.getByTestId('email-pass')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-pass'), '123456')
    expect(screen.getByTestId('registerbtn')).toBeTruthy()
    userEvent.click(screen.getByTestId('registerbtn'))
    expect(screen.getByTestId('name-input')).toHaveValue('person')
    expect(screen.getByTestId('email-input')).toHaveValue('test@gmail.com')
    expect(screen.getByTestId('email-pass')).toHaveValue('123456')
    expect(store.getActions()).toEqual([
      {
        type: 'REGISTER_USER',
        user: {name: 'person', email: 'test@gmail.com', password: '123456'},
      },
    ])
  })

  test('should be a link that have href value', () => {
    renderComponent(<RegisterPage />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/')
  })
})
