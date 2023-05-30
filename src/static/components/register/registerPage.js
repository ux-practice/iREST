import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {registerUserAction} from '../../actions/register/authenticationActions'
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/styles/style.css'
import img from '../../assets/images/iRest_files/irest_logo.png'

const RegisterPage = props => {
  const initialValue = {name: '', email: '', password: ''}
  const [user, setUser] = useState(initialValue)
  const [error, setError] = useState(initialValue)
  
  const validator = (name, event) => {

    if (name === 'password') {
      const {value} = event.target
      if (value.length === 0) {
        return setError({...error, [name]: 'This field is Required'})
      }
      if (value.length < 3) {
        return setError({...error, [name]: 'Password atlest have 3 characters'})
      }
      if (value.length > 30) {
        return setError({...error, [name]: 'Password should not have more than 12 characters'})
      }
      return setError({...error, [name]: ''})
    }

  }
  const inputChangeHandler = name => event => {
    setUser({...user, [name]: event.target.value})
    validator(name, event)
  }

  const registerHandler = event => {
    event.preventDefault()
    if (error.name || error.email || error.password) return null
    if (!user.name || !user.email || !user.password) return
    props.dispatch(registerUserAction(user))
  }


  return (
    <div id="login">
      <div className="login-background col-xs-12 col-sm-8 col-md-6 col-lg-5">
        <img src={img} alt="sample_logo" className="rest_logo" />
      </div>
      <div className="login-width col-xs-12 col-sm-8 col-md-6 col-lg-7">
        <div id="login-column w-100">
          <div id="login-box">
            <form id="login-form" className="form" onSubmit={registerHandler}>
              <div className="login-header">
                <h4 className="">Sign in to your iRest account</h4>
              </div>
              <br />
              <div className="form-group">
                <label className="details-label">Enter your details to proceed further</label>
                <br />
                <br />
                <label htmlFor="email" className="email-label">
                  Name
                </label>
                <br />
                <input
                  data-testid="name-input"
                  type="text"
                  name="text"
                  id="Fullname"
                  className="form-control"
                  value={user.name}
                  required
                  onChange={inputChangeHandler('name')}
                />
              </div>
              <div className="form-group">
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
                {error.password ? <div className='password-error'>{error.password}</div>: null}
              </div>
              <br />
              <div className="form-group text-center mb-0 button-container">
                <input
                  data-testid="registerbtn"
                  type="submit"
                  name="submit"
                  className="btn btn-info btn-md login-btn"
                  value="Create Account"
                />
                <Link to="/">
                  <input
                    type="button"
                    className="btn btn-info btn-md create-account-btn"
                    value="Sign In"
                  />
                </Link>
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

export default connect(null)(RegisterPage)
