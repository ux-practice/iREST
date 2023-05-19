# User Registration

### Request
```
var axios = require('axios');
var data = JSON.stringify({"email":"someone@example.com","password":"pass@123"});

var config = {
  method: 'post',
  url: '/api/login',
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

### Response
```
status: 201 // Success
data: {
  email
}
message: 'User created successfully'
```

```
status: 417 // Duplicate User Request
message: 'User already register'
```

```
status: 400 // Bad Request
message: 'validation error'
```

## User Login

### Request
```
var axios = require('axios');
var data = JSON.stringify({"email":"someone@example.com","password":"pass@123"});

var config = {
  method: 'post',
  url: 'localhost:9000/api/login',
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

## Response
* A header has been added to response with token value ("x-access-token") for successful login
* Jwt secret has been set into `.env` file at project root

```
status: 200
message: 'Authorization successful.'
data: {
  email,
  name,
  _id // Unique UserId
}
```
<b>Note:</b>
<br />

Response Headers


```
status: 401
message: 'Unauthorized. Password mismatch error.'
```

```
status: 400
message: 'Email not found.'
```
<br /><br />

## Update Project authenticationType

### Request
```
var axios = require('axios');
var data = JSON.stringify({"userId":"5ee9bb30ae65d45d0831011f","authenticationType":true});

var config = {
  method: 'put',
  url: 'http://localhost:9000/api/authentication/projectId/:projectId',
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
authenticationType | Type of Authentication

<br /><br />

There are 2 types of authenticationType allowed to be created:
Either flag will be true or false

### Response

```
  "message": "Authentication Type Updated Successfully.",
  "status": 201
```

```
// If user not exist in records
"message": "User does not exists.",
"status": 400
```

```
status: 204
message: "Project does not exists.",
```