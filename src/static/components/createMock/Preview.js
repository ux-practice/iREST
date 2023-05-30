import React, {useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import PreviewWrapper from './PreviewWrapper'
import './style.css'
import '../../assets/styles/style.css'
import preview_close from '../../assets/images/iRest_files/preview_close_button.svg'
import Loader from '../common/Loader'

function Preview(props) {
  const [data, setData] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (props.createPreviewMock?.response?.mockResponse) {
      setData(props.createPreviewMock?.response)
    }
    if (props.isPending) {
      setIsLoading(true)
    }
    else if (!props.isPending) {
      setIsLoading(false)
    }
  }, [props.createPreviewMock?.response?.mockResponse, props.isPending])

  window.location.hash = ''
  return (
    <div>
     {isLoading ? (<Loader isOverlay />):( <Modal show={props.modalOpen} onHide={() => props.setModalOpen(false)} data-testId="previewmodal">
        <Modal.Body className="modalBody">
          <div className="rapidoc-modal">
            <PreviewWrapper mock={data} method={props?.values?.allowedMethods.length>0 ? props?.values.allowedMethods : ['GET']} statusCode={props?.statusCode} />
          </div>
        </Modal.Body>
        <span className="rapidoc-close-btn">
          <span
            onClick={() => {
              props.setModalOpen(false)
            }}
          >
            <img src={preview_close} alt="preview_close_button" className="preview-close-button" />
          </span>
        </span>
      </Modal>)}
     
    </div>
  )
}

export default Preview
