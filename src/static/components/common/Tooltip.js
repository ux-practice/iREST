import React, {useState} from 'react'
import './style.css'

const Tooltip = props => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay || 400)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div className="Tooltip-Wrapper" data-testid="tooltip-tip" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && <div className={`Tooltip-Tip ${props.direction || 'top'}`} >{props.content}</div>}
    </div>
  )
}

export default Tooltip
