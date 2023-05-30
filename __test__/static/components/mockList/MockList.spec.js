import React from 'react'
import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import {Router} from 'react-router-dom'
import MockList from '../../../../src/static/components/mockList/index'
import history from '../../../../src/static/history/createBrowserHistory'
import userEvent from '@testing-library/user-event'

const mockStore = configureMockStore()
const store1 = mockStore({
  mockList: {
    response: {
      data: {
        mockList: [
          {
            serviceResponseType: 'default',
            method: 'GET',
            statusCode: '200',
            mockStatus: 'disabled',
            _id: '61cc48f53316ee131c9ea14b',
            projectId: '61cc48da3316ee131c9ea14a',
            endpoint: 'http://localhost:9000/api/rest/test_test_52/save_test_99',
            mockName: 'test-mock',
            projectName: 'test_test_52',
            allowedMethods: ['get', 'post'],
          },
        ],
      },
    },
  },
  mockStatus: {
    response: {
      data: {
        mock: {
          status: 'enabled',
          serviceResponseType: 'default',
          path: '/rest',
          method: 'GET',
          statusCode: '200',
          isDelay: false,
          contentEncoding: 'UTF-8',
          contentType: 'Text/Plain',
          mockStatus: 'enabled',
          isDynamicResponse: false,
          _id: '61cc48f53316ee131c9ea14b',
          projectId: '61cc48da3316ee131c9ea14a',
          userId: '5f9c18dd053cb11a5770c76e',
          endpoint: 'test_test_52/save_test_99',
          headers: [
            {
              _id: '61cc48f53316ee131c9ea14b',
              key: 'custom1',
              value: 'value1',
            },
          ],
          params: [],
          mockName: 'test-mock',
          projectName: 'test_test_52',
          endpointRequestPath: 'save_test_99',
          createdAt: '2021-12-29T11:39:33.483Z',
          updatedAt: '2022-01-03T12:01:35.012Z',
          __v: 0,
          dynamicImportSize: 1024,
          dynamicResponseKey: '["employees"]',
          dynamicResponseRandom: true,
          isDynamicImportSize: true,
          dynamicImportCount: 100,
          dynamicResponseSpecific: true,
          dynamicResponseSpecificKeyValue: '{"name":"Shyam", "email":"shyamjaiswal@gmail.com"}  \n',
          isDynamicImportCount: true,
        },
      },
    },
  },
  projectList: {response: {}},
  updateAuthType: {
    response: {},
  },
  deleteMock: {isPending: false},
  fetchToken: {response: {}},
  login: {response: {data: {_id: 1}}},
  mockListAction: () => {},
  mockStatusAction: () => {},
})

const renderTestedComponent1 = () => {
  const location = {
    search: jest.fn(),
  }
  return render(
    <Provider store={store1}>
      <Router history={history}>
        <MockList location={location} />
      </Router>
    </Provider>
  )
}

describe('test TestedComponent components', () => {
  it('should be render the component correctly', () => {
    const {container} = renderTestedComponent1()
    expect(container).toBeInTheDocument()
  })

  it('renders mockstatus change', () => {
    const location = {
      search: jest.fn(),
    }
    render(
      <Provider store={store1}>
        <Router history={history}>
          <MockList location={location} />
        </Router>
      </Provider>
    )
    waitFor(() => expect(screen.getByTestId('mockStatusId')).toBeInTheDocument())
    userEvent.type(screen.getByTestId('mockStatusId'), 'Shrija Shweeta')
    expect(screen.getByTestId('mockStatusId')).toBeChecked()
  })

  it("clears the searched text on click of reset", () => {
    render(
      <Provider store={store1}>
        <Router history={history}>
          <MockList location={location} />
        </Router>
      </Provider>
    );
    
    const searchInput = screen.getByPlaceholderText('Search'); 
    fireEvent.change(searchInput, { target: { value: 'user' } });
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    const updatedSearchInput = screen.getByPlaceholderText('Search');
    expect(updatedSearchInput).toHaveValue('');
  });
})
