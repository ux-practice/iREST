import React, {useState} from 'react'
import {Formik} from 'formik'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import {createMockAction} from '../../actions/createMock/createMockAction'
import CreateMock from './CreateMockPage'
import {IsJsonString, isJson} from '../../../server/helpers/util'

const Form = props => {
  const {
    match: {
      params: {mockId},
    },
  } = props

  const [mockListError, setMockListError] = useState(false)

  const submit = data => {
    const newData = {...data}
    const {mockStatus} = data
    newData.mockStatus =
      mockStatus === 'enabled' || mockStatus === true || mockStatus === 'true'
        ? 'enabled'
        : 'disabled'

    newData.isPreview = false

    if (newData?.isBulkDataSize) {
      const bulkSize = newData.bulkDataSize * 1024
      newData.bulkDataSize = bulkSize
    }

    const newHeaders = newData?.headers?.filter(e => e)
    newData.headers = newHeaders
    let isJsonEditorError = false
    const {ApiResponseSchemaTypes} = newData
    Object.keys(ApiResponseSchemaTypes).forEach((arst) => {
      if (!isJson(ApiResponseSchemaTypes[arst])) {
        isJsonEditorError = true
      }
    })

    if (newData.serviceResponseType === 'existing') {
      /* eslint-disable no-unused-vars */
      const {
        serviceResponse,
        serviceResponseBody,
        serviceResponseBodyType,
        ...updatedData
      } = newData 

      updatedData.referenceId = props.saveReference

      if (
        (updatedData.referenceId === '' || updatedData.referenceId === null) &&
        props.mockListResponse.response.data &&
        props.mockListResponse.response.data.mockList &&
        props.mockListResponse.response.data.mockList.length > 0
      ) {
        setMockListError(true)
      } else if (
        props.mockListResponse.response.data &&
        props.mockListResponse.response.data.mockList &&
        props.mockListResponse.response.data.mockList.length === 0
      ) {
        setMockListError(true)
      } else {
        props.dispatch(createMockAction(updatedData))
      }
    } else if (newData.serviceResponseType === 'default') {
      /* eslint-disable no-lonely-if */
      if (
        newData?.isDynamicResponse &&
        newData?.dynamicResponseSpecific &&
        newData?.dynamicResponseSpecificKeyValue !== '' &&
        newData?.dynamicResponseKey !== '[]' &&
        newData?.specificResponseType === 'json' &&
        IsJsonString(newData?.serviceResponseBody) &&
        !isJsonEditorError &&
        IsJsonString(newData?.dynamicResponseSpecificKeyValue)
      ) {
        props.dispatch(createMockAction(newData))
      } else if ( newData?.isDynamicResponse &&
        newData?.dynamicResponseSpecific &&
        newData?.dynamicResponseSpecificKeyValue !== '' &&
        newData?.dynamicResponseKey !== '[]' &&
        !isJsonEditorError &&
        newData?.specificResponseType === 'other') {
          props.dispatch(createMockAction(newData))
      } else if (
        newData?.isDynamicResponse &&
        newData?.dynamicResponseRandom &&
        newData?.dynamicResponseKey !== '[]' &&
        IsJsonString(newData?.serviceResponseBody) &&
        !isJsonEditorError &&
        IsJsonString(newData?.dynamicResponseSpecificKeyValue)
      ) {
        props.dispatch(createMockAction(newData))
      } else if (
        !newData?.isDynamicResponse &&
        IsJsonString(newData?.serviceResponseBody) &&
        !isJsonEditorError &&
        IsJsonString(newData?.dynamicResponseSpecificKeyValue)
      ) {
        props.dispatch(createMockAction(newData))
      }
    } else {
      if (newData?.endpoint && newData?.projectName && newData?.mockName && !isJsonEditorError) {
        props.dispatch(createMockAction(newData))
      }
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          
          projectId: '',
          projectName: '',
          serviceResponseBody: '',
          serviceResponseType: 'default',
          serviceResponseBodyType: 'default',
          referenceId: '',
          path: 'http://localhost:9000',
          endpoint: '',
          method: 'GET',
          statusCode: 200,
          isDelay: false,
          delaySeconds: 1,
          headers: [],
          params: [],
          contentEncoding: 'UTF-8',
          contentType: 'Application/Json',
          mockName: `Mock_${Math.floor(10 ** 4 + Math.random() * ((10 ** 5) - (10 ** 4) - 1))}`,
          mockId: mockId || '',
          mockStatus: 'enabled',
          randomSpecific: 'random',
          isDynamicResponse: false,
          dynamicResponseKey: '[]',
          dynamicResponseRandom: true,
          dynamicResponseSpecific: false,
          dynamicResponseSpecificKeyValue: '',
          isDynamicImportCount: true,
          dynamicImportCount: 1,
          isDynamicImportSize: false,
          dynamicImportSize: 1024,
          bulkDataCount: 1,
          isBulkDataCount: true,
          bulkDataSize: 20,
          isBulkDataSize: false,
          allowedMethods: [],
          isSchema: false,
          schemaResponse: [{name: 'field', type: 'string', fakerValue: '$address.buildingNumber'} ],
        }}
        validationSchema={Yup.object().shape({
          projectName: Yup.string(),
          endpoint: Yup.string()
            .required('Endpoint name is required')
            .matches(/^[0-9a-zA-Z_$-.+!*'(),]/, 'Space and special characters are not allowed'),
          mockName: Yup.string().trim().required('Mock name is required'),
          serviceResponseType: Yup.string(),
          serviceResponseBody: Yup.string().when('serviceResponseType', {
            is: 'default',
            then: Yup.string().required('Response body is required'),
          otherwise: Yup.string(),
          }),
          isDynamicResponse: Yup.boolean(),
          dynamicResponseKey: Yup.string().when('isDynamicResponse', {
            is: true,
            then: Yup.string(),
          }),
          dynamicResponseSpecificKeyValue: Yup.string(),
          schemaResponse: Yup.array().of(Yup.object().shape({
            name: Yup.string().when('isSchema', {
              is: true,
              then: Yup.string(),
              otherwise: Yup.string()
              .matches(/^[0-9a-zA-Z_\[|\]!@#$%^&*()+={}:;'\\<>,.?\/|-]+$/, 'Space and special characters are not allowed')
              .required('This Field is Required'),
            }),
          }))
        })}
        render={data => {
          let bulkSize = 0
          if (data?.values?.bulkDataSize && data?.values?.bulkDataSize > 20) {
            bulkSize = data?.values?.bulkDataSize
            data.values.bulkDataSize = bulkSize / 1024
          }

          const nullKeys = Object.keys(data.values).filter(key => data.values[key] === null)
          if (nullKeys.length > 0) {
            // eslint-disable-next-line no-return-assign
            nullKeys.forEach(key => data.values[key] = data.initialValues[key])
          }
          return (
            <CreateMock
              {...data}
              mockId={mockId}
              mockListError={mockListError}
              setMockListError={setMockListError}
            />
          )
        }}
        onSubmit={submit}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    createMock: state.createMock,
    saveReference: state.saveReference,
    mockListResponse: state.mockList,
  }
}

export default connect(mapStateToProps, null)(Form)
