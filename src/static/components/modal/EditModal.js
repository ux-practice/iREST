import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import './modalPopup.css'

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
      height: '45%',
    },
  }

  const [projectName, setProjectName] = useState(props?.projectName)

  const onClose = () => {
    props.closeDeleteModal(false, false)
  }

  const onDelete = () => {
    props.closeDeleteModal(false, true)
  }

  useEffect(() => {
    setProjectName(props?.projectName)
  }, [props?.projectName])

  return (
    <Modal isOpen={props.isOpen} style={customStyles}>
      <div className="modalContainer">
        <div className="modalDeleteContainer">
          <p>Edit</p>
        </div>
        <div className="paraContainer">
          <input
            value={projectName}
            onChange={e => {
              setProjectName(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""))
              props.setProjectNameProp(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""))
            }}
          />
          {projectName.length === 0 && (
            <p className="project-error-text">Project name is required</p>
          )}
        </div>
        <div className="modalButtonContainer">
          <button onClick={onClose} className="cancelBtn">
            CANCEL
          </button>
          <button
            onClick={onDelete}
            className={projectName.length === 0 ? 'deleteBtn deleteDisableBtn' : 'deleteBtn'}
            disabled={projectName.length === 0}
          >
            UPDATE
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalPopup
