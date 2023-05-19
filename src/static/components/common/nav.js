import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import history from '../../history/createBrowserHistory'
import './style.css'
import logo from '../../assets/images/iRest_files/irest_logo_icon.png'
import hamburgerMenu from '../../assets/images/iRest_files/nav_bar_ham.svg'
import closeButton from '../../assets/images/iRest_files/close_button.svg'
import {FirstPageUrl, SidebarData} from '../../constants/url'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {sidebar: false}
    this.box = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick)
  }

  handleOutsideClick = event => {
    if (
      this.state.sidebar &&
      this.box &&
      !this.box.current?.contains(event.target) &&
      event.target.className !== 'navbar-hamburger'
    ) {
      if (this.state.sidebar) this.showSidebar()
    }
  }

  showSidebar = () => {
    this.setState(prevState => ({...prevState, sidebar: !prevState.sidebar}))
  }

  handleLogoutUser = e => {
    this.handleLogout(e)
    this.props.handleClearUser()
  }

  handleLogout = e => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    history.push(FirstPageUrl)
  }

  displayShortName = name => {
    let newName = ''
    if (name === null || name === '') {
      newName = ''
    } else {
      const updatedName = name
        .split(' ')
        .map(e => e[0])
        .join('')
      newName = updatedName
    }
    return newName
  }

  render() {
    const {pageTitle, link} = this.props

    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-md navbar-dark d-flex navbar-custom">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="#" className="menu-bars">
            <img
              src={hamburgerMenu}
              alt="sample_menu"
              className="navbar-hamburger"
              onClick={this.showSidebar}
            />
          </Link>
          <img src={logo} alt="header_sample_logo_icon" className="navbar-brand navbar-logo" />
          <a className="navbar-brand" href={link}>
            {pageTitle}
          </a>
          <div className="navbar-nav ml-auto">
            <div className="dropdown">
              <div className="dropdown-container">
                <div className="profile-dot">
                  {this.displayShortName(localStorage.getItem('name'))}
                </div>
                <div className="dropbtn">{localStorage.getItem('name')}</div>
                <div className="arrow-down" />
              </div>
              <div className="dropdown-content">
                <a onClick={e => this.handleLogoutUser(e)} href="#!">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </nav>
        <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'} ref={this.box}>
          <ul className="nav-menu-items" onClick={this.showSidebar}>
            <li className="navbar-toggle">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="#" className="menu-bars">
                <img src={closeButton} alt="sample_logo_icon" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink
                    to={item.path}
                    className={isActive => (isActive ? 'nav-active-link' : 'nav-inactive-link')}
                  >
                    <span className='nav-title'>{item.title}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default Nav
