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
  url: '<server-url>/api/login',
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
var data = JSON.stringify({"authenticationType":true});

var config = {
  method: 'put',
  url: 'http://<server-url>/api/authentication/projectId/:projectId',
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
authenticationType | Type of Authentication

<br /><br />

In case of project authentication, there are 2 types of authenticationType allowed: `true` or `false`. <br />
For mock created, there are three type of authentication available, it can consider the parent authentication, it's own authentication or off i.e. false

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


## Update Mock authenticationType

### Request
```
var axios = require('axios');
var data = JSON.stringify({"authenticationType":true});

var config = {
  method: 'put',
  url: 'http://<server-url>/api/authentication/mockId/:mockId',
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
authenticationType | Type of Authentication

<br /><br />


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
<b>
Note: In case of project authentication, there are 2 types of authenticationType allowed: `true` or `false`. <br />
For mock created, there are three type of authentication available, it can consider the parent authentication, it's own authentication or off i.e. false
</b>