# Token Api(s)

## Get Project Token 

### Request
```
var axios = require('axios');
var config = {
  method: 'get',
  url: 'http://localhost:9000/api/token/projectId/:projectId',
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
<br/>

### Response
```
"message": "Token Detail",
"status": 200,
"data": {
    "_id": "638dacc647f5bc36ccbe2438",
    "projectId": "638dacc647f5bc36ccbe2435",
    "userId": "61b2c6dc04a12d2e04a302a9",
    "token": "829hf9h9832y982ythg923h9g2",
    "createdAt": "2022-12-05T08:33:10.459Z",
    "updatedAt": "2022-12-23T06:25:34.883Z",
    "__v": 0
}
```
```
"message": "Record not found.",
"status": 204,
```
<br/><br/>

## Update Project Token

### Request
```
var axios = require('axios');
var data = JSON.stringify({"userId":"5ee9bb30ae65d45d0831011f","token":"irest-trial2"});

var config = {
  method: 'put',
  url: 'http://localhost:9000/api/token/projectId/:projectId',
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

### Payload

Params | Description
--- | ---
userId | Mandatory
token | token value

<br /><br />

### Response

```
"message": "Token Updated Successfully.",
"status": 201
```
```
"message": "Record not found.",
"status": 204,
```
<br /><br />

## Delete Project Token

### Request
```
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'http://localhost:9000/api/token/projectId/:projectId',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(response));
})
.catch(function (error) {
  console.log(error);
});

```
### Response

```
"message": "Token Deleted Successfully.",
"status": 202
```
<br /><br />

## Get Mock Token 

### Request
```
var axios = require('axios');
var config = {
  method: 'get',
  url: 'http://localhost:9000/api/token/mockId/:mockId',
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
<br/>

### Response
```
"message": "Token Detail",
"status": 200,
"data": {
    "_id": "63a54bd0459897496c8cd3c7",
    "mockId": "638dd2de2081cd63984836f4",
    "userId": "61b2c6dc04a12d2e04a302a9",
    "token": "sdhf7834gbrigb34g9443g",
    "createdAt": "2022-12-23T06:33:52.344Z",
    "updatedAt": "2022-12-23T06:33:52.344Z",
    "__v": 0
}
```
```
"message": "Record not found.",
"status": 204,
```
<br/><br/>

## Update Mock Token

### Request
```
var axios = require('axios');
var data = JSON.stringify({"userId":"5ee9bb30ae65d45d0831011f","token":""});

var config = {
  method: 'put',
  url: 'http://localhost:9000/api/token/mockId/:mockId',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response));
})
.catch(function (error) {
  console.log(error);
});

```

### Payload

Params | Description
--- | ---
userId | Mandatory
token | token value

### Api Considerations
This api will generate a new token record for mock if mock not found else will update existing record.

<br /><br />

### Response
-In case no record exist then new record will added.
```
"message": "Token details added for mock.",
"status": 200,
 "data": {
        "_id": "63aae9260bbacd546cbd6a71",
        "mockId": "62989a67f57a8b56cc36de3b",
        "userId": "61b2c6dc04a12d2e04a302a9",
        "token": "sdhf7834gbrigb34g9443g",
        "createdAt": "2022-12-27T12:46:30.930Z",
        "updatedAt": "2022-12-27T12:46:30.930Z",
        "__v": 0
    }
```
-In case record exist then record will be updated.
```
"message": "Token Updated Successfully.",
"status": 201
```
<br /><br />
