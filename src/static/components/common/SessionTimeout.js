import React, {useRef, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import IdleTimer from 'react-idle-timer'
import history from '../../history/createBrowserHistory'
import SessionTimeoutPopup from './SessionTimeoutPopup'
import {sessionUpdateAction} from '../../actions/sessionUpdate/sessionUpdateAction'
import './style.css'

let countDownInterval
let timeout

const SessionTimeout = props => {
  const [timeoutModalOpen, setModalOpen] = useState(false)
  const [timeoutCountDown, setCountDown] = useState(0)
  const idleTimer = useRef(null)
  const timeoutTime = process.env.SESSION_TIME * 1000

  const clearSessionTimeout = () => {
    clearTimeout(timeout)
  }

  const clearSessionInterval = () => {
    clearInterval(countDownInterval)
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      setModalOpen(false)
      clearSessionInterval()
      clearSessionTimeout()
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleContinue = () => {
    props.sessionUpdateAction()
    setModalOpen(false)
    clearSessionInterval()
    clearSessionTimeout()
  }

  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval()
      clearSessionTimeout()
    }
  }

  const onIdle = () => {
    const delay = 1000
    if (props.isAuthenticated && !timeoutModalOpen) {
      timeout = setTimeout(() => {
        let countDown = 20
        setModalOpen(true)
        setCountDown(countDown)
        countDownInterval = setInterval(() => {
          if (countDown > 0) {
            countDown -= 1
            setCountDown(countDown)
          } else {
            handleLogout()
          }
        }, 1000)
      }, delay)
    }
  }

  useEffect(() => {
    return () => {
      clearSessionInterval()
      clearSessionTimeout()
    }
  }, [])

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={timeoutTime}
      />
      {timeoutModalOpen && (
        <SessionTimeoutPopup
          countdown={timeoutCountDown}
          onContinue={handleContinue}
          onLogout={handleLogout}
          hide={timeoutModalOpen}
        />
      )}
    </>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sessionUpdateAction,
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(SessionTimeout)
