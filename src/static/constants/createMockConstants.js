
export const fieldTypes = [
    {key: 'string', value: 'String'},
    {key: 'fakerJs', value: 'Faker.js'},
    {key: 'boolean', value: 'Boolean'},
    {key: 'number', value: 'Number'},
    {key: 'object', value: 'Object'},
    {key: 'array', value: 'Array'},
    {key: 'date', value: 'Date'},
  ]

export const fakerObj = {
  username: '$internet.userName',
  knownIps: ['$internet.ip', '$internet.ipv6'],
  profile: {
    firstName: '$name.firstName',
    lastName: '$name.lastName',
    staticData: [100, 200, 300],
  },
}

export const serviceResponseType = Object.freeze({
  SAVE: 'save',
  EXISTING: 'existing',
  DEFAULT: 'default',
})


export const saveAPIResponseType = {
  "GET": {"value": "{\"message\":\"Record List!\",\"status\":\"200\",\"data\":\"$dataArray\"}"},
  "GET_BY_ID": {"value": "{\"message\":\"Single Record\",\"status\":\"200\",\"data\":\"$dataObject\"}"},
  "POST": {"value": "{\"message\":\"Data stored Successfully.\",\"status\":\"200\",\"data\":{\"id\":\"$IREST_RECORD_ID\"}}"},
  "PUT": {"value": "{\"message\":\"Data updated Successfully.\",\"status\":\"200\",\"data\":{\"id\":\"$IREST_RECORD_ID\"}}"},
  "PATCH": {"value": "{\"message\":\"Data updated Successfully.\",\"status\":\"200\",\"data\":{\"id\":\"$IREST_RECORD_ID\"}}"},
  "DELETE": {"value": "{\"message\":\"Record deleted Successfully.\",\"status\":\"200\",\"data\":{\"id\":\"$IREST_RECORD_ID\"}}"}
}

export const fetchAPIResponseType = {
  "FETCH_NORMAL_RESPONSE": {"value": "{}"},
  "GET": {"value": "{}"},
  "POST": {"value": "{}"}
}
