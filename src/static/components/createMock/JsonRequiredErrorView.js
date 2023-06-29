import React from 'react'

function areEqual(prevProps, nextProps) {
  return prevProps.text === nextProps.text
}

function JsonRequiredErrorView(props) {
    const {text, methodType, isJson} = props
    return (<>
        {
            (!isJson(text) && text === "") && (
                <div className="input-feedback text-danger" id="input-error-body">
                    {methodType} Response Schema is required
                </div>
            )
        }
    </>)
}

export default React.memo(JsonRequiredErrorView, areEqual)