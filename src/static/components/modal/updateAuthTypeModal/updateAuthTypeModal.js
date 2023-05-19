import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import {MOCK_TOKEN_AUTEHNTICATION_TYPE} from '../../../../server/constants/schemaDefaults'
import generateToken from '../../../../server/helpers/generateUuidToken'
import '../modalPopup.css'
import deleteIcon from '../../../assets/images/iRest_files/red_trash.png'
import refreshImage from '../../../assets/images/iRest_files/refresh.png'
import Tooltip from '../../common/Tooltip'

function UpdateAuthModal(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '32%',
    },
  }
  
  const [authType, setAuthtype] = useState(props?.mockdata?.authenticationType)
  const [tokenval, setTokenVal] = useState(props?.tokenData)
  const isAuthMockSpecific = authType === MOCK_TOKEN_AUTEHNTICATION_TYPE.MOCK_SPECIFIC
  const tokenLabel = `An arbitrary bearer token required by the ${props?.isMock ? `mock` : `project`} (for private APIs only)`
  const onClose = () => {
    setAuthtype(props?.mockdata?.authenticationType)
    setTokenVal(props?.tokenData)
    props.closeAuthModal(false)
  }

  const onUpdate = () => {
    if (authType !== props?.mockdata?.authenticationType) {
      props.updateMockAuthType({id: props?.mockdata?._id, authenticationType: authType})
    }
    if (isAuthMockSpecific && tokenval !== props?.tokenData) {
      props.updateToken({id: props?.mockdata?._id, token: tokenval})
    }
    if (!props.isMock) {
      props.updateToken({id: props?.projData?._id, token: tokenval}, false)

    }
    props.closeAuthModal(false)
  }

  const changeToken =()=>{
    setTokenVal(generateToken())
  }

  useEffect(() => {
    setAuthtype(props?.mockdata?.authenticationType)
  }, [props?.mockdata])
  
  useEffect(() => {
    setTokenVal(props?.tokenData)
  }, [props?.tokenData])

  return (
    <Modal isOpen={props.isOpen} style={customStyles}>
      <div className="modalContainer">
        <div className="modalDeleteContainer">
          <p>API secret</p>
        </div>
        <div className="paraContainer">
          {props?.isMock && <div className="form-group md-5">
            <label htmlFor="filter" className="filter-label">
              Select Authentication Type
            </label>
            <select
              onChange={e => {
                setAuthtype(e.target.value)
                setTokenVal(props?.tokenData)
              }}
              value={authType}
              className="form-control"
              aria-label="auth-select"
            >
              <option value={MOCK_TOKEN_AUTEHNTICATION_TYPE.PROJECT_SPECIFIC}>Project Specific</option>
              <option value={MOCK_TOKEN_AUTEHNTICATION_TYPE.MOCK_SPECIFIC}>Mock Specific</option>
              <option value={MOCK_TOKEN_AUTEHNTICATION_TYPE.OFF}>Off</option>
            </select>
          </div>}
          {(isAuthMockSpecific || !props?.isMock) && <div className="form-group md-5">
            <label className="filter-label">
              Token
            </label>
            <div className='flex-style'>
            <input
             style={{marginRight:"6px"}}
              className="input-val"
              value={tokenval}
              onChange={e => {
                setTokenVal(e.target.value)
              }}
            />
            <Tooltip content="Autogenerated Token" direction="left">
                <button
                  className='tryme'
                  onClick={changeToken}
                >
                  <img src={refreshImage} alt="togglePlus" />
                </button>
              </Tooltip>
              <Tooltip content="Delete Token" direction="left">
                <button
                  className={props?.tokenData?.length===0 ? 'tryme delete-token-btn' : 'tryme'}
                  disabled={props?.tokenData?.length===0}
                  onClick={()=>props.openTokenDeleteModal(props?.mockdata?._id)}
                >
                  <img src={deleteIcon} alt="delete_icon" />
                </button>
              </Tooltip>
            </div>
            <p className="token-note">{tokenLabel}</p>
          </div>
          }
        </div>
        <div className="modalButtonContainer">
          <button onClick={onClose} className="cancelBtn">
            CANCEL
          </button>
          <button
            onClick={onUpdate}
            className={(authType === props?.mockdata?.authenticationType && tokenval === props?.tokenData) ? 'deleteBtn deleteDisableBtn' : 'deleteBtn'}
            disabled={authType === props?.mockdata?.authenticationType && tokenval === props?.tokenData}
          >
            UPDATE
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateAuthModal