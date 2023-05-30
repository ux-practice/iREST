import React from 'react'
import {Spinner} from 'react-bootstrap'

function Loader({isOverlay}) {
    return (
         <div data-testid = 'spinner' className={isOverlay ? "overlay" : "form-group text-center mb-0"} >
            <Spinner animation="border" variant="primary"  />
        </div>
    )
}

export default Loader