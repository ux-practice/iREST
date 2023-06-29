import React from 'react'

const SessionTimeoutPopup = ({countdown, onLogout, onContinue}) => {
const text = `The current session is about to expire in ${countdown} seconds.`

  return <div className='modalStyle'>
    <p className='paraStyle'>{text}</p>
    <div className='flexStyle'>
      <button className='btnStyle' onClick={onLogout}>Logout</button>
      <button className='btnStyle continueBtn' onClick={onContinue}>Continue</button>
    </div>
  </div>
}

export default SessionTimeoutPopup