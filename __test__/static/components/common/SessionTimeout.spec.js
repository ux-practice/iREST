import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SessionTimeout from '../../../../src/static/components/common/SessionTimeout';

const mockStore = configureStore([]);

describe('SessionTimeout', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      isAuthenticated: true,
    });

    component = render(
      <Provider store={store}>
        <SessionTimeout />
      </Provider>
    );
  });

  it('renders the sessionTimeout component', () => {
    expect(component).toBeTruthy();
  }); 
});
