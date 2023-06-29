import React from 'react'

function JsonValidErrorView(props) {
    const {jsonEditorError, text, methodType, isJson} = props
    const [isJsonError, setIsJsonError] = React.useState(jsonEditorError)
    React.useEffect(() => {
      setIsJsonError(!isJson(text))
    }, [text])

    return (<>
          {
            (isJsonError && text !== "") && (
              <div 
              className={`input-feedback text-danger ${methodType}`} 
              id="input-error-body"
              >
                Please provide valid json response
              </div>
            )}
        </>
    )
}

export default React.memo(JsonValidErrorView)