import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import PrivateRoute from '../containers/privateRoute'

import LoginPage from '../components/login/loginPage'
import MockDashboard from '../components/mockList'
import history from '../history/createBrowserHistory'
import CreateMock from '../components/createMock/CreateMockForm'

import {
  HomePageUrl,
  DashboardUrl,
  createMockUrl,
  EditMockUrl,
  RegisterPageUrl,
  ProjectListPageUrl,
} from '../constants/url'
import registerPage from '../components/register/registerPage'
import ProjectListPage from '../components/projectList'

const Routers = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={HomePageUrl} component={LoginPage} />
        <Route path={RegisterPageUrl} component={registerPage} />
        <PrivateRoute path={DashboardUrl} component={MockDashboard} />
        <PrivateRoute path={createMockUrl} component={CreateMock} />
        <PrivateRoute path={`${EditMockUrl}/:mockId`} component={CreateMock} />
        <PrivateRoute path={ProjectListPageUrl} component={ProjectListPage} />
      </Switch>
    </Router>
  )
}

export default Routers
