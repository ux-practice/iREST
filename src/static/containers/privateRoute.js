import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import {HomePageUrl} from '../constants/url'
import SessionTimeout from '../components/common/SessionTimeout'

const PrivateRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token')

  return (
    <>
      {!isEmpty(token) && <SessionTimeout isAuthenticated={!isEmpty(token)} />}
      <Route
        {...rest}
        render={props => {
          if (!isEmpty(token)) {
            return <Component {...props} />
          }
          return <Redirect to={HomePageUrl} />
        }}
      />
    </>
  )
}

export default PrivateRoute
