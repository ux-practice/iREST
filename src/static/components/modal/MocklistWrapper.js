import React, {useEffect, useRef} from 'react'
import {useSelector, connect, useDispatch} from 'react-redux'
import {mockListAction} from '../../actions/mockList/mockListActions'
import RapiDoc from '../common/RapiDoc'

function MocklistWrapper() {
   const method = {
    get:[{
      "in": "query",
      "name": "IREST_RECORD_ID",
      "description": " IREST_RECORD_ID",
      "required": false,
      "schema": {
        "type": "object",
    "required": [
      "IREST_RECORD_ID"
    ],
    "properties": {
      "IREST_RECORD_ID": {
        "type": "integer",
        "format": "int64"
      },
    }
      }
    }],
    post: [{
      "in": "body",
      "name": "body",
      "description": "Post api call",
      "required": true,
      "schema": {
        "type": "object",
        "required": [
          "Body",
        ],
        "properties": {
          "Body": {
            "type": "object",
            "example": {}
          },
        }
      }
    }],
    patch:[{
      "in": "query",
      "name": "IREST_RECORD_ID",
      "description": " IREST_RECORD_ID",
      "required": true,
      "schema": {
        "type": "object",
    "required": [
      "IREST_RECORD_ID"
    ],
    "properties": {
      "IREST_RECORD_ID": {
        "type": "integer",
        "format": "int64"
      },
    }
      }
    },{
      "in": "body",
      "name": "body",
      "description": "Item id that needs to be updated and its name",
      "required": true,
      "schema": {
        "type": "object",
        "required": [
          "IREST_RECORD_ID"
        ],
        "properties": {
          "Body": {
          "type": "object",
          "example": {}
        },
        }
      }
    }],
      put:[{
        "in": "query",
        "name": "IREST_RECORD_ID",
        "description": " IREST_RECORD_ID",
        "required": true,
        "schema": {
          "type": "object",
      "required": [
        "IREST_RECORD_ID"
      ],
      "properties": {
        "IREST_RECORD_ID": {
          "type": "integer",
          "format": "int64"
        },
      }
        }
      },{
        "in": "body",
        "name": "body",
        "description": "Item id that needs to be updated and its name",
        "required": true,
        "schema": {
          "type": "object",
          "required": [
            "IREST_RECORD_ID"
          ],
          "properties": {
            "Body": {
              "type": "object",
              "example": {}
            },
          }
        }
      }],
      delete:[{
        "in": "query",
        "name": "IREST_RECORD_ID",
        "description": " IREST_RECORD_ID",
        "required": true,
        "schema": {
          "type": "object",
      "required": [
        "IREST_RECORD_ID"
      ],
      "properties": {
        "IREST_RECORD_ID": {
          "type": "integer",
          "format": "int64"
        },
      }
        }
      }]
  }
  const data = useRef(null)
  const result = {}
  const mockListResponse = useSelector(state => state.mockList.response)
  const dispatch = useDispatch()
  const mocklist = mockListResponse?.data?.mockList
  mocklist.forEach(item => {
    const {statusCode} = item
    const staticFields = {
      apitype: item.serviceResponseType,
      endpoint: item.endpoint.split('/').pop(),
      tags: [item.projectName],
          description: 'About iRest',
          operationId: '',
          consumes: ["application/json"],
          produces: ['application/json'],
          responses: {
            [statusCode]: {
              description: statusCode === '200' ? 'successful operation': '',
            } 
          },
    }
    const host = window.location.href.split('/dashboard')
    const dataurl = item.endpoint.split(host[0])
    const methods = {}
    item.allowedMethods.forEach(apiMethod => {
      methods[apiMethod.toLowerCase()] = {
        ...staticFields,
        summary: staticFields.endpoint,
        parameters: staticFields.apitype.toLowerCase() === "default" ? '' : method[apiMethod.toLowerCase()],
      }
    })
    result[dataurl[1]] = {
      ...methods,
    }
  })

  const spec = () => {
    const strSpec = {
      swagger: '2.0',
      info: {
        description: '',
        version: '1.0.6',
        title: 'Swagger iRest',
        termsOfService: 'http://swagger.io/terms/',
        contact: {
          email: 'iRest@impetus.com',
        },
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
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
      definitions: {
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'Category',
          },
        },
        iRest: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            category: {
              $ref: '#/definitions/Category',
            },
            name: {
              type: 'string',
              example: 'iRest',
            },
            tags: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                xml: {
                  name: 'tag',
                },
                $ref: '#/definitions/Tag',
              },
            },
          },
          xml: {
            name: 'iRest',
          },
        },
        Tag: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'Tag',
          },
        },
      },
      externalDocs: {
        description: 'Find out more about Swagger',
        url: 'http://swagger.io',
      },
    }
    data.current.loadSpec(strSpec)
  }

  useEffect(() => {
    spec()
  }, [])

  useEffect(() => {
    dispatch(mockListAction())
  }, [])
  
  return (
    <div>
      <RapiDoc
       renderStyle="focused"
       data={data}
       showHeader="false"
       showInfo="false"
       allowAuthentication="false"
       allowAdvancedSearch="false"
       allowSpecFileLoad="false"
       usePathInNavBar="true"
       keyName="rapidDoc"
       keyValue
       keyLocation="query"
      />
    </div>
  )
}

export default connect(null)(MocklistWrapper)
