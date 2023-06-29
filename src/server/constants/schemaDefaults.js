// api status constants
export const status = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
}

// mock service response options
export const serviceResponseType = {
  DEFAULT_SERVICE_RESPONSE: 'default',
  SAVE: 'save',
  EXISTING_API: 'existing',
}

export const mockMethodList = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}

// schemas model name constants
export const modelList = {
  USER_MODEL: 'User',
  PROJECT_MODEL: 'Project',
  SERVICE_RESPONSE_MODEL: 'ServiceResponse',
  MOCK_MODEL: 'Mock',
  PREVIEW_MOCK_MODEL: 'TempMock',
  PREVIEW_SERVICE_RESPONSE_MODEL: 'TempServiceResponse',
  TOKEN_MODEL: 'Token',
  API_RESPONSES_SCHEMA_TYPES:'ApiResponseSchemaType',
  PREVIEW_API_RESPONSES_SCHEMA_TYPES:'TempApiResponseSchemaType'
}

export const statusCode = {
  statusCode200: 200,
  statusCode401: 401,
  statusCode404: 404,
  statusCode500: 500,
  statusCode502: 502,
}

export const contentEncoding = {
  DEFAULT_ENCODING: 'UTF-8',
}

export const contentTypeList = {
  PLAIN_TEXT: 'Text/Plain',
  APPLICATION_JSON: 'Application/Json',
}

export const dataLimits = {
  dataSize: 20971520, // 20 MB
  dataCount: 1000000, // 10 Lakh
  nonStreamDataSize: 1048576, // 1 MB
  nonStreamDataCount: 100000 // 1 Lakh
}

export const MOCK_TOKEN_AUTEHNTICATION_TYPE = {
  PROJECT_SPECIFIC: "PROJECT_SPECIFIC",
  MOCK_SPECIFIC:"MOCK_SPECIFIC",
  OFF:"OFF"
}

export const iRestAuthToken = "iRest-auth-token"