import React from 'react'
import AccordionContext from 'react-bootstrap/AccordionContext'
import {useAccordionToggle} from 'react-bootstrap/AccordionToggle'
import './style.css'
import togglePlus from '../../assets/images/iRest_files/toggle_plus.svg'
import toggleMinus from '../../assets/images/iRest_files/toggle_minus.svg'

function CustomToggle({children, eventKey, callback}) {
  const currentEventKey = React.useContext(AccordionContext)
  const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey))
  const isCurrentEventKey = currentEventKey === eventKey
  const processImage = () => {
    if (isCurrentEventKey) {
      return <img src={toggleMinus} className="image-toggle" alt="toggle_minus_button" />
    }
    return <img src={togglePlus} className="image-toggle" alt="toggle_plus_button" />
  }
  return (
    <button type="button" className="custom-toggle" onClick={decoratedOnClick}>
      <div className="content-toggle">
        {processImage()}
        {children}
      </div>
    </button>
  )
}

export default CustomToggle
