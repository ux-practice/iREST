import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect'
import PrivateRoute from '../../../src/static/containers/privateRoute';

describe('PrivateRoute', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = {
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {},
    };
    localStorage.clear();
  });

  test('renders the component when user is authenticated', () => {
    localStorage.setItem('token', '123');
    const DummyComponent = () => <div>Dummy Component</div>;
    const history = createMemoryHistory();
    render(
      <Provider store={mockStore}>
        <Router history={history} location={{ pathname: '/dummy' }}>
          <PrivateRoute component={DummyComponent} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Dummy Component')).toBeInTheDocument();
  });

  test('redirects to home page when user is not authenticated', () => {
    localStorage.clear();
    const DummyComponent = () => <div>Dummy Component</div>;
    const history = createMemoryHistory();
    render(
      <Provider store={mockStore}>
        <Router history={history} location={{ pathname: '/dummy' }}>
          <PrivateRoute component={DummyComponent} />
        </Router>
      </Provider>
    );
    expect(screen.queryByText('Dummy Component')).not.toBeInTheDocument();
  });
});
