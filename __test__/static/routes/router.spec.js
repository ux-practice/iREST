import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import configureMockStore from 'redux-mock-store'
import Routers from '../../../src/static/routes/router';
import {Provider} from 'react-redux'

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

describe('Routers', () => {
  test('renders the correct routes', () => {
    const history = createMemoryHistory()
    const { getByText } = render(
      <Provider store={store} >
      <Router history={history}> 
        <Routers />
      </Router>
      </Provider>
    )
  
    expect(getByText('Sign in to your iRest account')).toBeInTheDocument()
  })
})
