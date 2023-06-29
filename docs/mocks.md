# Mock Api(s)

## Mock List

### Request

```
var axios = require('axios');
var params = {
  limit,
  offset,
  sortBy,
  order,
  projectId,
};
var config = {
  method: 'get',
  url: 'http://<server-url>/api/mock/list',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Query Params

| Params    | Default Value | Description                                                                               |
| --------- | ------------- | ------------------------------------------------------------------------------------------|
| limit     | 10            | Number of records required                                                                |
| offset    | 0             | Number of records to skip from beginning                                                  |
| sortBy    |      | Name of column to apply sort on.                                                                   |
| order     |      | order of sort 'asc' OR 'desc'                                                                      |
| projectId |      | Optional, ProjectId belongs to the mock                                                            |
| projectName |      | Optional, ProjectName belongs to the mock                                                        |
| serviceResponseType |      | Optional, serviceResponseType belongs to the mock, "default", "save"         |
| search    |      | Optional, return mocks matching mock name or project name                                          |



<br /><br />

## Mock Create

There are 2 types of records allowed to be created:

- `Fetch`: Expected a REST data from the data in response
- `Save`: Expected a record to be stored/update/edit in to database

## Fetch Mock Create API

### Request

```
var axios = require('axios');

var payload = {
    projectId,
    serviceResponseType,
    serviceResponseBody,
    projectName,
    method,
    path,
    endpoint,
    statusCode,
    isDelay,
    delaySeconds,
    contentType,
    mockName
    mockStatus,
    headers,
    params,
    isDynamicResponse,
    dynamicResponseKey,
    dynamicResponseRandom,
    dynamicResponseSpecific,
    dynamicResponseSpecificKeyValue,
    isDynamicImportCount,
    isDynamicImportSize,
    dynamicImportCount,
    bulkDataCount,
    isBulkDataCount,
    bulkDataSize,
    isBulkDataSize,
    ApiResponseSchemaTypes
};
var data = JSON.stringify(payload);

var config = {
  method: 'post',
  url: 'http://<server-url>/api/mock/create',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

### Payload Options

| Params                          | Description                                                                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| projectId                       | Mandatory, Id of the Project under which mock needs to be created                                                                                  |
| projectName                     | Mandatory, Name of Project under which mock is to be created                                                                                       |
| serviceResponseType             | `default`                                                                                                                                          |
| serviceResponseBody             | Mandatory, A JSON Object expected from the response body                                                                                           |
| method                          | `GET` or `POST`                                                                                                                                    |
| path                            | Mandatory, window.location.origin + MOCK_BASE_URL of the simulation API. MOCK_BASE_URL can be configured from .env                                 |
| endpoint                        | Mandatory, API endpoint for eg. project-list or user-profile, etc.                                                                                 |
| statusCode                      | Mandatory, Expected Status Code from response. Available Values: `200`, `401`, `404`, `500`, `502`                                                 |
| isDelay                         | Mandatory, `true` or `false`                                                                                                                       |
| delaySeconds                    | Needed to specify with `isDelay: true`. An Integer Value between 0 to 60.                                                                          |
| contentType                     | Mandatory, Content type of Api response. Available option: `Text/Plain`, `Application/Json`                                                        |
| mockName                        | Mandatory, Name of Mock                                                                                                                            |
| mockStatus                      | Mandatory, `enabled`/`disabled`                                                                                                                    |
| headers                         | An Array Consists of Headers For Eg. `[{'custom-header-1': 'custom-header-1-value'}, {'custom-header-2': 'custom-header-2-value'}]`. Default to [] |
| params                          | An Array Consists of Params For Eg. `[{'searchQuery': 'test'}, {'page': 3}]`. Default to []                                                        |
| isDynamicResponse               | Mandatory, `true` or `false`                                                                                                                       |
| dynamicResponseKey              | Key name for which dynamic operations applied                                                                                                      |
| dynamicResponseRandom           | Set to `true` if dynamic value could be of any random type                                                                                         |
| dynamicResponseSpecific         | Set to `true` if dynamic value could be of any specific type                                                                                       |
| dynamicResponseSpecificKeyValue | Could be an array, string or object value that needed to pushed to the `dynamicResponseKey`value with dynamic operations                           |
| isDynamicImportCount            | Set to `true` if number of dynamic records needed to set                                                                                           |
| dynamicImportCount              | Count of `dynamicResponseKey` value used with `isDynamicImportCount`. For eg. 100 or 245. Maximum is 1000000 records                               |
| isDynamicImportSize             | Set to `true` if size of dynamic records needed to set                                                                                             |
| dynamicImportSize               | Size of `dynamicResponseKey` value used with `isDynamicImportSize`. For eg. 50 or 500 in KB. Maximum is 20971520 KB (20 MB)                        |
| isBulkDataCount            | Set to `true` if number of dynamic records needed to set                                                                                           |
| bulkDataCount              | Count of `dynamicResponseKey` value used with `isBulkDataCount`. For eg. 100 or 245. Maximum is 1000000 records                               |
| isBulkDataSize             | Set to `true` if size of dynamic records needed to set                                                                                             |
| bulkDataSize               | Size of `dynamicResponseKey` value used with `isBulkDataSize`. For eg. 50 or 500 in KB. Maximum is 20971520 KB (20 MB)                        |
| ApiResponseSchemaTypes   | An Object which contains keys `GET` , `GET_BY_ID` , `POST` , `PUT` , `PATCH` , `DELETE`. To provide specific success response on each method cal;.
<br /><br />

### Api Considerations

- We can only enable one kind of dynamic data value in single Api. In another words, dynamic response value could be random or specific i.e. either `dynamicResponseRandom` can be `true` or `dynamicResponseSpecific` can be `true`.
- We can only enable either dynamic count or dynamic size in single Api i.e. `isDynamicImportCount` can be `true` or `isDynamicImportSize` can be `true`.
- `dynamicImportCount` key is needed only if `isDynamicImportCount` is `true`. The size is limited to 1000000 (10 Lakhs) records per Api Call. Also, if `0 < dynamicImportCount <= 100000 (1 Lakh)`, the data is send as normal JSON response however if `100000 (1 Lakh) < dynamicImportCount <= 1000000 (10 Lakh)`, the data will be convert into a stream format with additional response headers `'Transfer-Encoding': 'chunked'`.
- `dynamicImportSize` key is needed only if `isDynamicImportSize` is `true`. The size is limited to 1000000 (10 Lakhs) records per Api Call. Also, if `0 < dynamicImportSize <= 1024 KB (1 MB)`, the data is send as normal JSON response however if `1024 KB (1 MB) < dynamicImportSize <= 20480 KB (20 MB)`, the data will be convert into a stream format with additional response headers `'Transfer-Encoding': 'chunked'`.
- `delaySeconds` key is needed only if `isDelay` is `true`
- We can only enable either bulk count or bulk size in single Api i.e. `isBulkDataCount` can be `true` or `isBulkDataSize` can be `true`.
- `bulkDataCount` key is needed only if `isBulkDataCount` is `true`. The size is limited to 1000000 (10 Lakhs) records per Api Call. Also, if `0 < bulkDataCount <= 100000 (1 Lakh)`, the data is send as normal JSON response however if `100000 (1 Lakh) < bulkDataCount <= 1000000 (10 Lakh)`, the data will be convert into a stream format with additional response headers `'Transfer-Encoding': 'chunked'`.
- `bulkDataSize` key is needed only if `isBulkDataSize` is `true`. The size is limited to 1000000 (10 Lakhs) records per Api Call. Also, if `0 < bulkDataSize <= 1024 KB (1 MB)`, the data is send as normal JSON response however if `1024 KB (1 MB) < bulkDataSize <= 20480 KB (20 MB)`, the data will be convert into a stream format with additional response headers `'Transfer-Encoding': 'chunked'`.
- A Record for `fetch` type Api is stored in serviceResponse database collection after metadata stored in mock database collection

## Save Mock Create API

### Request

```
var axios = require('axios');
var payload = {
    projectId,
    serviceResponseType,
    projectName,
    method,
    path,
    endpoint,
    statusCode,
    isDelay,
    delaySeconds,
    contentType,
    mockName,
    mockStatus,
    headers,
    params,
    isDynamicResponse,
    ApiResponseSchemaTypes
};
var data = JSON.stringify(payload);

var config = {
  method: 'post',
  url: 'http://<server-url>/api/mock/create',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Payload Options

| Params              | Description                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| projectId           | Mandatory, Id of the Project under which mock needs to be created                                                                                  |
| projectName         | Mandatory, Name of Project under which mock is to be created                                                                                       |
| serviceResponseType | `save`                                                                                                                                             |
| method              | `POST`, `PUT`, `PATCH`, `DELETE`                                                                                                                   |
| path                | Mandatory, window.location.origin + MOCK_BASE_URL of the simulation API. MOCK_BASE_URL can be configured from .env                                 |
| endpoint            | Mandatory, API endpoint for eg. project-list or user-profile, etc.                                                                                 |
| statusCode          | Mandatory, Expected Status Code from response. Available Values: `200`, `401`, `404`, `500`, `502`                                                 |
| isDelay             | Mandatory, `true` or `false`                                                                                                                       |
| delaySeconds        | Needed to specify with `isDelay: true`. An Integer Value between 0 to 60.                                                                          |
| contentType         | Mandatory, Content type of Api response. Available option: `Text/Plain`, `Application/Json`                                                        |
| mockName            | Mandatory, Name of Mock                                                                                                                            |
| mockStatus          | Mandatory, `enabled`/`disabled`                                                                                                                    |
| headers             | An Array Consists of Headers For Eg. `[{'custom-header-1': 'custom-header-1-value'}, {'custom-header-2': 'custom-header-2-value'}]`. Default to [] |
| params              | []                                                                                                                                                 |
| isDynamicResponse   | `false`                                                                                                                                            |
| ApiResponseSchemaTypes   | An Object which contains keys `GET` , `GET_BY_ID` , `POST` , `PUT` , `PATCH` , `DELETE`. To provide specific success response on each method cal;.

<br /><br />

### API Considrations

- POST Method
  - Stores a record in JSON/Plain-Text format in serviceResponse table
- PUT Method
  - Overwriting the JSON/Plain-Text record created in save POST Api.
- PATCH method
  - Update the JSON record created in save POST Api.
  - This updates JSON record only. This method does not work with Plain-Text.
- DELETE Method
  - Delete a JSON/Plain-Text record created in save POST Api.
- During creation the of new Api, apart from basic validation, we are checking the <b>combination of endpoint and method is unique</b> in database. This can be done with indexding the combination of two fields in mongodb. If the combination is not unique, the Api will throw error for duplicate Api. In other words, Api can be creating on same endpoint but with different methods.
- A Record for `save` type Api is stored in serviceResponse database collection during user try to hit POST Api and stores the data. Once, the data is stored user can overide, modify or remove the response with `PUT`, `PATCH`, `DELETE` method, respectively.
- In some scenerios, user may overwrite the Api metadata, if that is the required step, we are deleted all the stored data related to it from serviceResponse table.

<br /><br />

## Mock Detail

### Request

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://<server-url>/api/mock/item/:mockId',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

### Response

_Scenerio 1: `Fetch` serviceResponseType_

```
{
  "message": "Mock Detail",
  "status": 200,
  "data": {
    mock: {
      status,
      serviceResponseType,
      path,
      method,
      statusCode,
      isDelay,
      contentEncoding
      contentType,
      mockStatus
      isDynamicResponse,
      _id
      projectId,
      projectName,
      endpoint,
      delaySeconds,
      headers: [
        {
          key,
          value
        }
      ],
      params: [
        {
          key,
          value,
        }
      ],
      mockName,
      dynamicResponseKey,
      dynamicResponseSpecific,
      dynamicResponseSpecificKeyValue,
      isDynamicImportSize,
      dynamicImportSize,
      endpointRequestPath,
      createdAt,
      updatedAt,
      serviceResponse: {
          status,
          _id,
          serviceResponseBody,
          mockId,
          contentType,
          createdAt,
          updatedAt,
      }
    },
    ApiResponseSchemaTypes : {
      GET,
      POST
    }
  }
}
```

<br />

_Scenerio 2: `save` serviceResponseType_

```
{
  "message": "Mock Detail",
  "status": 200,
  "data": {
    mock: {
      status,
      serviceResponseType,
      path,
      method,
      statusCode,
      isDelay,
      contentEncoding
      contentType,
      mockStatus
      isDynamicResponse,
      _id
      projectId,
      projectName,
      endpoint,
      delaySeconds,
      headers: [
        {
          key,
          value
        }
      ],
      params: [
        {
          key,
          value,
        }
      ],
      ApiResponseSchemaTypes : {
        GET,
        GET_BY_ID,
        POST,
        PUT,
        PATCH,
        DELETE
      },
      mockName,
      endpointRequestPath,
      createdAt,
      updatedAt
    
    }
  }
}
```

## Mock Update

### Request

Request Url for Mock Update: `http://<server-url>/api/mock/item/:mockId`.

<br />

- _Important Note_: During updation of any mock, all the serviceResponse(s) stored related to will be delete, irrespective of the serviceResponseType. It means, user will not be able to view older data once they update the Api metadata.
- User should not be able to update mock endpoint during the updation however it is available in request payload for other references.
- For Other _Request_, _Payload_, _Api consideration_ and _Response_, refer the Mock Create Api Section

### Mock Status

### Request

```
var axios = require('axios');
var payload = {
  mockStatus,
}
var data = JSON.stringify(payload);

var config = {
  method: 'patch',
  url: 'http://<server-url>/api/mock/item/:mockId',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

### Payload Details

| Params     | Description             |
| ---------- | ----------------------- |
| mockStatus | `enabled` or `disabled` |

### Response

```
// success
{
  "message": "Status changes succesfully.",
  "status": 200,
  data: {
    mock: {
      status,
      // remaining metadata
    }
  }
}
```

### Mock Delete

### Request

```
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'http://<server-url>/api/mock/item/:mockId',
  headers: {
    'Content-Type': 'application/json'
  },
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

### Payload Details

| Params     | Description             |
| ---------- | ----------------------- |
| mockId     | id associated with mock |

### Response

```
// success
{
  "message": "Mock Deleted Successfully.",
  "status": 202
}
```
<br /><br />

## Mock Create Preview

### Request

```
var axios = require('axios');

var payload = {
    projectId,
    serviceResponseType,
    serviceResponseBody,
    projectName,
    method,
    path,
    endpoint,
    statusCode,
    isDelay,
    delaySeconds,
    contentType,
    mockName,
    mockStatus,
    headers,
    params,
    isDynamicResponse,
    dynamicResponseKey,
    dynamicResponseRandom,
    dynamicResponseSpecific,
    dynamicResponseSpecificKeyValue,
    isDynamicImportCount,
    isDynamicImportSize,
    dynamicImportCount,
    bulkDataCount,
    isBulkDataCount,
    bulkDataSize,
    isBulkDataSize,
    TempApiResponseSchemaTypes
};
var data = JSON.stringify(payload);

var config = {
  method: 'post',
  url: 'http://<server-url>/api/mock/create?ispreview=true',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

### Payload Options

| Params                          | Description                                                                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| projectId                       | Mandatory, Id of the Project under which mock needs to be created                                                                                  |
| projectName                     | Mandatory, Name of Project under which mock is to be created                                                                                       |
| serviceResponseType             | `default`                                                                                                                                          |
| serviceResponseBody             | Mandatory, A JSON Object expected from the response body                                                                                           |
| method                          | `GET` or `POST`                                                                                                                                    |
| path                            | Mandatory, window.location.origin + MOCK_BASE_URL of the simulation API. MOCK_BASE_URL can be configured from .env                                 |
| endpoint                        | Mandatory, API endpoint for eg. project-list or user-profile, etc.                                                                                 |
| statusCode                      | Mandatory, Expected Status Code from response. Available Values: `200`, `401`, `404`, `500`, `502`                                                 |
| isDelay                         | Mandatory, `true` or `false`                                                                                                                       |
| delaySeconds                    | Needed to specify with `isDelay: true`. An Integer Value between 0 to 60.                                                                          |
| contentType                     | Mandatory, Content type of Api response. Available option: `Text/Plain`, `Application/Json`                                                        |
| mockName                        | Mandatory, Name of Mock                                                                                                                            |
| mockStatus                      | Mandatory, `enabled`/`disabled`                                                                                                                    |
| headers                         | An Array Consists of Headers For Eg. `[{'custom-header-1': 'custom-header-1-value'}, {'custom-header-2': 'custom-header-2-value'}]`. Default to [] |
| params                          | An Array Consists of Params For Eg. `[{'searchQuery': 'test'}, {'page': 3}]`. Default to []                                                        |
| isDynamicResponse               | Mandatory, `true` or `false`                                                                                                                       |
| dynamicResponseKey              | Key name for which dynamic operations applied                                                                                                      |
| dynamicResponseRandom           | Set to `true` if dynamic value could be of any random type                                                                                         |
| dynamicResponseSpecific         | Set to `true` if dynamic value could be of any specific type                                                                                       |
| dynamicResponseSpecificKeyValue | Could be an array, string or object value that needed to pushed to the `dynamicResponseKey`value with dynamic operations                           |
| isDynamicImportCount            | Set to `true` if number of dynamic records needed to set                                                                                           |
| dynamicImportCount              | Count of `dynamicResponseKey` value used with `isDynamicImportCount`. For eg. 10 or 15. Maximum is 20 records                               |
| isDynamicImportSize             | Set to `true` if size of dynamic records needed to set                                                                                             |
| dynamicImportSize               | Size of `dynamicResponseKey` value used with `isDynamicImportSize`. For eg. 10 or 20 in KB. Maximum is 20 KB (0.02 MB)                        |
| isBulkDataCount            | Set to `true` if number of dynamic records needed to set                                                                                     
| bulkDataCount              | Count of `dynamicResponseKey` value used with `isBulkDataCount`.For eg. 10 or 15. Maximum is 20 records.                            
| isBulkDataSize             | Set to `true` if size of dynamic records needed to set                                                                                             |
| bulkDataSize               | Size of `dynamicResponseKey` value used with `isBulkDataSize`. For eg. 10 or 20 in KB. Maximum is 20 KB (0.02MB)                        |
| TempApiResponseSchemaTypes   | An Object which contains keys `GET` , `GET_BY_ID` , `POST` , `PUT` , `PATCH` , `DELETE`. To provide specific success response on each method cal;.

<br /><br />

### Api Considerations

- We can only enable one kind of dynamic data value in single Api. In another words, dynamic response value could be random or specific i.e. either `dynamicResponseRandom` can be `true` or `dynamicResponseSpecific` can be `true`.
- We can only enable either dynamic count or dynamic size in single Api i.e. `isDynamicImportCount` can be `true` or `isDynamicImportSize` can be `true`.
- `dynamicImportCount` key is needed only if `isDynamicImportCount` is `true`. The size is limited to 20 records per Api Call. Also, if `0 < dynamicImportCount <= 20`, the data is send as normal JSON response however if `20 < dynamicImportCount`, the data will be convert into a stream format with additional response headers `'Transfer-Encoding': 'chunked'`.
- `dynamicImportSize` key is needed only if `isDynamicImportSize` is `true`. The size is limited to 20  records per Api Call.
- `delaySeconds` key is needed only if `isDelay` is `true`
- We can only enable either bulk count or bulk size in single Api i.e. `isBulkDataCount` can be `true` or `isBulkDataSize` can be `true`.
- `bulkDataCount` key is needed only if `isBulkDataCount` is `true`. The size is limited to 20 records per Api Call. `.
- `bulkDataSize` key is needed only if `isBulkDataSize` is `true`. The size is limited to 20KB records per Api Call.
- A Record for `Fetch` type Api is stored in serviceResponse database collection after metadata stored in mock database collection

### Fetch Mock Preview

### Request

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://<server-url>/api/mockPreview?tempId:',
  headers: {
    'Content-Type': 'application/json'
  },
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

### Payload Details

| Params     | Description             |
| ---------- | ----------------------- |
| id         | id associated with mock |

### Response

```
// success
{
  "status": 200
}
```
<br /><br />


## JSON Upload

Request

```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('large_data_file.json'));

var config = {
  method: 'post',
  url: 'http://<server-url>/api/file/json-upload',
  headers: {
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Response

```
// success
{
  "message": "JSON FILE DATA",
  "status": 200,
  data // JSON Data body
}
```


```
{
  "message": "File type must be of JSON type.", // if non-json file is being uploaded
  "status": 400
}
```


```
{
  "message": "Unable to Parse JSON.", // Invalid JSON Format Data
  "status": 400
}
```
<br /><br />