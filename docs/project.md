# Project Api(s)

## Project List

### Request
```
var axios = require('axios');
var params = {
  PageNo,
  searchQuery,
};
var config = {
  method: 'get',
  url: 'http://<server-url>/api/project/list',
  headers: { }
  params,
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

Params | Default Value | Description
------ | ------------- | -----------
PageNo | 1 | Pagination Value
searchQuery | undefined | Optional

<br/>

### Response
```
"status": 200, // success
"message": "Project List",
"data": {
  "projectList": [
    {
        _id,
        projectName,
    },
  ]
}
```

- API will return 204 No Data Found in case no project match the criteria

<br/><br/>

## Project Create

### Request
```
var axios = require('axios');
var data = JSON.stringify({"projectName":"irest-trial2"});

var config = {
  method: 'post',
  url: 'http://<server-url>/api/project/create',
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
projectName | Name of project

<br /><br />

### Response

```
"status": 201, // success
"message": "Project created Successfully.",

"data": {
  _id // projectId of new create project
  projectList" // all project List created by user
}
```

```
// If user not exist in records
"message": "User does not exists.",
"status": 400
```

```
status: 417 // duplicate
message: "Project Already Exist.",
```
