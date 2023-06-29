## Parameters

```
var axios = require('axios');

var config = {
  method: <any>,
  url: 'http://<server-url>/api/rest/:projectName/:endpoint',
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

* Base URL – A predefined field consists of base URL of the mock.
* Project Name – A searchable input field for creating or choosing an existing project.
* To create a new project, type in the value and click on add icon to create a new project.
* For existing project, type in the search value in input box and choose an existing project from the dropdown.
* Endpoint – An input field for the endpoint of the mock URL. Type in your suitable endpoint in this field.

The complete URL is the combination of above fields: Base URL + Project Name + Endpoint. For eg.

`http://<server-url>/api/rest (Base URL) + test-project-name (Project Name) + test-endpoint (Endpoint)`

The complete Mock URL looks like the below one:

`http://<server-url>/api/rest/test-project-name/test-endpoint`

* Mock Type - Mock Type could be any of two mentioned below. Choose one of them as per your requirements.
  * Fetch: Return the JSON/Plain-Text Data in Response with certain optional advanced options such as delay, dynamic records, etc.
  * Save: Mock APIs with CRUD Operations such as create, modify and delete the record.

* Request Method - The HTTP request method of API call among GET/ POST/ PUT/ PATCH/ DELETE http methods. Choose an HTTP method which you want to use in your project.

<br />

There are 2 special type of APIs exits with iRest.

- `Fetch`: Expected a REST data from the data in response. It may or may not be having dynamic response.
- `Save`: Expected a record to be create/update/edit/delete in to database

## FETCH Method


### _Fetch Response Type_

_Config_

| Parameter   | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| Method      | `GET` or `POST`                                                            |
| projectName | Name of project under which your mock is created                           |
| endpoint    | endpoint of mock, stored in metadata when mock is created from create Api. |



In the basic scenario, a user want to retrieve the data only. In such scenarios, only GET/ POST methods are sufficient to receive the data. You can simply choose mock type as ‘Fetch’ and choose a request method from GET/POST.

For mock type "Fetch", these additional fields needed to be filled along with previous fields.

* Content Type - A list of all the content type which is expected from the Mock API response. Choose an option between these two fields: Text/Plain, Application/JSON.
* Response Body - Write down the response body data which you are expecting as your API response.
- Show Schema Modal is another way to create response body.This provide inbuilt dropdown option to create response.Below is procedure to use.
  - on create mock page, enable *Show Schema Modal*
  - It will show two field, a text box for field name & a select box for field type.
  -  Options available are String, Boolean, Number, Array, Object, Date & Faker.js.
  -  In case you select *Faker.js*, it will populate one mopre select box for type of faker data you want.
  - New field can be added by click on add icon.
  - Use cross icon button for removing any addded field.

(OR)

Upload Response Body – Click on upload button and attach your large JSON response body you are expecting from your API. Once you upload the file, all the content is populated into the response body input.
* Dropdown for quantity of bulk records - Dropdown consists 2 options, count & size.
* Choose Count Option and write the number of records you want within input field. Max count limits to 1000000 (10 Lakhs). Records above 100000 (1 Lakh), needs streaming to be enabled from client end.
* Choose Size Option, and write the size of records in KB within input field. The Max size limit is 20480 KB (20 MB). Records above 1024 KB (1 MB), needs streaming to be enabled from client end.

Advanced Response - Optional, this contains some optional fields user can choose if required.
* Delay – If you want to your response to be delayed by a few seconds, you can use this toggle button. Once you enable it, it will open an input against it. Enter the value in seconds you want to delay. 60 seconds is the maximum limit for delay.
* Dynamic Response – If you want to give dynamic data that will increase your data records limits up to an extent. You can enable the dynamic option and use it in your API. This Section consists the field mentioned below.
* Key - A Key from the JSON response body section on which dynamic operation is operated.
* Dropdown for Type of Key Value - Dropdown consists 2 options, random & specific.
* Choose Random type of key value if you need dummy data to be prefilled from the API end.
* If you choose Specific type of key value, an input field should be added for key value. You need to specify the value of the key on yourself. The value will be repeated in the Key within your response body which you mentioned in last step.

Dropdown for quantity of dynamic records - Dropdown consists 2 options, count & size.

* Choose Count Option and write the number of records you want within input field. Max count limits to 100000 (1 Lakhs)
* Choose Size Option, and write the size of records in KB within input field. The Max size limit is 1024 KB (1 MB).


- Dynamic Response For Specific Key (Random Key Value & Dynamic Count): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records as mentioned in count value.
  - The Value type is generally long string values containing n fake entries, where n is the count value.
  - The data count below 100000 (1 Lakh) records sends as normal json response.
  - We are not entertaining data count above 1 Lakh (1 Lakh).

- Dynamic Response For Specific Key (Random Key Value & Dynamic Size): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records of mentioned KBs of data.
  - The Value type is generally long string values containing fake entries.
  - The data size below 1024 KB (1 MB) records sends as normal json response.
  - We are not entertaining data count above 1 Lakh (1 Lakh).

- Dynamic Response For Specific Key (Specific Key Value & Dynamic Count): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records as mentioned in count value.
  - The Value type is mentioned Json/Object/String type values mentioned in keyValue containing n entries, where n is the count value.
  - The data count below 100000 (1 Lakh) records sends as normal json response.
   - We are not entertaining data count above 1 Lakh (1 Lakh).

- Dynamic Response For Specific Key (Specific Key Value & Dynamic Size): Returns the response with dynamic records value of JSON Key mentioned.

  - The Value of Key has multiple records of mentioned KBs of data.
  - The Value type is mentioned Json/Object/String type values mentioned in keyValue entries
  - The data size below 1024 KB (1 MB) records sends as normal json response.
  - We are not entertaining data count above 1 Lakh (1 Lakh).

<br />

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

## SAVE (CRUD) Method

If the complex scenario such as CRUD requirements, you can simply choose mock type ‘Save’ and

Choose a request method from GET/POST/PUT/PATCH/DELETE.


_Save Response Type_

_Config_

| Parameter   | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| Method      | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`                                           |
| projectName | Name of project under which your mock is created                           |
| endpoint    | endpoint of mock, stored in metadata when mock is created from create Api. |

There are 5 types of Api user can create and use in their project

- GET Method
  - Option 1
    - Get all record list in JSON/Plain-Text format from serviceResponse table
  - Option 2
    - Get single record list in JSON/Plain-Text format from serviceResponse table by passing iREST_RECORD_ID as query parameters.
- POST Method
  - Stores a record in JSON/Plain-Text format in serviceResponse table
- PUT Method
  - Overwriting the JSON/Plain-Text record created in save POST Api.
- PATCH method
  - Update the JSON record created in save POST Api.
  - This updates JSON record only. This method does not work with Plain-Text.
- DELETE Method
  - Delete a JSON/Plain-Text record created in save POST Api.


* Response Status Code - The HTTP response status code from the API. It could be any one of these status codes: 200/ 400/ 401/ 500/ 502. Please choose one that suite your requirements.

* Content Encoding - Content Encoding of data. Default value sets to ‘UTF-8’.

Mock Name – Name of the mock. Type in the value to set the name of your mock.

* Mock Status - A checkbox for toggle the active state of mock. If checkbox is ticked, mock will be enabled. Otherwise you need to update the mock status from listing page.

Additional Fields

The below additional fields scenario specific. Depends upon the type of mock you choose, these field will be available as per the specific use case.


For mock type “Save”, these additional fields needed to be filled along with previous fields.

Advanced Response - Optional, this contains some optional fields user can choose if required.
* Delay – If you want to your response to be delayed by a few seconds, you can use this toggle button. Once you enable it, it will open an input against it. Enter the value in seconds you want to delay. 60 seconds is the maximum limit for delay.

Optional Fields

Advanced Options - Optional for user, this contains some optional fields user can choose.
-Headers: A combination of key/value pair of response headers. You can fill any amount of custom headers. These custom headers will be added to the API response.
-Params: A combination of key/value pair of request parameters. A user can fill any amount of custom parameters. There is not limit for the number of request parameters. You can use the request headers with the request URL of the mock.

## Common Usecase

There are some common usecases which are applied to iRest APIs.

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

<br/> 

## API Authentication

Option 1: 
In case of project authentication, authentication can be enabled using a token at project level or it could be off. 
Option 2:
For mock created, there are three type of authentication available, it can consider the parent token authentication, it's own authentication or disabled

<b>
Note: Authentication at child level would be rely on parent project authentication if not set at mock level.
</b>