import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import CustomToggle from '../common/CustomToggle'
import Tooltip from '../common/Tooltip'
import TreeStructure from '../common/TreeStructure'
import JsonEditor from './JsonEditor'
import clipboard from '../../assets/images/iRest_files/clipboard.svg'
import {fakerObj} from '../../constants/createMockConstants'
import JsonValidErrorView from './JsonValidErrorView'
import JsonRequiredErrorView from './JsonRequiredErrorView'

const JsonView = props => {

    const {
            values,
            uploadFileForJSON,
            handleChange,
            text,
            mode,
            modes,
            onChangeText,
            onModeChange,
            setJsonEditorError,
            responseBodyRef,
            saveButtonClicked,
            previewButtonClicked,
            jsonEditorError,
            methodType,
            isResponseBodyEditor,
            viewType,
            isJson
          } = props


  const sampleFakerObj = fakerObj

  return (
    <div>
      {isResponseBodyEditor ? (
        <div className={values.serviceResponseType === 'default' ? 'mb-3' : ''}>
          <Accordion className="accordion-top-spacing" defaultActiveKey="-1">
            <Card>
              <CustomToggle eventKey="0">Response Body - Sample Object</CustomToggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="card-layout">
                  <div>
                    <div className="sample-object">
                      <pre>{JSON.stringify(sampleFakerObj, null, 2)}</pre>
                      <div className="clipboard-faker">
                        <Tooltip content="Copy" direction="right">
                          <img
                            src={clipboard}
                            alt="clipboard"
                            onClick={() =>
                              navigator.clipboard.writeText(JSON.stringify(sampleFakerObj))
                            }
                          />
                        </Tooltip>
                      </div>
                    </div>

                    <TreeStructure />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      ) : null}
      <div className="row">
        <div
          className={`form-group col-md-12 ${methodType} 
          ${(methodType !== '') ? viewType : ''}
          ${(!isJson(text) && text === "") || ((jsonEditorError && text !== "")) ? 'errorMode' : ''}
          `}
          style={values.method === 'EXISTING' ? {display: 'none'} : {}}
        >   
           {!isResponseBodyEditor ? 
              <span>
                <JsonEditor
                  text={text}
                  mode={mode}
                  modes={modes}
                  indentation={4}
                  onChangeText={onChangeText}
                  onModeChange={onModeChange}
                  value={text}
                  setJsonEditorError={setJsonEditorError}
                  {...props}
                />
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="dummyInput4"
                  name="dummyInput4"
                  onChange="true"
                  checked="true"
                  ref={responseBodyRef}
                />
                <JsonRequiredErrorView 
                  previewButtonClicked={previewButtonClicked}
                  saveButtonClicked={saveButtonClicked}
                  methodType={methodType}
                  jsonEditorError={jsonEditorError}
                  isJson={isJson}
                  text={text}
                />
                <JsonValidErrorView 
                  previewButtonClicked={previewButtonClicked}
                  saveButtonClicked={saveButtonClicked}
                  methodType={methodType}
                  jsonEditorError={jsonEditorError}
                  isJson={isJson}
                  text={text}
                />
                
            </span>
             : null} 
          {isResponseBodyEditor && <><label htmlFor="inputResBody" className="response-body-text">
           Response Body </label>
           <div className="radioButtonSetter">
            <label>
              <input
                id="file"
                name="file"
                type="file"
                accept=".json"
                onChange={event => {
                  uploadFileForJSON(event.currentTarget.files[0])
                }}
                className="form-control"
                style={{display: 'none'}}
              />
              <span className="upload-json-button">Upload Json File</span>
              <input
                type="checkbox"
                className="custom-control-input"
                id="dummyInput2"
                name="dummyInput2"
                onChange={handleChange}
                value="true"
                checked="true"
              />
            </label>
          </div>
          <span>
            <JsonEditor
              text={text}
              mode={mode}
              modes={modes}
              indentation={4}
              onChangeText={onChangeText}
              onModeChange={onModeChange}
              value={text}
              setJsonEditorError={setJsonEditorError}
              {...props}
            />
            <input
              type="checkbox"
              className="custom-control-input"
              id="dummyInput4"
              name="dummyInput4"
              onChange="true"
              checked="true"
              ref={responseBodyRef}
            />
            {((!isJson(text) && text === "")) && (
              <div className="input-feedback text-danger" id="input-error-body">
                Response Body is required
              </div>
            )}
            {(jsonEditorError && (!isJson(text) && text !== "")) && (
                <div className="input-feedback text-danger" id="input-error-body">
                  Please provide valid json response
                </div>
              )}
          </span>
          </>}
        </div>
       
      </div>
    </div>
  )
}

export default JsonView
