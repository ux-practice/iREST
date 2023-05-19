# iRest (Simulator Api)

### Request

```
var axios = require('axios');

var config = {
  method: <any>,
  url: 'http://localhost:9000/api/rest/:projectName/:endpoint',
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

There are multiple usecases for end user, according to the different usecase different kind of response user will get.

<br />

There are some Common usecases which are applied to app simulation Api.

_Common Usecase 1_

No Mock Data <br/>
Returns a 404 response with no Matching Mock Found.
<br/>

_Common Usecase 2_

Non Matching Mock <br/>
If Mock Url matched with the requested Url but requested method does not match, it will follow the Api Response standards and return 405, Method not allowed.
<br/>

_Common Usecase 3_

Disabled Mock <br />
If Mock status is found in disabled state, User will get 404 error with message mock is disabled.
<br />

_Common Usecase 4_

Custom Headers <br />
If there is any custom headers added in the metadata of the Api, the Api will return those custom headers in Api response.
<br />

_Common Usecase 5_

Delay <br />
If there is any delay added to metadata of the Api, the will response after n amount of seconds. Maximum delay for the Api Response is 60 Seconds (1 Minute).

<br />

_Common Usecase 6_
<br />
If the requested methods is not found in the allowed method list, the Api will simply returns 404 Not Found. This usecase is similar to Common Usecase 2 mentioned above however the behaviour is different.

There are 3 types of records for which iRest simulate the response:

- `Default`: Expected a REST data from the data in response. It may or may not be having dynamic response.
- `Save`: Expected a record to be create/update/edit/delete in to database
- `Existing`: Expecteded a fetched list of records stored during creation of `save` type.

<br />

_Default Response Type_

_Config_

| Parameter   | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| Method      | `GET` or `POST`                                                            |
| projectName | Name of project under which your mock is created                           |
| endpoint    | endpoint of mock, stored in metadata when mock is created from create Api. |

<br />

_Default Response Type Usecase 1_
<br />
Normal Response: Returns the JSON/Plain-Text stored in service response collection for corresponding record.
<br />

_Default Response Type Usecase 2_ (applicable for Content-Type: Application/json)
<br />

- Dynamic Response For Specific Key (Random Key Value & Dynamic Count): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records as mentioned in count value.
  - The Value type is generally long string values containing n fake entries, where n is the count value.
  - The data count below 100000 (1 Lakh) records sends as normal json response.
  - The data count above 100000 (1 Lakh) records upto 1000000 (10 Lakhs) records will be sended as data stream with additional headers `'Transfer-Encoding': 'chunked'`
  - We are not entertaining data count above 1000000 (10 Lakh).

- Dynamic Response For Specific Key (Random Key Value & Dynamic Size): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records of mentioned KBs of data.
  - The Value type is generally long string values containing fake entries.
  - The data size below 1024 KB (1 MB) records sends as normal json response.
  - The data size above 100000 (1 MB) records upto 20480 KB (20 MB) records will be sended as data stream with additional headers `'Transfer-Encoding': 'chunked'`
  - We are not entertaining data size above 20480 KB (20 MB).

- Dynamic Response For Specific Key (Specific Key Value & Dynamic Count): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records as mentioned in count value.
  - The Value type is mentioned Json/Object/String type values mentioned in keyValue containing n entries, where n is the count value.
  - The data count below 100000 (1 Lakh) records sends as normal json response.
  - The data count above 100000 (1 Lakh) records upto 1000000 (10 Lakhs) records will be sended as data stream with additional headers `'Transfer-Encoding': 'chunked'`
  - We are not entertaining data count above 1000000 (10 Lakh).

- Dynamic Response For Specific Key (Specific Key Value & Dynamic Size): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records of mentioned KBs of data.
  - The Value type is mentioned Json/Object/String type values mentioned in keyValue entries
  - The data size below 1024 KB (1 MB) records sends as normal json response.
  - The data size above 100000 (1 MB) records upto 20480 KB (20 MB) records will be sended as data stream with additional headers `'Transfer-Encoding': 'chunked'`
  - We are not entertaining data size above 20480 KB (20 MB).

<br /><br />

_Dynamic Key Values Options_

- Dynamic Key of array type & dynamic key value of object type
  - Dynamic Key: `answers: []`
  - Dynamic Value: `{'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}`

Generated Dynmaic Value

```
  answers: [
    {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ]
```

- Dynamic Key of array type & dynamic key value of array type
  - Dynamic Key: `answers: []`
  - Dynamic Value: `[{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}]`

Generated Dynmaic Value

```
  answers: [
    [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}]
  ]
```

- Dynamic Key of array type & dynamic key value of string type
  - Dynamic Key: `answers: {}`
  - Dynamic Value: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'`

Generated Dynmaic Value

```
  answers: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  ]
```

- Dynamic Key of object type & dynamic key value of object type
  - Dynamic Key: `answers: {}`
  - Dynamic Value: `{'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}`

Generated Dynmaic Value

```
  answers: {
    0: {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    1: {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    2: {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    3: {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    4: {'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
  }
```

- Dynamic Key of object type & dynamic key value of array type
  - Dynamic Key: `answers: {}`
  - Dynamic Value: `[{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}]`

Generated Dynmaic Value

```
  answers: {
    0: [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    1: [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    2: [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    3: [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}],
    4: [{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}]
  }
```

- Dynamic Key of object type & dynamic key value of string type
  - Dynamic Key: `answers: []`
  - Dynamic Value: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'`

Generated Dynmaic Value

```
  answers: {
    0: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
```

- Dynamic Key of string type & dynamic key value of object type
  - Dynamic Key: `answers: ''`
  - Dynamic Value: `{'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}`

Generated Dynmaic Value

```
  answers: '
    {answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}
    {answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}
    {answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}
    {answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}
    {answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}
  '
```

- Dynamic Key of string type & dynamic key value of array type
  - Dynamic Key: `answers: ''`
  - Dynamic Value: `[{'answer1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, {'answer'2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}]`

Generated Dynmaic Value

```
  answers: '
    [{answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}]
    [{answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}]
    [{answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}]
    [{answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}]
    [{answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.}]
  '
```

- Dynamic Key of string type & dynamic key value of string type
  - Dynamic Key: `answers: ''`
  - Dynamic Value: `'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'`

Generated Dynmaic Value

```
  answers: '
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  '
```

<br />
<br />

_Save Response Type_

_Config_

| Parameter   | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| Method      | `POST`, `PUT`, `PATCH`, `DELETE`                                           |
| projectName | Name of project under which your mock is created                           |
| endpoint    | endpoint of mock, stored in metadata when mock is created from create Api. |

There are 4 types of Api user can create and use in their project

- POST Method
  - Stores a record in JSON/Plain-Text format in serviceResponse table
- PUT Method
  - Overwriting the JSON/Plain-Text record created in save POST Api.
- PATCH method
  - Update the JSON record created in save POST Api.
  - This updates JSON record only. This method does not work with Plain-Text.
- DELETE Method
  - Delete a JSON/Plain-Text record created in save POST Api.

_Existing Response Type_

_Config_

| Parameter   | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| Method      | `GET`                                                                      |
| projectName | Name of project under which your mock is created                           |
| endpoint    | endpoint of mock, stored in metadata when mock is created from create Api. |

There is only single usecase for existing Api.

- Existing Api will returns the list of records end-user stored for `save` type Api.
