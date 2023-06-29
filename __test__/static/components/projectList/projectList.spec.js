import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import ProjectListPage from "../../../../src/static/components/projectList/index";
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { Router } from 'react-router-dom';
import history from '../../../../src/static/history/createBrowserHistory'
import '@testing-library/jest-dom/extend-expect'


const mockStore = configureMockStore()

const store = mockStore({
    setFieldValue: jest.fn(),
    createMock: {
      response: {},
    },
    saveReference: '',
    mockList: {
      response: {
        message: 'Mock List',
        status: 200,
        type: 'MOCK_LIST_SUCCESS',
        data: {
          totalMocks: 1,
          mockList: [
            {
              serviceResponseType: 'default',
              method: 'GET',
              statusCode: '200',
              mockStatus: 'enabled',
              _id: '6232e060d70def3b6c16dc55',
              projectId: '6232dfc2d70def3b6c16dc4d',
              projectName: 'ad',
              endpoint: 'http://localhost:9000/api/rest/ad/uddeshya',
              mockName: 'uddeshya',
              allowedMethods: ['get'],
            },
          ],
        },
      },
    },
    fileUpload: {response: {}},
    projectList: {response: {data: 
      {projectList: 
        [
          {User: {name: 'test', status: 'enabled'},
          authenticationType: false,
        count: 1,
      status: 'enabled',
      projectName: 'testproject'},
      {User: {name: 'testuser', status: 'enabled'},
          authenticationType: false,
        count: 1,
      status: 'enabled',
      projectName: 'xyz'
    },
        ]

    }}},
    mockListAction: () => {},
    fetchListById: () => {},
    flushMockData: () => {},
    createMockAction: () => {},
   fetchToken: [],
   updateAuthType: {
    isPending:false,
    response:[]
   },
   updateToken: []
    
})

describe('Project List compoenet', () => {

    it('should render projectList component',() =>{
        render(
        <Router history={history}>
         <Provider store={store}>
        <ProjectListPage/>
        </Provider>
        </Router>)

    expect(screen.getByText(/Project Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Count/i)).toBeInTheDocument();
    expect(screen.getByText(/Created By/i)).toBeInTheDocument();
    expect(screen.getByText(/Updated At/i)).toBeInTheDocument();
    expect(screen.getByText(/Authentication/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
    })


    it('calls handleClickSearch when Search button is clicked', async() => {
       render(
        <Router history={history}>
        <Provider store={store}>
       <ProjectListPage/>
       </Provider>
       </Router> 
      );
  
      const searchInput = screen.getByPlaceholderText('Search');
      const searchButton = screen.getByText('Search');
  
      fireEvent.change(searchInput, { target: { value: 'testproject' } });
      fireEvent.click(searchButton);
      expect(screen.getAllByRole("row")).toHaveLength(2);

    });

    it("renders the component without project list", () => {
      render(
        <Router history={history}>
        <Provider store={store}>
       <ProjectListPage
        />
        </Provider>
       </Router> 
      );
      
      const searchInput = screen.getByPlaceholderText('Search');
      const searchButton = screen.getByText('Search');
  
      fireEvent.change(searchInput, { target: { value: 'user' } });
      fireEvent.click(searchButton);
      expect(screen.getByText("No projects found.")).toBeInTheDocument();
    });

    it("clears the searched text on click of reset", () => {
      render(
        <Router history={history}>
        <Provider store={store}>
       <ProjectListPage
        />
        </Provider>
       </Router> 
      );
      
      const searchInput = screen.getByPlaceholderText('Search'); 
      fireEvent.change(searchInput, { target: { value: 'user' } });
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      const updatedSearchInput = screen.getByPlaceholderText('Search');
      expect(updatedSearchInput).toHaveValue('');
    });
   
})