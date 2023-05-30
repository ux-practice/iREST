# JSON Upload

Request

```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('large_data_file.json'));

var config = {
  method: 'post',
  url: 'http://localhost:9000/api//file/json-upload',
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
