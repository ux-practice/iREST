import React, {useState, useEffect, useRef} from 'react'
import 'rapidoc'
import RapiDoc from '../common/RapiDoc'
import './style.css'

function PreviewWrapper(props) {
  const dataRef = useRef(null)
  const [result, setResult] = useState({})

  const spec = () => {
    const strSpec = {
      swagger: '2.0',
      info: {
        description: '',
        version: '',
        title: '',
        termsOfService: '',
        contact: {
          email: '',
        },
      },
      host: 'iRest.swagger.io',
      basePath: '/v2',
      tags: [
        {
          name: 'iRest',
          description: 'Everything about iRest',
          externalDocs: {
            description: 'Find out more',
            url: 'http://swagger.io',
          },
        },
      ],
      paths: {...result},
      securityDefinitions: {
        api_key: {
          type: 'apiKey',
          name: 'api_key',
          in: 'header',
        },
        iRest_auth: {
          type: 'oauth2',
          authorizationUrl: 'https://iRest.swagger.io/oauth/authorize',
          flow: 'implicit',
          scopes: {
            'read:iRest': 'read your iRest',
            'write:iRest': 'modify iRest in your account',
          },
        },
      },
      definitions: {},
      externalDocs: {
        description: 'Find out more about Swagger',
        url: 'http://swagger.io',
      },
    }
    dataRef.current.loadSpec(strSpec)
  }

  useEffect(() => {
    spec()
  }, [result])

  useEffect(() => {
    if (props?.mock?.data?.mockUrl) {
      /* eslint-disable prefer-template */
      const newApi = '/api/mockPreview?tempId=' + props?.mock?.data?.id
      const method = props?.method[0].toLowerCase()
      const postMethod = props?.method[1]?.toLowerCase()
      const statusCode = props?.statusCode
      setResult({
        [newApi]: {
          [method]: {
            summary: '',
            description: props?.mock?.data?.mockName,
            operationId: '',
            consumes: ['multipart/form-data'],
            produces: ['application/json'],
            parameters: [],
            responses: {
              [statusCode]: {
                description: '',
                schema: {
                  $ref: '#/definitions/iRest',
                },
              },
            },
          },
          [postMethod]: {
            summary: '',
            description: props?.mock?.data?.mockName,
            operationId: '',
            consumes: ['multipart/form-data'],
            produces: ['application/json'],
            parameters: [],
            responses: {
              [statusCode]: {
                description: '',
                schema: {
                  $ref: '#/definitions/iRest',
                },
              },
            },
          },
        },
      })
    }
  }, [props.mock])

  return (
    <div className='preview-wrapper'>
      <RapiDoc
        style={{height: '100vh', width: '105%', marginLeft: '-20px', marginTop: '-20px'}}
        data={dataRef}
        renderStyle="focused"
        showHeader="false"
        showInfo="false"
        allowAuthentication="false"
        allowAdvancedSearch="false"
        allowSpecFileLoad="false"
        allowSearch="false"
      />
    </div>
  )
}

export default PreviewWrapper
