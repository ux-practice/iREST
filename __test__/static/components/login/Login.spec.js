import React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from '../../../../src/static/history/createBrowserHistory'
import LoginPage from '../../../../src/static/components/login/loginPage'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

const store = mockStore({
  login: {
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

const fakeLocalStorage = (function() {
  let store = {
    token: 'token',
  }

  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key]
    },
    clear: function() {
      store = {}
    },
  }
})()

describe('testing login page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('renders email input correctly', () => {
    renderComponent(<LoginPage />)
    expect(screen.getByTestId('email-input')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-input'), 'test@gmail.com')
    expect(screen.getByTestId('email-input')).toHaveValue('test@gmail.com')
  })

  test('renders password input correctly', () => {
    renderComponent(<LoginPage />)
    expect(screen.getByTestId('email-pass')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-pass'), '123456')
    expect(screen.getByTestId('email-pass')).toHaveValue('123456')
  })

  test('renders Login Button correctly', () => {
    renderComponent(<LoginPage />)
    expect(screen.getByTestId('loginbtn')).toBeTruthy()
    userEvent.type(screen.getByTestId('loginbtn'), 'Login')
    expect(screen.getByTestId('loginbtn')).toHaveValue('Sign In')
  })

  test('test email and password match after button click', async () => {
    act(() => {
      renderComponent(<LoginPage />)
    })
    jest.useFakeTimers()
    expect(screen.getByTestId('email-input')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-input'), 'test@gmail.com')
    expect(screen.getByTestId('email-pass')).toBeTruthy()
    userEvent.type(screen.getByTestId('email-pass'), '123456')
    expect(screen.getByTestId('loginbtn')).toBeTruthy()

    userEvent.click(screen.getByTestId('loginbtn'))
    expect(screen.getByTestId('email-input')).toHaveValue('test@gmail.com')
    expect(screen.getByTestId('email-pass')).toHaveValue('123456')
    expect(screen.queryByTestId('Counter')).toBeTruthy()
    jest.advanceTimersByTime(5000)
    expect(screen.queryByTestId('Counter')).toBeTruthy()
    jest.useRealTimers()
    expect(store.getActions()).toEqual([
      {
        type: 'LOGIN_USER',
        user: {email: 'test@gmail.com', password: '123456'},
      },
    ])
  })

  test('should be a link that have href value', () => {
    renderComponent(<LoginPage />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/register')
  })

  test('renders counter text correctly', () => {
    renderComponent(<LoginPage />)
    expect(screen.getByTestId('Counter')).toBeTruthy()
    userEvent.type(screen.getByTestId('Counter'), 'Welcome')
    expect(screen.getByTestId('Counter'))
  })

  test('testing component if token is present', () => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    })
    renderComponent(<LoginPage />)
    expect(screen.queryByTestId('email-input')).toBeFalsy()
    expect(screen.queryByTestId('email-pass')).toBeFalsy()
    expect(screen.queryByTestId('loginbtn')).toBeFalsy()
  })
})
