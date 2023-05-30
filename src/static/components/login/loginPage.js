import React, {useState, useEffect} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {RegisterPageUrl, DashboardUrl} from '../../constants/url'
import {loginUserAction} from '../../actions/login/authenticationActions'
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/styles/style.css'
import img from '../../assets/images/iRest_files/irest_logo.png'

const LoginPage = props => {
  const token = localStorage.getItem('token')
  const counter = useSelector(state => {
    if (state?.login?.response?.data) {
      localStorage.name = state.login.response.data.name
    }
    return state.login.response
  })
  const initialValue = {email: '', password: ''}
  const [user, setUser] = useState(initialValue)

  const [loginClick, setLoginClick] = useState(false)
  const {userState} = props

  useEffect(() => {
    setLoginClick(false)
  }, [userState])

  const inputChangeHandler = name => event => {
    setUser({...user, [name]: event.target.value})
    if (counter) {
      counter.message = ''
    }
  }

  const loginHandler = event => {
    event.preventDefault()
    if (!user.email || !user.password) return
    setLoginClick(true)
    setTimeout(() => {
      props.dispatch(loginUserAction(user))
      setUser(initialValue)
    }, 500)
  }

  const flashMessage = () => {
    setTimeout(() => {
      if (document.getElementById('hide')) {
        document.getElementById('hide').style.display = 'none'
      }
    }, 1000)
  }

  if (token) {
    return <Redirect to={DashboardUrl} />
  }

  return (
    <div id="login">
      <div className="login-background col-xs-12 col-sm-8 col-md-6 col-lg-5">
        <img src={img} alt="sample_logo" className="rest_logo" />
      </div>
      <div className="login-width col-xs-12 col-sm-8 col-md-6 col-lg-7">
        <div id="login-column w-100">
          <div id="login-box">
            <form id="login-form" className="form" onSubmit={loginHandler}>
              <div className="login-header">
                <h4 className="">Sign in to your iRest account</h4>
              </div>
              <br />
              <div className="form-group">
                <label className="details-label">Enter your details to proceed further</label>
                <br />
                <br />
                <label htmlFor="email" className="email-label">
                  Email
                </label>
                <br />
                <input
                  data-testid="email-input"
                  type="email"
                  name="email"
                  id="Email"
                  className="form-control"
                  value={user.email}
                  required
                  onChange={inputChangeHandler('email')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="password-label">
                  Password
                </label>
                <br />
                <input
                  data-testid="email-pass"
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={user.password}
                  required
                  onChange={inputChangeHandler('password')}
                />
              </div>
              <div className="text-danger text-center" id="hide" data-testid="Counter">
                {counter?.message ? flashMessage() : ' '}
              </div>
              <br />
              <div className="form-group text-center mb-0 button-container">
                <input
                  data-testid="loginbtn"
                  type="submit"
                  name="submit"
                  className="btn btn-info btn-md login-btn"
                  value="Sign In"
                />
                <Link to={RegisterPageUrl}>
                  <input
                    type="button"
                    className="btn btn-info btn-md create-account-btn"
                    value="Create Account"
                  />
                </Link>
              </div>
              <br />
              <div className="form-group text-center mb-0">
                {loginClick && userState?.response?.status !== 200 && (
                  <div className="spinner-border text-primary" />
                )}
              </div>
            </form>
          </div>
          <div className="copyright-container">
            <p className="copyright-label">Copyright &copy;2022 Impetus, All rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userState: state.login,
})

export default connect(mapStateToProps, null)(LoginPage)
