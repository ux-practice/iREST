import React from 'react'
import Modal from 'react-modal'
import './modalPopup.css'
import img from '../../assets/images/iRest_files/black_trash.png'

function ModalPopup(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '32%',
      height: '35%',
    },
  }

  const onClose = () => {
    props.closeDeleteModal(false, false)
  }

  const onDelete = () => {
    props.closeDeleteModal(false, true)
  }

  return (
    <Modal isOpen={props.isOpen} style={customStyles} ariaHideApp="false">
      <div className="modalContainer">
        <div className="modalDeleteContainer">
          <img src={img} alt="trash" className="trashImage" />
          <p>Delete</p>
        </div>
        <div className="paraContainer">
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="modalButtonContainer">
          <button onClick={onClose} className="cancelBtn">
            CANCEL
          </button>
          <button onClick={onDelete} className="deleteBtn">
            DELETE
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalPopup
