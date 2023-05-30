import React from 'react'
import Modal from 'react-modal'
import MocklistWrapper from './MocklistWrapper'
import './style.css'
import '../../assets/styles/style.css'
import preview_close from '../../assets/images/iRest_files/preview_close_button.svg'

function ModalShow(props) {
  const onClose = () => {
    props.closeRequest(false)
  }

  if (props.urlShowTo) {
    window.location.hash = props.urlShowTo
  }

  return (
    props.urlShowTo && (
      <Modal isOpen={props.isOpen} ariaHideApp={false} className="rapidoc-modal">
        <span className="rapidoc-close-try">
          <span onClick={() => onClose()} data-testid="closeButton">
            <img src={preview_close} alt="preview_close_button" className="preview-close-button" />
          </span>
        </span>
        <MocklistWrapper />
      </Modal>
    )
  )
}

export default ModalShow
