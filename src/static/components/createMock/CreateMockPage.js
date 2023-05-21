import React, {useState, useEffect, useRef} from 'react'
import {Multiselect} from 'multiselect-react-dropdown'
import {useDispatch, connect} from 'react-redux'
import {Field} from 'formik'
import {Link, useHistory} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import 'bootstrap/dist/css/bootstrap.css'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './style.css'
import {Typeahead} from 'react-bootstrap-typeahead'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import Tooltip from '../common/Tooltip'
import Nav from '../common/nav'
import Loader from '../common/Loader'
import {DashboardUrl, createMockUrl, EditMockUrl} from '../../constants/url'
import {projectListAction} from '../../actions/projectList/projectListAction'
import {createProjectAction} from '../../actions/createProject/createProjectAction'
import {flushUploadedData} from '../../actions/fileUpload/fileUploadAction'
import {mockListAction} from '../../actions/mockList/mockListActions'
import {flushMockData, fetchListById} from '../../actions/createMock/createMockAction'
import Preview from './Preview'
import JsonEditor from './JsonEditor'
import JsonEditorKey from './JsonditorKey'
import {flushMockStatus} from '../../actions/mockStatus/mockStatusActions'
import {
  createPreviewMockAction,
  flushPreviewMockData,
} from '../../actions/previewMock/previewMockAction'
import deleteTrash from '../../assets/images/iRest_files/red_trash.png'
import buttonCircle from '../../assets/images/iRest_files/button_circle.svg'
import {CREATE_MOCK_SUCCESS} from '../../actions/actionTypes'
import {isSpecialCharacter, IsJsonString, isJson} from '../../../server/helpers/util'
import CustomToggle from '../common/CustomToggle'
import {schemaDataTransform, schemaViewDataTransform} from '../common/utils'
import SchemaView from './SchemaView'
import JsonView from './JsonView'
import {Dropdown, GroupedDropdown} from '../common/Dropdown'
import {serviceResponseType, saveAPIResponseType,
   fetchAPIResponseType} from '../../constants/createMockConstants'

let json1 = {}
const CreateMock = props => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    successList,
    createMockTemp,
    setValues,
    setFieldValue,
    setFieldTouched,
    mockId,
    isEditPending
  } = props
  const numberInput = ["e","-","."]
  const {isSchema} = values
  const [initialSchemaState, setInitialSchemaState ] = useState(false)

  const [data, updateState] = useState({
    isDynamicOptionDisplayed: true,
    isAdvaceOptions: null,
    isExisting: false,
  })

  const [allProjectOptions, setAllProjectsOption] = useState([])
  const [projectNameState, setProjectName] = useState()
  const [projectLabel, setProjectLabel] = useState()
  const [fields, setFields] = useState([])
  const [params, setParams] = useState([])
  const [methodOptions, setMethodOptions] = useState([
    {id: 1, method: 'GET'},
    {id: 2, method: 'POST'},
  ])
  const [allowedSaveMethodEditor, setAllowedSaveMethodEditor] = useState([
     'GET', 'GET_BY_ID', 'POST'
  ])
  const [allowedFetchMethodEditor, setAllowedFetchMethodEditor] = useState([])
  
  const [isResponseBodyVisible, setIsResponseBodyVisible] = useState(true)
  const [isFullFormDisplay, setIsFullFormDisplay] = useState(false)
  const [breadcrumb, setBreadcrumb] = useState('')
  const [pagetitle, setPagetitle] = useState('')
  const [typeaheadInput, setTypeaheadInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const endPointRef = useRef(null)
  const [json, setJson] = useState(json1)
  const [jsonEditorError, setJsonEditorError] = useState(false)
  const [jsonEditorErrorSpecific, setJsonEditorErrorSpecific] = useState(false)
  const [dynamicKeys, setDynamicKeys] = useState([])
  const modes = ['code', 'tree', 'text']
  const [modeSpecificKey, setModeSpecificKey] = useState('code')
  const [textSpecificKey, setTextSpecificKey] = useState({jsontext: '', othertext: '', textType: 'json'})
  
  const [mode, setMode] = useState('code')
  const [editorBodyText, setEditorBodyText] = useState(JSON.stringify(json, null, 2))
  const [newProject, setNewProject] = useState(false)
  const [saveButtonClicked, setSaveButtonClicked] = useState(false)
  const [preSelectedMethod, setPreselectedVal] = useState([{id: 1, method: 'GET'}])
  const [previewButtonClicked, setPreviewButtonClicked] = useState(false)
  const [defaultResponse, setDefaultResponse] = useState('-1')
  const [saveSchemaAccordion, setSaveSchemaAccordion] = useState('-1')
  const [fetchSchemaAccordion, setFetchSchemaAccordion] = useState('-1')
  const [defaultOptions, setDefaultOptions] = useState('-1')
 
  
  const history = useHistory()
  const dispatch = useDispatch()
  const projectNameRef = useRef(null)
  const responseBodyRef = useRef(null)
  const mockNameRef = useRef(null)
  const delayResponseRef = useRef(null)
  const dynamicResponseKeyRef = useRef(null)
  const dynamicResponseKeyValueRef = useRef(null)
  const inputEl = useRef(null)
  const optionValues = [200, 404, 500, 401, 502]

  useEffect(() => {
    if (dynamicKeys.length > 0) {
      setFieldValue('dynamicResponseKey', JSON.stringify(dynamicKeys))
    }
  }, [dynamicKeys])

  useEffect(() => {
    if (isSchema && initialSchemaState && pagetitle !== 'Create Mock') {
      setInitialSchemaState(false)
      const parsedData = Object.keys(JSON.parse(values.serviceResponseBody)).map(
        (key) => ({[key]:JSON.parse(values.serviceResponseBody)[key]}))
      const schemaData = schemaViewDataTransform(parsedData)
      setFieldValue('schemaResponse', schemaData )
    }
  }, [isSchema])

  useEffect(() => {
    if (mockId) {
      props.fetchListById(mockId)
    }
    return () => {
      props.flushMockData()
      props.flushPreviewMockData()
    }
  }, [mockId])

  useEffect(() => {
    if (props.fileUploadStatus.response.data && props.fileUploadStatus.response.data.length > 0) {
      setFieldValue(
        'serviceResponseBody',
        JSON.stringify(JSON.parse(props.fileUploadStatus.response.data[0]))
      )
      setFieldValue('serviceResponseBodyType', 'default')
    }
  }, [props.fileUploadStatus.response])

  useEffect(() => {
    if (props.createMock.response.data.mock) {
      setValues({
        ...values,
        ...props.createMock.response.data.mock,
      })
      const headerData = [...props.createMock.response.data.mock.headers]
      const paramData = [...props.createMock.response.data.mock.params]
      const mock_Status = props.createMock.response.data.mock.mockStatus
      const isInitialSchema = props.createMock.response.data.mock.isSchema
      setInitialSchemaState(props.createMock.response.data.mock.isSchema)
      const serviceResponseData = props.createMock.response.data.mock.serviceResponse?.serviceResponseBody
      const ApiResponseSchemaTypes = {...props.createMock.response.data.mock?.ApiResponseSchemaTypes}
      setFields(headerData)
      setParams(paramData)
      setFieldValue('serviceResponseBody', serviceResponseData)
      setFieldValue('ApiResponseSchemaTypes', ApiResponseSchemaTypes)
      setFieldValue('allowedMethods', props.createMock.response.data.mock.allowedMethods)
      setAllowedFetchMethodEditor(props.createMock.response.data.mock.allowedMethods)
      setFieldValue('endpoint', props.createMock.response.data.mock.endpointRequestPath)
      setFieldValue('mockStatus', mock_Status === 'enabled' ? 'true' : 'false')
      setFieldValue('isSchema', isInitialSchema)
      if (props.createMock.response.data.mock.serviceResponseType === serviceResponseType.DEFAULT) {
        const allowedMockMethodArray = props.createMock.response.data.mock.allowedMethods
        if (allowedMockMethodArray.length > 0) {
          setPreselectedVal([{id: (allowedMockMethodArray[0] === "POST") ? 2 : 1, method: allowedMockMethodArray[0]}])
        } else {
          setPreselectedVal()
        }
        setMethodOptions([
          {id: 1, method: 'GET'},
          {id: 2, method: 'POST'},
        ])
        setIsResponseBodyVisible(true)
        updateState({...data, isDynamicOptionDisplayed: true})  
        setTimeout(() => {
          const allowedMethodCheckbox = document.getElementsByClassName('checkbox')
          if (allowedMethodCheckbox && allowedMockMethodArray.length > 1) {
            const clickElement = (allowedMockMethodArray[0] === "POST") ? allowedMethodCheckbox[0] : allowedMethodCheckbox[1]
            clickElement.click()
            clickElement.setAttribute('checked', true)
          }    
        }, 5)
      } 
      else {
        setPreselectedVal([
          {id: 1, method: 'GET'},
          {id: 2, method: 'POST'},
        ])
        
        setMethodOptions([
          {id: 1, method: 'GET'},
          {id: 2, method: 'POST'},
          {id: 3, method: 'PUT'},
          {id: 4, method: 'PATCH'},
          {id: 5, method: 'DELETE'},
        ])
        setIsResponseBodyVisible(false)
        updateState({...data, isDynamicOptionDisplayed: false, isExisting: false})
        const allowedMockMethodArray = props.createMock.response.data.mock.allowedMethods
        setTimeout(() => {
          const allowedMethodCheckbox = document.getElementsByClassName('checkbox')
          if (allowedMockMethodArray.includes('PUT')) {
            allowedMethodCheckbox[2].click()
            allowedMethodCheckbox[2].setAttribute('checked', true)
          }
          if (allowedMockMethodArray.includes('PATCH')) {
            allowedMethodCheckbox[3].click()
            allowedMethodCheckbox[3].setAttribute('checked', true)
          }
          if (allowedMockMethodArray.includes('DELETE')) {
            allowedMethodCheckbox[4].click()
            allowedMethodCheckbox[4].setAttribute('checked', true)
          }
        }, 5)
      }
      if (props.createMock.response.data.mock.dynamicResponseSpecific) {
        setFieldValue('randomSpecific', 'specific')
        setFieldValue('dynamicResponseSpecific', true)
        setFieldValue('dynamicResponseRandom', false)
      } else {
        setFieldValue('randomSpecific', 'random')
        setFieldValue('dynamicResponseSpecific', false)
        setFieldValue('dynamicResponseRandom', true)
      }
      if (props.createMock.response.data.mock.isDynamicImportCount) {
        setFieldValue('isDynamicImportCount', true)
        setFieldValue('isDynamicImportSize', false)
      } else {
        setFieldValue('isDynamicImportCount', false)
        setFieldValue('isDynamicImportSize', true)
      }
      if (props?.createMock?.response?.data?.mock?.isBulkDataCount) {
        setFieldValue('isBulkDataCount', true)
        setFieldValue('isBulkDataSize', false)
      } else {
        setFieldValue('isBulkDataCount', false)
        setFieldValue('isBulkDataSize', true)
      }
      props.flushMockStatus()
      props.flushPreviewMockData()

      if (pagetitle === 'Edit Mock') {
        setDefaultResponse('0')
        if (textSpecificKey.jsontext !== '' && IsJsonString(textSpecificKey.jsontext)) {
          setTextSpecificKey({
            ...textSpecificKey,
            jsontext: textSpecificKey.jsontext,
            textType: "json"
          })
        } else {
          setTextSpecificKey({
            ...textSpecificKey,
            othertext: textSpecificKey.othertext,
            textType: "other"
          })
        }
      }
      if (headerData?.length > 0) {
        setDefaultOptions('0')
      }
    }
  }, [props.createMock.response.data])

  useEffect(() => {
    if (successList.response.data.projectList) {
      const tempData = successList.response.data.projectList.map(item => ({
        id: item._id,
        label: item.projectName,
      }))
      setAllProjectsOption(tempData)
    }
  }, [successList.response.data.projectList])

  useEffect(() => {
    if (createMockTemp.response.data && createMockTemp.response.data.projectList) {
      setFieldValue('projectId', createMockTemp.response.data._id)
      setFieldValue('projectName', projectNameState)
    }
  }, [createMockTemp.response.status])

  useEffect(() => {
    if (createMockTemp.response.data && createMockTemp.response.data.projectList) {
      setFieldValue('projectId', createMockTemp.response.data._id)
      setFieldValue('projectName', projectNameState)
    }
  }, [createMockTemp.response.status])

  useEffect(() => {
    if (createMockTemp.response.data?.projectList) {
      setFieldValue('projectId', createMockTemp.response.data._id)
      setFieldValue('projectName', projectNameState)
    }
  }, [createMockTemp.response.data._id])

  useEffect(() => {
    if (createMockTemp.response.type === CREATE_MOCK_SUCCESS) {
      dispatch(flushMockData())
      dispatch(flushUploadedData())
      props.flushPreviewMockData()
      history.push(DashboardUrl)
    }
  }, [createMockTemp.response.type])

  const handleChangeCountSize = e => {
    if (e.target.name === 'isDynamicImportCount') {
      setFieldValue('isDynamicImportCount', true)
      setFieldValue('isDynamicImportSize', false)
    } else {
      setFieldValue('isDynamicImportCount', false)
      setFieldValue('isDynamicImportSize', true)
    }
  }

  const handleChangeBulkCountSize = e => {
    if (e.target.name === 'isBulkDataCount') {
      setFieldValue('isBulkDataCount', true)
      setFieldValue('isBulkDataSize', false)
    } else {
      setFieldValue('isBulkDataCount', false)
      setFieldValue('isBulkDataSize', true)
    }
  }

  

  const RadioButtonStatus = ({field: {name, value, onChange, onBlur}, id, label, disabled}) => {
    let checkBoxValue = ''
    if (typeof value === 'string') {
      if (value === 'true' || value === 'enabled') {
        checkBoxValue = true
      } else if (value === 'false' || value === 'disabled') {
        checkBoxValue = false
      }
    } else {
      checkBoxValue = value
    }

    return (
      <div className="form-group form-inline ">
        <div className="radioButtonSetter custom-control custom-switch">
          <Tooltip content="Toggle Status" direction="bottom">
            <input
              name={name}
              id={id}
              className="custom-control-input"
              type="checkbox"
              value={checkBoxValue}
              checked={checkBoxValue}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
            />
            <label htmlFor={id} className="custom-control-label options-bold-text">
              {label}
            </label>
          </Tooltip>
        </div>
      </div>
    )
  }

  function handlerAddHeaders() {
    const headerFields = [...fields]
    headerFields.push({value: null})
    setFields(headerFields)
  }

  function handleRemove(i) {
    const removeFields = [...fields]
    removeFields.splice(i, 1)
    props.values.headers.splice(i, 1)
    setFields(removeFields)
  }

  function handleRemoveParmas(i) {
    const removeParams = [...params]
    removeParams.splice(i, 1)
    props.values.params.splice(i, 1)
    setParams(removeParams)
  }

  const typeaheadKeyPressedHandler = event => {
    setIsFullFormDisplay(false)
    setProjectLabel(event)
    if (event.length > 3) {
      const searchQuery = event
      dispatch(projectListAction({searchQuery}))
      setProjectName(event)
    }
    if (event === '') {
      setAllProjectsOption([])
      setFieldValue('projectId', '')
      setFieldValue('projectName', '')
    }
  }

  const createNewProject = () => {
    if (!projectNameState) return
    setNewProject(true)
    const requestedParam = {projectName: projectNameState}
    const checkProjectNameExist = allProjectOptions.filter(item => item.label === projectNameState)
    if (checkProjectNameExist.length > 0) return
    dispatch(createProjectAction(requestedParam))
    setIsFullFormDisplay(true)
  }

  const onChangeRandomSpecific = e => {
    setFieldValue('randomSpecific', e)
    if (e === 'random') {
      setFieldValue('dynamicResponseSpecific', false)
      setFieldValue('dynamicResponseRandom', true)
    } else {
      setFieldValue('dynamicResponseSpecific', true)
      setFieldValue('dynamicResponseRandom', false)
    }
  }

  const handleSpecificResponseChange = e => {
    setTextSpecificKey({
      jsontext: textSpecificKey.jsontext,
      othertext: textSpecificKey.othertext,
      textType: e.target.value
    })
  }

  const RandomSpecificToggle = ({field: {name, value, onChange, onBlur}, id, label, disabled}) => {
    const {randomSpecific} = values
    const checkBoxValue = Boolean(randomSpecific === id)
    return (
      <div className="form-group form-inline ">
        <div className="radioButtonSetter custom-control custom-switch">
          <Tooltip content="Toggle Status" direction="bottom">
            <input
              name={name}
              id={id}
              className="custom-control-input"
              type="checkbox"
              value={checkBoxValue}
              checked={checkBoxValue}
              onChange={() => onChangeRandomSpecific(id)}
              onBlur={onBlur}
              disabled={disabled}
            />
            <label htmlFor={id} className="custom-control-label options-bold-text">
              {label}
            </label>
          </Tooltip>
        </div>
      </div>
    )
  }

  const defaultSaveExisting = e => {
    setFieldValue('serviceResponseType', e.target.value)
    if (e.target.value === 'default') {
      setFieldValue('allowedMethods', ['GET'])
      setFieldValue('method', 'GET')
      setPreselectedVal([{id: 1, method: 'GET'}])
      setMethodOptions([
        {id: 1, method: 'GET'},
        {id: 2, method: 'POST'},
      ])
      setAllowedSaveMethodEditor((prevState) => {
        return uniq(['GET', 'GET_BY_ID', 'POST'])
      })
      setIsResponseBodyVisible(true)
      updateState({...data, isDynamicOptionDisplayed: true, isExisting: false})
      let methodWiseDataForFetch = {}
      allowedFetchMethodEditor.forEach((method) => {
        methodWiseDataForFetch = {
          ...methodWiseDataForFetch,
          FETCH_NORMAL_RESPONSE: fetchAPIResponseType.FETCH_NORMAL_RESPONSE,
          [method]: fetchAPIResponseType[method]
        }
      })
      json1 = methodWiseDataForFetch
      setEditorBodyText(json1)
    } else if (e.target.value === 'existing') {
      setFieldValue('method', 'GET')
      setMethodOptions([
        {id: 1, method: 'GET'},
        {id: 2, method: 'POST'},
      ])
      setIsResponseBodyVisible(false)
      updateState({...data, isDynamicOptionDisplayed: false, isExisting: true})

      if (props.createMock?.response?.data?.mock?.projectId) {
        props.mockListAction({
          projectId: props.createMock?.response?.data?.mock?.projectId,
          existing: true,
        })
      } else {
        props.mockListAction({
          projectId: props.values.projectId,
          existing: true,
        })
      }
    } else {
      setPreselectedVal([{id: 1, method: 'GET'},{id: 2, method: 'POST'}])
      setFieldValue('allowedMethods', ['GET', 'POST'])
      setFieldValue('method', 'POST')
      setMethodOptions([
        {id: 1, method: 'GET'},
        {id: 2, method: 'POST'},
        {id: 3, method: 'PUT'},
        {id: 4, method: 'PATCH'},
        {id: 5, method: 'DELETE'},
      ])
      setAllowedFetchMethodEditor((prevState) => {
        return uniq(['GET'])
      })
      setIsResponseBodyVisible(false)
      updateState({...data, isDynamicOptionDisplayed: false, isExisting: false})
      let methodWiseDataForSave = {}
      allowedSaveMethodEditor.forEach((f) => {
        methodWiseDataForSave = {
          ...methodWiseDataForSave,
          [f]: saveAPIResponseType[f]
        }
      })
      json1 = methodWiseDataForSave
      setEditorBodyText(json1)
    }
  }
  const handlePreviewBtnClick = e => {
    setPreviewButtonClicked(true)
    if ( !values.bulkDataCount || !values.bulkDataSize || !values.dynamicImportCount || !values.dynamicImportSize ) {
      return
    }

    let isApiSchemaEditorError  = false
    const {ApiResponseSchemaTypes, serviceResponseBody} = values
    Object.keys(ApiResponseSchemaTypes).forEach((arst) => {
      if (!isJson(ApiResponseSchemaTypes[arst])) {
        isApiSchemaEditorError  = true
      }
    })

    const normalEditorValue = serviceResponseBody
    const delayCheck = (values.isDelay && (values.delaySeconds > 0 &&
      values.delaySeconds <= 60)) || (!values.isDelay)
      if (
        (!jsonEditorError &&
          !isApiSchemaEditorError  &&
          IsJsonString(normalEditorValue) &&
          normalEditorValue !== '' &&
          !values.isDynamicResponse &&
          values.mockName !== '' &&
          values.endpoint !== '' &&
          delayCheck) ||
        (!jsonEditorError &&
          !isApiSchemaEditorError  &&
          IsJsonString(normalEditorValue) &&
          normalEditorValue !== '' &&
          values.isDynamicResponse &&
          props.values.dynamicResponseKey !== '' &&
          props.values.randomSpecific === 'random' &&
          values.mockName !== '' &&
          values.endpoint !== '' &&
          delayCheck) ||
        (!jsonEditorError &&
          !isApiSchemaEditorError  &&
          IsJsonString(normalEditorValue) &&
          normalEditorValue !== '' &&
          !jsonEditorErrorSpecific &&
          IsJsonString(textSpecificKey.jsontext) &&
          textSpecificKey.jsontext !== '' &&
          values.isDynamicResponse &&
          props.values.dynamicResponseKey !== '' &&
          props.values.randomSpecific !== 'random' &&
          values.mockName !== '' &&
          values.endpoint !== '' &&
          delayCheck)
      ) {
        setModalOpen(true)
        const newData = props.values
        const {mockStatus, isSchema} = newData
        if (isSchema) {
          const schemaResponse = schemaDataTransform(newData.schemaResponse)
          newData.serviceResponseBody = JSON.stringify({...schemaResponse})
        } else {
          newData.serviceResponseBody = normalEditorValue
        }
        newData.mockStatus =
          mockStatus === 'enabled' || mockStatus === 'true' || mockStatus === true
            ? 'enabled'
            : 'disabled'
        newData.isPreview = true
        props.createPreviewMockAction(newData)
      } else if (projectNameState === '') {
        projectNameRef.current.focus()
      } else if (values.endpoint === '') {
        endPointRef.current.focus()
      } else if ((textSpecificKey.textType === "json") && jsonEditorError || !IsJsonString(normalEditorValue) || normalEditorValue === '') {
        responseBodyRef.current.focus()
      } else if (values.isDynamicResponse && props.values.dynamicResponseKey === '') {
        dynamicResponseKeyRef.current.focus()
      } else if ((textSpecificKey.textType === "json") &&
        (jsonEditorErrorSpecific || !IsJsonString(textSpecificKey.jsontext) || textSpecificKey.jsontext === '') &&
        props.values.randomSpecific !== 'random'
      ) {
        dynamicResponseKeyValueRef.current.focus()
      } else if (values.mockName === '') {
        mockNameRef.current.focus()
      } else if (values.isDelay && (values.delaySeconds <= 0) && values.delaySeconds > 60) {
        delayResponseRef.current.focus()
      }
     else if (values.isDynamicResponse &&
        props.values.dynamicResponseKey !== '' &&
        props.values.randomSpecific !== 'random' &&
        values.mockName !== '' &&
        textSpecificKey.othertext !== '' && 
        values.endpoint !== '' && textSpecificKey.textType === "other") {
          setModalOpen(true)
          const newData = props.values
          const {mockStatus, isSchema} = newData
          if (isSchema) {
            const schemaResponse = schemaDataTransform(newData.schemaResponse)
            newData.serviceResponseBody = JSON.stringify({...schemaResponse})
          } else {
            newData.serviceResponseBody = normalEditorValue
          }
          newData.mockStatus =
            mockStatus === 'enabled' || mockStatus === 'true' || mockStatus === true
              ? 'enabled'
              : 'disabled'
          newData.isPreview = true
          props.createPreviewMockAction(newData)
      }
      else if ((textSpecificKey.textType === "other") && normalEditorValue === '') {
        responseBodyRef.current.focus()
      } 
      else if ((textSpecificKey.textType === "other") &&
        (textSpecificKey.othertext === '') &&
        props.values.randomSpecific !== 'random'
      ) {
        dynamicResponseKeyValueRef.current.focus()
      }     
  }

  const handleSubmitClick = e => {
    setSaveButtonClicked(true)
    if (!isSchema) {
      const schemaData = values.schemaResponse.filter(value => value.name !== '')
      setFieldValue('schemaResponse',schemaData)
      setFieldValue('specificResponseType', textSpecificKey.textType)
    }

    if (isSchema) {
      const schemaData1 = schemaDataTransform(values.schemaResponse)
      setFieldValue('serviceResponseBody', (JSON.stringify({...schemaData1})))
    }

    if (["default"].includes(props.values.serviceResponseType)) {
      const schematypes = values.ApiResponseSchemaTypes
      // let ob = {} // eslint-disable-line no-use-before-define
      // Object.keys(schematypes).forEach((e) => { // eslint-disable-line no-use-before-define
      //   ob = { // eslint-disable-line no-use-before-define
      //     ...ob, // eslint-disable-line no-use-before-define
      //     [e]: Object.keys(schematypes[e]).length > 0 ? JSON.parse(schematypes[e]) : schematypes[e] // eslint-disable-line no-use-before-define
      //   }// eslint-disable-line no-use-before-define
      // })// eslint-disable-line no-use-before-define
      setFieldValue('ApiResponseSchemaTypes', schematypes)
    }
    if (typeof editorBodyText === "object") {
      Object.keys(editorBodyText).forEach((txtKey) => {
        if (editorBodyText[txtKey].value === "{}" || (!IsJsonString(editorBodyText[txtKey].value))) {
          responseBodyRef.current.focus()
        }
      })
    }
    if (values.mockName === '') {
      mockNameRef.current.focus()
    }

    if ((
      (!IsJsonString(textSpecificKey.jsontext) || jsonEditorErrorSpecific || textSpecificKey.jsontext === '') &&
      props.values.randomSpecific !== 'random' && textSpecificKey.textType === "json") || 
      ((textSpecificKey.othertext === '') &&
        props.values.randomSpecific !== 'random' && textSpecificKey.textType === "other"
      )
    ) {
      dynamicResponseKeyValueRef.current.focus()
    }
    if (props.values.dynamicResponseKey === '') {
      dynamicResponseKeyRef.current.focus()
    }
    if (((editorBodyText === '' || jsonEditorError || !IsJsonString(editorBodyText)) && textSpecificKey.textType === "json") || 
    ((editorBodyText === '') && textSpecificKey.textType === "other")) {
      responseBodyRef.current.focus()
    }
    if (values.endpoint === '') {
      endPointRef.current.focus()
    }
    if (projectNameState === '') {
      projectNameRef.current.focus()
    }
  }
 
  const onSelect = (selectedList, selectedItem) => {
    const selVal = inputEl.current.getSelectedItems()
    const selMethods = selVal.map(x => x.method)
    setFieldValue('allowedMethods', selMethods)
    if (props.values.serviceResponseType === "save") {
      setAllowedSaveMethodEditor((prevState) => {
        return uniq([
          ...prevState,
          selectedItem.method
        ])
      })
      setEditorBodyText((prevText) => {
        const newItem = (selectedItem.method) in prevText ? prevText : {...saveAPIResponseType}
        return {
          ...prevText,
          [selectedItem.method]: newItem[selectedItem.method]
        }
      })
    } else {
      setAllowedFetchMethodEditor(uniq([
        ...allowedFetchMethodEditor,
        ...selMethods
      ]))
      setEditorBodyText((prevText) => {
        const newItem = (selectedItem.method) in prevText ? prevText : {...fetchAPIResponseType}
        return {
          ...prevText,
          [selectedItem.method]: newItem[selectedItem.method]
        }
      })
    }
    const apiData = props.values.serviceResponseType === "save" ? {...saveAPIResponseType} : {...fetchAPIResponseType}
    setFieldValue("ApiResponseSchemaTypes", {
      [selectedItem.method]: JSON.parse(apiData[selectedItem.method].value),
      ...values.ApiResponseSchemaTypes,
    })
    if (values.serviceResponseType === serviceResponseType.DEFAULT) {
      setIsResponseBodyVisible(true)
      updateState({...data, isDynamicOptionDisplayed: true, isExisting: false})
    }
  }

  const onRemove = (selectedList, removedItem) => {
    const selVal = inputEl.current.getSelectedItems()
    const selMethods = selVal.map(x => x.method)
    setFieldValue('allowedMethods', selMethods)
    if (props.values.serviceResponseType === "save") {
      setAllowedSaveMethodEditor((prevState) => {
        return prevState.filter((e) => e !== removedItem.method)
      }) 
    } else {
      setAllowedFetchMethodEditor(uniq([
        ...selMethods
      ]))
    }
    const vald = values.ApiResponseSchemaTypes
    delete vald[removedItem.method]
    setFieldValue("ApiResponseSchemaTypes", vald)
    /* eslint-disable */
    const textCopy = editorBodyText
    delete textCopy[removedItem.method]
    setEditorBodyText((prevText) => {
      return {
        ...prevText,
        textCopy
      }
    })
    /* eslint-enable */
    if (values.serviceResponseType === serviceResponseType.DEFAULT) {
      setIsResponseBodyVisible(true)
      updateState({...data, isDynamicOptionDisplayed: true, isExisting: false})
    }
  }

  const isMatchingProjectName = name => {
    const results = []
    allProjectOptions.map(e => {
      if (e.label.toLowerCase().includes(name.toLowerCase())) {
        results.push(e)
      }
      return results
    })
    return results
  }

  const readFileAsText = async fileInput => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsText(fileInput, 'UTF-8')
      const csvtojson = jsonConvertedData => {
        const jsonData = jsonConvertedData.replaceAll('\r', '')
        const lines = jsonData.split('\n')
        const result = []
        const headers = lines[0].split(',')
        for (let i = 1; i < lines.length; i += 1) {
          try {
            if (!lines[i]) continue
            const obj = {}
            const currentLine = lines[i].split(',')
            for (const [j, header] of headers.entries()) {
              let key = header
              if (key === undefined || key === '') key = 'data'
              obj[key] = currentLine[j]
            }
            result.push(obj)
          } catch (error) {
            console.log(error)
          }
        }
        const convertedJson = result
        return convertedJson
      }
      reader.addEventListener('load', () => {
        const renderedResult = reader.result
        const jsonParseValue = csvtojson(renderedResult)
        if (jsonParseValue.error !== 'error') {
          try {
            const jsonParsedData = JSON.parse(renderedResult)
            const normalValue = {
              "FETCH_NORMAL_RESPONSE": {value: jsonParsedData}
            }
            setJson((prevState) => {
              return {
                ...prevState,
                ...normalValue
              }
            })
          } catch (error) {
            return error
          }
          setFieldValue('dynamicResponseKey', '')
          resolve(renderedResult)
        } else {
          console.log('json file is not valid')
        }
      })
    })
  }
  const uploadFileForJSON = async fileInput => {
    readFileAsText(fileInput)
  }

  useEffect(() => {
    if (values?.serviceResponseType === 'save') {
      
      if (
        values?.ApiResponseSchemaTypes === null ||
        values?.ApiResponseSchemaTypes === '' ||
        values?.ApiResponseSchemaTypes === undefined ||
        values?.ApiResponseSchemaTypes === '"' ||
        values?.ApiResponseSchemaTypes === '{' ||
        values?.ApiResponseSchemaTypes === '['
      ) {
        json1 = {}
      } else {
        const ob = values?.ApiResponseSchemaTypes
        json1 = JSON.parse(JSON.stringify(ob))
      }
      setJson(json1)
     
    } else {
      if (values?.serviceResponseBody) {
        if (
          values?.serviceResponseBody === null ||
          values?.serviceResponseBody === '' ||
          values?.serviceResponseBody === undefined ||
          values?.serviceResponseBody === '"' ||
          values?.serviceResponseBody === '{' ||
          values?.serviceResponseBody === '['
        ) {
          json1 = {}
        } else {
          const apiData = values?.ApiResponseSchemaTypes  
          const responseEditData = JSON.parse(values?.serviceResponseBody)
          let testFlag = {
            "FETCH_NORMAL_RESPONSE": responseEditData
          }
          Object.keys(apiData).forEach((apd) => {
            testFlag = {
              ...testFlag,
              [apd]: apiData[apd]
            }
          })
          json1 = testFlag
        }
        setJson(json1)
      }
      json1 = values?.dynamicResponseSpecificKeyValue
      if (json1 !== "" && IsJsonString(json1)) {
        json1 = JSON.parse(json1)
        setTextSpecificKey({...textSpecificKey, jsontext: JSON.stringify(json1), textType: "json"})
      } else {
        setTextSpecificKey({...textSpecificKey, othertext: json1, textType: "other"})
      }
    }
  }, [values?.status === 'enabled'])

  const onChangeText = (txt, view) => {
    setEditorBodyText((prevText) => {
      const output = {
        ...prevText,
        [view]: {
          value: txt
        }
      }
      return output
    })
    setSaveButtonClicked(false)
    setPreviewButtonClicked(false)
  }

  const onChangeTextSpecificKey = txt => {
    setTextSpecificKey({...textSpecificKey, jsontext: txt, textType: "json"})
    setSaveButtonClicked(false)
    setPreviewButtonClicked(false)
  }

  const onChangeSpecificKey = e => {
    let i = e.target.value
    // if (i === "true") {
    //   i = true
    // } else if (i === "false") {
    //   i = false
    // }  
    // eslint-disable-next-line
    if (i !== "" && !isNaN(Number(i))) { 
      i = Number(i)
    }
    setTextSpecificKey({
      ...textSpecificKey,
      othertext: i,
      textType: "other"
    })
    setSaveButtonClicked(false)
    setPreviewButtonClicked(false)
  }

  const onModeChangeSpecificKey = mode1 => {
    setModeSpecificKey(mode1)
    setSaveButtonClicked(false)
    setPreviewButtonClicked(false)
  }

  const onModeChange = m => {
    setMode(m)
  }

  useEffect(() => {
    let ob = {}
    if (json) {
      if ((props.values.serviceResponseType === "default") && (IsJsonString(json) || isJson(json))) {
        Object.keys(json).forEach(fetchSchemaKey => {
          if (isJson(json[fetchSchemaKey])) {
            if ("value" in json[fetchSchemaKey] && pagetitle !== "Edit Mock") {
              const schemaValue = json[fetchSchemaKey].value
              ob = {
                ...ob, 
                [fetchSchemaKey]: {
                  value: isJson(schemaValue) && schemaValue !== "{}" ? JSON.stringify(schemaValue) : schemaValue
                }
              }
            } else {
              ob = {
                ...ob, 
                [fetchSchemaKey]: {value: JSON.stringify(json[fetchSchemaKey]).replace(/\\"/g, '"')}
              }
            }
          } else {
            ob = {
              ...ob,
              [fetchSchemaKey]: {value: "{}"}
            }
          }
        })
       } else {
        Object.keys(json).forEach((f) => {
          ob = {
            ...ob,
            [f]: {
              value: (JSON.stringify(json[f])).replace(/\\"/g, '"')
            }
          }
        })
       }
      setEditorBodyText(ob)
    }
  }, [json])

  useEffect(() => {
    if (props.values.serviceResponseType === 'save') {
      let ob1 = {}
      if (editorBodyText !== "{}") {
        Object.keys(editorBodyText).forEach((e) => {
          const val = editorBodyText[e].value
          if ((e !== 'FETCH_NORMAL_RESPONSE') && allowedSaveMethodEditor.includes(e)) {
            ob1 = {
              ...ob1,
              [e]: IsJsonString(val) && (val.length > 0) ? JSON.parse(val) : (val === "{}" ? {} : val)
            }
          }
        })
      }
      setFieldValue('ApiResponseSchemaTypes', ob1)
    } else {
      let ob2 = {}
      if (typeof editorBodyText === 'object') {
          const normalVal = ((Object.keys(editorBodyText).length > 0) && editorBodyText !== "{}" && 'FETCH_NORMAL_RESPONSE' in editorBodyText) ? editorBodyText.FETCH_NORMAL_RESPONSE.value : editorBodyText
          setFieldValue('serviceResponseBody', normalVal)
          if (editorBodyText !== "{}") {
            Object.keys(editorBodyText).forEach((e) => {
              const val = editorBodyText[e].value
              if ((e !== 'FETCH_NORMAL_RESPONSE') && allowedFetchMethodEditor.includes(e)) {
                ob2 = {
                  ...ob2,
                  [e]: (IsJsonString(val) || isJson(val)) && (val.length > 0) ? JSON.parse(val) : val
                }
              }
            })
          }
      }
      setFieldValue('ApiResponseSchemaTypes', ob2)
    }
    
    const body = props?.values?.serviceResponse?.serviceResponseBody
    let txt = {}
    let bodyVar = {}
    if (textSpecificKey.textType === "json") {
      try {
        txt = JSON.parse(editorBodyText)
        bodyVar = JSON.parse(body.replace(/\|]/g, ''))
        if (!isEqual(txt, bodyVar)) {
          setFieldValue('dynamicResponseKey', '')
        }
      } catch (e) {
        setFieldValue('dynamicResponseKey', '')
      }
    }
  }, [editorBodyText])

  useEffect(() => {
    if (textSpecificKey.textType === "json") {
      if (textSpecificKey.jsontext !== '' && IsJsonString(textSpecificKey.jsontext)) {
        setFieldValue('dynamicResponseSpecificKeyValue', textSpecificKey.jsontext)
      } else {
        setFieldValue('dynamicResponseSpecificKeyValue', '')
      }
    } else if (textSpecificKey.textType === "other") { 
        if (textSpecificKey.othertext !== '') {
            setFieldValue('dynamicResponseSpecificKeyValue', textSpecificKey.othertext)
        } else {
            setFieldValue('dynamicResponseSpecificKeyValue', '')
        }
      }
  }, [textSpecificKey])

  useEffect(() => {
    if (history.location.pathname === '/create-mock') {
      setAllowedFetchMethodEditor((prevState) => {
        return [...prevState, 'GET']
      })
      json1 = fetchAPIResponseType
      setJson(json1)
    }
  }, [history.location.pathname])

  useEffect(() => {
    setFieldValue('allowedMethods', ['GET'])
  }, [])

  useEffect(() => {
    const path = window.location.pathname
    const breadcrumbs = path.split('/')
    const editpath = EditMockUrl.split('/')
    const createpath = createMockUrl.split('/')
    if (breadcrumbs[1] === editpath[1]) {
      setBreadcrumb('Edit Mock')
    }
    if (breadcrumbs[1] === createpath[1]) {
      setBreadcrumb('Create Mock')
    }
  }, [])

  useEffect(() => {
    const title = window.location.pathname
    const titlepage = title.split('/')
    const editpath = EditMockUrl.split('/')
    const createpath = createMockUrl.split('/')
    if (titlepage[1] === editpath[1]) {
      setPagetitle('Edit Mock')
    }
    if (titlepage[1] === createpath[1]) {
      setPagetitle('Create Mock')
    }
  }, [])

  const {EXPRESS_REST_BASE_URL,MOCK_BASE_URL} = process.env
  const basePath = `${window.location.origin}${EXPRESS_REST_BASE_URL}${MOCK_BASE_URL}`
  let editorKeyText = "{}"
  if (!isSchema) {
    if (typeof editorBodyText === 'string') {
      editorKeyText = editorBodyText
    } else if ("FETCH_NORMAL_RESPONSE" in editorBodyText && editorBodyText.FETCH_NORMAL_RESPONSE.value !== "undefined") {
      editorKeyText = editorBodyText.FETCH_NORMAL_RESPONSE.value
    }
  } else {
    editorKeyText = JSON.stringify({...schemaDataTransform(values.schemaResponse)})
  }
  return (
  <div>
    {isEditPending ? (<Loader isOverlay />) : (<div id="dashboard" className={`dashboard ${props.values.serviceResponseType}`} data-testid="dashboard">
      <Nav pageTitle="iRest" link={DashboardUrl} data-testid="navigation" />
      <nav aria-label="breadcrumb col-20" className="widthchange" data-testid="nav2">
        <ol className="breadcrumb" data-test-id="orderedList">
          <Link
            to={DashboardUrl}
            className="breadcrumb-item "
            aria-current="page"
            data-test-id="link"
          >
            Dashboard
          </Link>
          <i>&nbsp; / &nbsp;</i>
          <span>{breadcrumb}</span>
        </ol>
      </nav>

      <div className="container-fluid container-padding" data-testid="container">
        <div className="row mock-card" data-testid="row">
          <form onSubmit={handleSubmit} className="form-width" data-testid="handleSubmit">
            <div className="row" data-testid="row1">
              <div className="form-group col-xl-4" data-testid="form">
                <label htmlFor="inputApi" data-testid="inputApi" className="heading-text">
                  API Base URL
                </label>
                <div className="input-group" data-testid="inputgroupapi">
                  <input
                    data-testid="apiInput"
                    type="text"
                    name="path"
                    className="form-control options-bold-text"
                    id="inputApi"
                    placeholder=""
                    value={basePath}
                    onChange={handleChange}
                    disabled
                  />
                  <span className="input-group-slash">/</span>
                </div>
              </div>
              <div className="form-group col-xl-4">
                <label htmlFor="inputProject" className="heading-text">
                  Project Name
                </label>
                <div className="input-group" style={props.values.mockId ? {} : {display: 'none'}}>
                  <input
                    type="text"
                    value={values.projectName}
                    disabled
                    className="form-control options-bold-text"
                    id="projectNoneEditable"
                    style={props.values.mockId ? {} : {display: 'none'}}
                  />
                  <span className="input-group-slash">/</span>
                </div>
                <span style={props.values.mockId ? {display: 'none'} : {}}>
                  <div className="input-group">
                    <div className="create-project-typeahead">
                      <Typeahead
                        emptyLabel=""
                        name="projectName"
                        id="inputProject"
                        placeholder="Project Name"
                        onBlur={e => setFieldTouched('projectName', true)}
                        className="type-head"
                        onChange={selected => {
                          setFieldValue(
                            'projectId',
                            selected.length ? selected[0].id : props.values.projectId
                          )
                          setFieldValue(
                            'projectName',
                            selected.length ? selected[0].label : props.values.projectName
                          )
                          setIsFullFormDisplay(true)
                          setProjectName(selected.length ? selected[0].label : '')
                          if (selected.length === 0) {
                            setAllProjectsOption([])
                            setFieldValue('projectId', '')
                            setFieldValue('projectName', '')
                            setIsFullFormDisplay(false)
                          }
                        }}
                        onInputChange={event => {
                          setNewProject(false)
                          setTypeaheadInputValue(event)
                          setFieldValue('projectName', event)
                          setFieldValue('projectId', createMockTemp?.response?.data?._id)
                          typeaheadKeyPressedHandler(event)
                        }}
                        options={allProjectOptions}
                        ref={projectNameRef}
                      />

                      <span className="input-slash-url">/</span>

                      {projectLabel === '' && (
                        <div className="input-feedback text-danger" id="input-error">
                          Project name is required
                        </div>
                      )}

                      {typeaheadInput.length > 0 && !isSpecialCharacter(typeaheadInput) && (
                        <div className="input-feedback text-danger" id="input-error">
                          Special characters not allowed
                        </div>
                      )}
                      {typeaheadInput.length > 0 && isSpecialCharacter(typeaheadInput) && (
                        <span
                          className="create-project"
                          onClick={() => !errors.projectName && createNewProject()}
                          style={
                            typeaheadInput.length <= 3 ||
                            newProject ||
                            isMatchingProjectName(typeaheadInput).length > 0
                              ? {display: 'none'}
                              : {}
                          }
                          title="Please add project!"
                        >
                          +
                        </span>
                      )}
                    </div>
                  </div>
                  {errors.projectName && touched.projectName && (
                    <div className="input-feedback text-danger">{errors.projectName}</div>
                  )}
                </span>
              </div>
              <div className="form-group col-xl-4">
                <label htmlFor="inputReqUrl" className="heading-text">
                  Endpoint
                </label>
                <input
                  type="text"
                  name="endpoint"
                  className="form-control options-bold-text"
                  id="inputReqUrl"
                  placeholder="Endpoint"
                  ref={endPointRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endpoint}
                  disabled={pagetitle !== 'Create Mock'}
                />
                {errors.endpoint && touched.endpoint && (
                  <div className="input-feedback text-danger">{errors.endpoint}</div>
                )}
              </div>
            </div>
            <div style={props.values.mockId || isFullFormDisplay ? {} : {display: 'none'}}>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputReqUrl" className="heading-text">
                    API Type
                  </label>
                  <br />
                  <div className="radioButtonSetter">
                    <input
                      data-testid="api-type-input"
                      name="randomDefault"
                      id="default"
                      type="radio"
                      value="default"
                      disabled={pagetitle === 'Edit Mock'}
                      onChange={e => defaultSaveExisting(e)}
                      checked={values.serviceResponseType === serviceResponseType.DEFAULT}
                    />
                    <label htmlFor="default" className="options-bold-text">
                      Fetch
                    </label>
                  </div>
                  <div className="radioButtonSetter">
                    <input
                      name="randomDefault"
                      id="save"
                      type="radio"
                      value="save"
                      disabled={pagetitle === 'Edit Mock'}
                      onChange={e => defaultSaveExisting(e)}
                      checked={values.serviceResponseType === serviceResponseType.SAVE}
                    />
                    <label htmlFor="save" className="options-bold-text">
                      Save
                    </label>
                  </div>
                </div>
                <div
                  className="form-group col-md-4"
                 >
                  <label htmlFor="inputReqMethod" className="heading-text">
                    Request Method
                  </label>
                  <Multiselect
                    options={methodOptions} 
                    displayValue="method"
                    showCheckbox
                    selectedValues={preSelectedMethod}
                    disablePreSelectedValues={!isResponseBodyVisible}
                    closeIcon="cancel"
                    onSelect={onSelect}
                    ref={inputEl}
                    onRemove={onRemove}
                    style={{multiselectContainer: {background: '#fff'}}}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputStatusCode" className="heading-text">
                    Response Status
                  </label>
                  <select
                    id="inputStatusCode"
                    name="statusCode"
                    onChange={handleChange}
                    className="form-control options-bold-text"
                    value={values.statusCode}
                  >
                    {optionValues.map(e => (
                      <option>{e}</option>
                    ))}
                  </select>
                </div>
              </div>
              {(props.values.serviceResponseType === "default") && <div
                style={
                  (props.values.mockId || (isFullFormDisplay))
                    ? {height: '40px'}
                    : {display: 'none'}
                }
              >
                <Field
                  component={RadioButtonStatus}
                  name="isSchema"
                  id="isSchema"
                  label="Response body - Schema"
                />
              </div>}
              {isSchema ? (
                <SchemaView
                  values={values}
                  errors={errors}
                  touched={touched}
                  Dropdown={Dropdown}
                  GroupedDropdown={GroupedDropdown}
                />
              ) : (props.values.serviceResponseType === "save") ? 
              <Accordion
                  className="accordion-top-spacing"
                  activeKey={saveSchemaAccordion}
                  onSelect={e => {
                    if (e === '0') {
                      setSaveSchemaAccordion('0')
                    } else {
                      setSaveSchemaAccordion('-1')
                    }
                  }}
                >
                <Card>
                  <CustomToggle eventKey="0">Response Schema Template</CustomToggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {allowedSaveMethodEditor.map((schemaType) => {
                        let prefilledText = ''
                        let updateText = ''
                        if (editorBodyText !== "{}" && (schemaType !== 'GET_BY_ID') && (Object.keys(editorBodyText).length > 0) && typeof editorBodyText === "object" && (schemaType in editorBodyText)) {
                          prefilledText = editorBodyText[schemaType].value
                        } else if ((schemaType === 'GET_BY_ID') && (schemaType in editorBodyText)) {
                          updateText = editorBodyText[schemaType].value
                        } else {
                          const saveResponseCopy = {...saveAPIResponseType}
                          prefilledText = saveResponseCopy[schemaType].value
                        }
                        return (<><div className="response-editor-heading">{schemaType}</div>
                          <JsonView
                                      values={values.ApiResponseSchemaTypes[schemaType]}
                                      isResponseBodyVisible={isResponseBodyVisible}
                                      uploadFileForJSON={uploadFileForJSON}
                                      handleChange={handleChange}
                                      text={schemaType === "GET_BY_ID" ? updateText : prefilledText === "" ? '' : prefilledText}
                                      mode={mode}
                                      modes={modes}
                                      onChangeText={(txt) => {onChangeText(txt, schemaType)}}
                                      onModeChange={onModeChange}
                                      setJsonEditorError={setJsonEditorError}
                                      responseBodyRef={responseBodyRef}
                                      previewButtonClicked={previewButtonClicked}
                                      saveButtonClicked={saveButtonClicked}                
                                      jsonEditorError={jsonEditorError}
                                      IsJsonString={IsJsonString}
                                      isJson={isJson}
                                      methodType={schemaType}
                                      isResponseBodyEditor={false}
                                      viewType="save"
                                      key={schemaType}
                                      {...props}
                                  />
                        </>)
                      })}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>:     
                <>
                <JsonView
                  values={values}
                  isResponseBodyVisible={isResponseBodyVisible}
                  uploadFileForJSON={uploadFileForJSON}
                  handleChange={handleChange}
                  text={editorBodyText?.FETCH_NORMAL_RESPONSE?.value || ""}
                  mode={mode}
                  modes={modes}
                  onChangeText={(txt) => {onChangeText(txt, 'FETCH_NORMAL_RESPONSE')}}
                  onModeChange={onModeChange}
                  setJsonEditorError={setJsonEditorError}
                  responseBodyRef={responseBodyRef}
                  previewButtonClicked={previewButtonClicked}
                  saveButtonClicked={saveButtonClicked}                
                  jsonEditorError={jsonEditorError}
                  IsJsonString={IsJsonString}
                  isJson={isJson}
                  isResponseBodyEditor
                  viewType="default"
                  key="FETCH_NORMAL_RESPONSE"
                  {...props}
                />
                <Accordion
                  className="accordion-top-spacing fetch-schema-editor"
                  activeKey={fetchSchemaAccordion}
                  onSelect={e => {
                    if (e === '0') {
                      setFetchSchemaAccordion('0')
                    } else {
                      setFetchSchemaAccordion('-1')
                    }
                  }}
                >
                <Card>
                  <CustomToggle eventKey="0">Response Schema Template</CustomToggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                          {allowedFetchMethodEditor.map((methd, ind) => {
                              let prefilledText = '{}'
                              if ((typeof editorBodyText === 'object') && (Object.keys(editorBodyText).length > 0) && (editorBodyText !== "{}") && typeof editorBodyText === "object" && (methd in editorBodyText)) {
                                prefilledText = editorBodyText[methd].value
                              }
                              return (<><div className="response-editor-heading">{methd}</div><JsonView
                                values={values}
                                isResponseBodyVisible={isResponseBodyVisible}
                                uploadFileForJSON={uploadFileForJSON}
                                handleChange={handleChange}
                                text={prefilledText}
                                mode={mode}
                                modes={modes}
                                onChangeText={(txt) => {onChangeText(txt, methd)}}
                                onModeChange={onModeChange}
                                setJsonEditorError={setJsonEditorError}
                                responseBodyRef={responseBodyRef}
                                previewButtonClicked={previewButtonClicked}
                                saveButtonClicked={saveButtonClicked}                
                                jsonEditorError={jsonEditorError}
                                IsJsonString={IsJsonString}
                                isJson={isJson}
                                methodType={methd}
                                isResponseBodyEditor={false}
                                viewType="default"
                                key={methd}
                                {...props}
                              /></>)
                            })}
                    </Card.Body>
                  </Accordion.Collapse>
                  </Card>
                </Accordion>
                
                </>
              }
              <div className="mb-3">
                <Accordion
                  className="accordion-top-spacing"
                  activeKey={defaultResponse}
                  onSelect={e => {
                    if (e === '0') {
                      setDefaultResponse('0')
                    } else {
                      setDefaultResponse('-1')
                    }
                  }}
                >
                  <Card>
                    <CustomToggle eventKey="0">Advanced Response</CustomToggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className="d-flex pt-5" id="card-body-bulk">
                          <div
                            className="form-group col-md-5"
                            style={values.serviceResponseType === serviceResponseType.SAVE ? {display: 'none'} : {}}
                          >
                            <label
                              className="helpetTextLabel options-bold-text count-box"
                              htmlFor="randomCount"
                            >
                              Data Output - In Count
                            </label>
                            <div className="custom-control custom-switch col-md-9 count-label">
                              <Tooltip content="Toggle Status" direction="extreme">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="isBulkDataCount"
                                  name="isBulkDataCount"
                                  onChange={handleChangeBulkCountSize}
                                  checked={props.values.isBulkDataCount === true}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="isBulkDataCount"
                                  aria-label="Save"
                                />
                              </Tooltip>
                            </div>
                            <input
                              type="number"
                              className="form-control"
                              id="bulkDataCount"
                              placeholder="1"
                              min="1"
                              max="1000000"
                              name="bulkDataCount"
                              onKeyDown={ (evt) => numberInput.includes(evt.key) && evt.preventDefault() }
                              onChange={handleChange}
                              value={values.bulkDataCount}
                              disabled={!props.values.isBulkDataCount}
                            />
                            <span className="helperTextSize heading-text">Max:1000000</span>
                            {values.bulkDataCount < 1 && (
                              <div className="input-feedback text-danger">Value cannot be less than 1</div>
                            )}
                          </div>
                          <div
                            className="form-group col-md-5"
                            style={values.serviceResponseType === serviceResponseType.SAVE ? {display: 'none'} : {}}
                          >
                            <label
                              className="helpetTextLabel options-bold-text size-box"
                              htmlFor="randomSize"
                            >
                              Data Output - In Size
                            </label>
                            <div
                              className="custom-control custom-switch col-md-9"
                              id="bulkDataSizeToggle"
                            >
                              <Tooltip content="Toggle Status" direction="extreme">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="isBulkDataSize"
                                  name="isBulkDataSize"
                                  onChange={handleChangeBulkCountSize}
                                  checked={props.values.isBulkDataSize === true}
                                />
                                <label
                                  className="custom-control-label"
                                  aria-label="Save1"
                                  htmlFor="isBulkDataSize"
                                />
                              </Tooltip>
                            </div>
                            <input
                              type="number"
                              className="form-control"
                              id="bulkDataSize"
                              placeholder="1"
                              name="bulkDataSize"
                              onKeyDown={ (evt) => numberInput.includes(evt.key) && evt.preventDefault() }
                              min="1"
                              max="20"
                              onChange={handleChange}
                              value={values.bulkDataSize}
                              disabled={!props.values.isBulkDataSize}
                            />
                            <span className="helperTextSize heading-text">Max: 20MB</span>
                            {values.bulkDataSize < 1 && (
                              <div className="input-feedback text-danger">Value cannot be less than 1</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group form-inline col-md-12">
                          <p htmlFor="inputDelay" className="options-bold-text form-delay">
                            Delay(s) (in seconds)
                          </p>
                          <div className="custom-control custom-switch col-md-2">
                            <input
                              data-testid="delay"
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch1"
                              name="isDelay"
                              onChange={handleChange}
                              value={values.isDelay}
                              checked={values.isDelay}
                            />
                            <label
                              data-testid="box"
                              className="custom-control-label"
                              htmlFor="customSwitch1"
                              aria-label="Save"
                            />
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            id="inputProject"
                            placeholder="Delay"
                            name="delaySeconds"
                            min="1"
                            max="60"
                            onChange={handleChange}
                            disabled={values.isDelay === false}
                            value={values.delaySeconds}
                            ref={delayResponseRef}
                          />
                          {(values.isDelay && ((props.values.delaySeconds <= 0) || (props.values.delaySeconds > 60))) && 
                            <div className="input-feedback m-l-10 text-danger">Delay response should be between 1 to 60 seconds</div>
                          }
                        </div>
                        <div
                          style={{
                            display: data.isDynamicOptionDisplayed ? 'block' : 'none',
                          }}
                        >
                          <div className="form-group form-inline col-md-12">
                            <p
                              htmlFor="inputDynamicResponse"
                              className="options-bold-text form-delay"
                            >
                              Dynamic Response
                            </p>
                            <div className="custom-control custom-switch col-md-2">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="dynamicResponse"
                                name="isDynamicResponse"
                                onChange={handleChange}
                                value={values.isDynamicResponse}
                                checked={values.isDynamicResponse}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="dynamicResponse"
                                aria-label="Save"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          id="dynamicOptions"
                          style={{
                            display: values.isDynamicResponse ? 'block' : 'none',
                          }}
                        >
                          <div className="d-flex">
                            <div className="form-group col-md-5">
                              <label htmlFor="inputDynamicKeyLabel" className="options-bold-text">
                                Select Key
                              </label>
                            </div>
                            <div className="form-group col-md-6">
                              <JsonEditorKey
                                text={editorKeyText}
                                mode="tree"
                                indentation={4}
                                dynamicKeys={dynamicKeys}
                                setDynamicKeys={setDynamicKeys}
                                value={props.values.dynamicResponseKey}
                              />
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="dummyInput3"
                                name="dummyInput3"
                                onChange="true"
                                checked="true"
                                ref={dynamicResponseKeyRef}
                              />
                              {errors.dynamicResponseKey && touched.dynamicResponseKey && (
                                <div className="input-feedback text-danger py-1">
                                  {errors.dynamicResponseKey}
                                </div>
                              )}
                              {(previewButtonClicked || saveButtonClicked) &&
                                props.values.dynamicResponseKey === '' && (
                                  <div className="input-feedback text-danger" id="input-error">
                                    Response key is required
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="pl-3 mt-2">
                            <span className="options-bold-text random-specific-padding">
                              Dynamic Response Type
                            </span>
                            <Field
                              component={RandomSpecificToggle}
                              name="randomSpecific"
                              id="random"
                              label="Random"
                            />
                            <Field
                              component={RandomSpecificToggle}
                              name="randomSpecific"
                              id="specific"
                              label="Specific"
                            />
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="dummyInput"
                              name="dummyInput"
                              onChange={handleChange}
                              value="true"
                              checked="true"
                            />

                            <div
                              className="mb-3"
                              style={{
                                display:
                                  props.values.randomSpecific === 'random' ? 'none' : 'block',
                              }}
                            >
                              <div className="form-group " style={{height: '250px'}}>
                                <label
                                  htmlFor="inputDynamicResSpecKeyValue"
                                  className="options-bold-text"
                                >
                                  Specific Response
                                </label>
                                <div className='responsetype'>
                                  <label> 
                                    <input
                                      type="radio"
                                      value="json"
                                      name="responseDataType"
                                      onChange={handleSpecificResponseChange}
                                      checked={textSpecificKey.textType === "json"}
                                    />Json
                                  </label>
                                  <label> 
                                    <input
                                      type="radio"
                                      value="other"
                                      name="responseDataType"
                                      onChange={handleSpecificResponseChange}
                                      checked={textSpecificKey.textType === "other"}
                                    />Other
                                  </label>
                                </div>
                                {textSpecificKey.textType === "json" ? <span>
                                  <JsonEditor
                                    text={textSpecificKey.jsontext}
                                    mode={modeSpecificKey}
                                    modes={modes}
                                    indentation={4}
                                    onChangeText={onChangeTextSpecificKey}
                                    onModeChange={onModeChangeSpecificKey}
                                    value={textSpecificKey.jsontext}
                                    height="true"
                                    setJsonEditorError={setJsonEditorErrorSpecific}
                                    {...props}
                                  />
                                  {errors.dynamicResponseSpecificKeyValue &&
                                    touched.dynamicResponseSpecificKeyValue && (
                                      <div
                                        style={{marginTop: '-5px'}}
                                        className="input-feedback text-danger"
                                      >
                                        {errors.dynamicResponseSpecificKeyValue}
                                      </div>
                                    )}
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="dummyInput5"
                                    name="dummyInput5"
                                    onChange="true"
                                    checked="true"
                                    ref={dynamicResponseKeyValueRef}
                                  />
                                  {(previewButtonClicked || saveButtonClicked) &&
                                    textSpecificKey.jsontext === '' &&
                                    props.values.randomSpecific !== 'random' && (
                                      <div
                                        className="input-feedback text-danger"
                                        id="input-error-specific"
                                      >
                                        Specific response is required
                                      </div>
                                    )}
                                  {(previewButtonClicked || saveButtonClicked) &&
                                    (jsonEditorErrorSpecific || !IsJsonString(textSpecificKey.jsontext)) && (
                                      <div
                                        className="input-feedback text-danger"
                                        id="input-error-specific"
                                      >
                                        Please provide valid json response
                                      </div>
                                    )}
                                </span> : <span>
                                  <textarea onChange={onChangeSpecificKey} defaultValue={textSpecificKey.othertext} />
                                  {(previewButtonClicked || saveButtonClicked) &&
                                    textSpecificKey.othertext === '' &&
                                    props.values.randomSpecific !== 'random' && (
                                      <div
                                        className="input-feedback text-danger"
                                        id="other-input-error-specific"
                                      >
                                        Specific response is required
                                      </div>
                                    )}
                                </span>}
                              </div>
                            </div>
                            <br />
                            <div
                              className="d-flex pt-5"
                              style={{
                                marginTop:
                                  props.values.randomSpecific === 'random' ? '-25px' : '65px',
                              }}
                            >
                              <div className="form-group col-md-5">
                                <label
                                  className="helpetTextLabel options-bold-text count-box"
                                  htmlFor="randomCount"
                                >
                                  Data Output - In Count
                                </label>
                                <div className="custom-control custom-switch col-md-9 count-label">
                                  <Tooltip content="Toggle Status" direction="extreme">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="randomCountSwitch"
                                      name="isDynamicImportCount"
                                      onChange={handleChangeCountSize}
                                      checked={props.values.isDynamicImportCount === true}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="randomCountSwitch"
                                      aria-label="Save"
                                    />
                                  </Tooltip>
                                </div>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="randomCount"
                                  placeholder="1"
                                  min="1"
                                  max="1000000"
                                  onKeyDown={ (evt) => numberInput.includes(evt.key) && evt.preventDefault() }
                                  name="dynamicImportCount"
                                  onChange={handleChange}
                                  value={values.dynamicImportCount}
                                  disabled={!props.values.isDynamicImportCount}
                                />
                                <span className="helperTextSize heading-text">Max:1000000</span>
                                {values.dynamicImportCount < 1 && (
                                  <div className="input-feedback text-danger">Value cannot be less than 1</div>
                                )}
                              </div>
                              <div className="form-group col-md-5">
                                <label
                                  className="helpetTextLabel options-bold-text size-box"
                                  htmlFor="randomSize"
                                >
                                  Data Output - In Size
                                </label>
                                <div className="custom-control custom-switch col-md-9 toggle-count-label">
                                  <Tooltip content="Toggle Status" direction="extreme">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="randomSizeSwitch"
                                      name="isDynamicImportSize"
                                      onChange={handleChangeCountSize}
                                      checked={props.values.isDynamicImportSize === true}
                                    />
                                    <label
                                      className="custom-control-label"
                                      aria-label="Save1"
                                      htmlFor="randomSizeSwitch"
                                    />
                                  </Tooltip>
                                </div>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="randomSize"
                                  placeholder="1"
                                  name="dynamicImportSize"
                                  min="1"
                                  max="20480"
                                  onKeyDown={ (evt) => numberInput.includes(evt.key) && evt.preventDefault() }
                                  onChange={handleChange}
                                  value={values.dynamicImportSize}
                                  disabled={!props.values.isDynamicImportSize}
                                />
                                <span className="helperTextSize heading-text">
                                  Max: 20MB
                                </span>
                                {values.dynamicImportSize < 1 && (
                                  <div className="input-feedback text-danger">Value cannot be less than 1</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>

              <Accordion
                className="accordion-spacing"
                activeKey={defaultOptions}
                onSelect={e => {
                  if (e === '0') {
                    setDefaultOptions('0')
                  } else {
                    setDefaultOptions('-1')
                  }
                }}
              >
                <Card>
                  <CustomToggle eventKey="0">Other Options</CustomToggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="card-body">
                        <button
                          data-testid="headerbtn"
                          type="button"
                          onClick={handlerAddHeaders}
                          className="btn btn-primary mb-2"
                        >
                          <img src={buttonCircle} alt="button_circle" className="circle-img" />
                          Headers
                        </button>
                        <div id="headers">
                          {fields.map((field, idx) => {
                            return (
                              <div
                                className="d-flex align-items-center justify-content-between"
                                key={`${field}-${idx}`}
                              >
                                <div className="form-group col-md-5">
                                  <label htmlFor="inputApi" className="heading-text">
                                    Key
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputApi"
                                    name={`headers[${idx}].key`}
                                    placeholder="Enter the key"
                                    onChange={handleChange}
                                    value={values.headers[idx] ? values.headers[idx].key : ''}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label htmlFor="inputReqUrl" className="heading-text">
                                    Value
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputReqUrl"
                                    name={`headers[${idx}].value`}
                                    onChange={handleChange}
                                    placeholder="Enter the Value"
                                    value={values.headers[idx] ? values.headers[idx].value : ''}
                                  />
                                </div>
                                <button
                                  data-testid="handleRemoveButton"
                                  type="button"
                                  className="btn btn-light h-25 mt-3 delete-btn"
                                  onClick={() => handleRemove(idx)}
                                >
                                  <img src={deleteTrash} alt="delete_trash" className="trash-img" />
                                  Delete
                                </button>
                              </div>
                            )
                          })}
                        </div>
                        <br />
                        <div id="params">
                          {params.map((field, idx) => {
                            return (
                              <div
                                className="d-flex align-items-center justify-content-between"
                                key={`${field}-${idx}`}
                              >
                                <div className="form-group col-md-5">
                                  <label htmlFor="inputApi" className="heading-text">
                                    Key
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputApi"
                                    placeholder="Enter the key"
                                    name={`params[${idx}].key`}
                                    onChange={handleChange}
                                    value={values.params[idx] ? values.params[idx].key : ''}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label htmlFor="inputReqUrl" className="heading-text">
                                    Value
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputReqUrl"
                                    placeholder="Enter the Value"
                                    name={`params[${idx}].value`}
                                    onChange={handleChange}
                                    value={values.params[idx] ? values.params[idx].value : ''}
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-light h-25 mt-3 delete-btn"
                                  onClick={() => handleRemoveParmas(idx)}
                                >
                                  <img src={deleteTrash} alt="delete_trash" className="trash-img" />
                                  Delete
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputContentType" className="heading-text">
                    Content-Type{' '}
                  </label>
                  <select
                    name="contentType"
                    id="inputContentType"
                    className="form-control options-bold-text"
                    onChange={handleChange}
                    value={values.contentType}
                  >
                    <option>Text/Plain</option>
                    <option>Application/Json</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputMockName" className="heading-text">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="form-control options-bold-text"
                    name="mockName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="inputMockName"
                    value={values.mockName}
                    ref={mockNameRef}
                  />
                  {errors.mockName && touched.mockName && (
                    <div className="input-feedback text-danger">{errors.mockName}</div>
                  )}
                </div>
              </div>
            </div>
            <div style={props.values.mockId || isFullFormDisplay ? {} : {display: 'none'}}>
              <Field
                component={RadioButtonStatus}
                name="mockStatus"
                id="mockStatus"
                label="Mock Status Active"
              />
              <br />
              <div className="d-flex justify-content-start mr-2">
                <button
                  type="submit"
                  className="btn btn-success saveBtn"
                  onClick={handleSubmitClick}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-info previewBtn"
                  disabled={values.serviceResponseType === serviceResponseType.SAVE}
                  onClick={handlePreviewBtnClick}
                >
                  Preview
                </button>
              </div>
            </div>
          </form>
          <Preview
            {...props}
            method={values.method}
            statusCode={values.statusCode}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            isPending={props?.createPreviewMock?.isPending}
          />
        </div>
      </div>
    </div>)}
  </div>
  )
}
const mapStateToProps = state => ({
  successList: state.projectList,
  createMock: state.createMock,
  createMockTemp: state.createMock,
  fileUploadStatus: state.fileUpload,
  mockListResponse: state.mockList,
  saveReference: state.saveReference,
  createPreviewMock: state.createPreviewMock,
  isEditPending: state.createMock.isPending
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      mockListAction,
      fetchListById,
      flushMockData,
      createPreviewMockAction,
      flushMockStatus,
      flushPreviewMockData,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CreateMock)
