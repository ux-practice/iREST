## iRest: Rest API Simulator
### END USER MANUAL
<br />

**Table of Contents**
=============================

- [Mock List Section](#mock-list-section)
  - [Mock Status](#mock-status)
  - [Delete a Mock](#delete-a-mock)
  - [Edit Authentication Type and Token](#edit-authentication-type-and-token)
  - [Delete Token](#delete-token)
  - [Change Token](#change-token)
  - [Get the Mock URL](#get-the-mock-url)
  - [Create a Mock](#create-a-mock)
  - [Edit a Mock](#edit-a-mock)
  - [Try Mock](#try-mock)
  - [Create a Preview Mock](#create-a-preview-mock)
- [Simulate a Default GET API](#simulate-a-default-get-api)
- [Simulate a Default POST API](#simulate-a-default-post-api)
- [Simulate a Save POST API](#simulate-a-save-post-api)
- [Simulate a Save PUT API](#simulate-a-save-put-api)
- [Simulate a Save PATCH API](#simulate-a-save-patch-api)
- [Simulate a Save DELETE API](#simulate-a-save-delete-api)
- [API Authentication Token](#api-authentication-token)
- [Project List Section](#project-list-section)
  - [Edit a Project](#edit-a-project)
  - [Delete a Project](#delete-a-project)
  - [Change Authentication](#change-authentication)
  - [Edit Token](#edit-token)
  - [Delete Token](#delete-token)
  - [Change Token](#change-token)
<br />

# Mock List Section

Mock List section consists all your created mocks in one place. This section consists various functionalities.

## Mock Status

* Login into iRest.
* Go to Mock List Section.
* Choose a Mock for which you want to change the status.
* Click on the Play/Pause Icon to Enable/Disable respectively under the Start/Stop Column.
* Verify your API.

## Delete a Mock

* Login into iRest.
* Go to Mock List Section.
* Choose a Mock for which you want to delete permanently.
* Under the Actions column, Click on the delete Icon to delete your mock permanently.

## Edit Authentication Type and Token

* Login into iRest.
* Go to Mock List Page.
* Click on the Key Icon under *ACTION* column.
* On popup,you can select authentication type to be updated.
* Three options are available for authentication type- *Project Specific*, *Mock Specific* & Off.
* Token can be updated for authentication type *Mock Specific*.
* Cilck on *UPDATE* button.

## Delete Token

* Login into iRest.
* Go to Mock List Page.
* Click on the Key Icon under *ACTION* column.
* Select authentication type *Mock Specific* if not selected already.
* A textbox with delete icon will appear, click on delete icon to delete token

## Change Token

* Login into iRest.
* Go to Mock List Page.
* Click on the Key Icon under *ACTION* column..
* Select authentication type *Mock Specific* if not selected already.
* Cick on refresh icon it will generate new value.
* Cilck on *UPDATE* button.

## Get the Mock URL

* Login into iRest.
* Go to Mock List Section.
* Choose a Mock for which you want to copy the URL.
* Under the URL column, Click on the copy Icon below the URL. It will copy your URL to your clipboard. Paste it wherever you need it.

## Create a Mock

* Login into iRest.
* Go to Mock List Page.
* Click on the Add Icon on bottom right corner on the page.
* On the next page there are various fields as listed below.
* Fill the form & click on submit to create a mock.

## Create Mock Fields

* Base URL – A predefined field consists of base URL of the mock.
* Project Name – A searchable input field for creating or choosing an existing project.
* To create a new project, type in the value and click on add icon to create a new project.
* For existing project, type in the search value in input box and choose an existing project from the dropdown.
*Endpoint – An input field for the endpoint of the mock URL. Type in your suitable endpoint in this field.

The complete URL is the combination of above fields: Base URL + Project Name + Endpoint. For eg.

http://localhost/api/rest (Base URL) + test-project-name (Project Name) + test-endpoint (Endpoint)

The complete Mock URL looks like the below one:

http://localhost/api/rest/test-project-name/test-endpoint

* Mock Type - Mock Type could be any of three mentioned below. Choose one of them as per your requirements.
* Default: Return the JSON/Plain-Text Data in Response with certain optional advanced options such as delay, dynamic records, etc.
* Save: Mock APIs with CRUD Operations such as create, modify and delete the record.
* Existing: A Listing API with all the records stored during the CRUD Operation in 2nd type (Save) of API.

* Request Method - The HTTP request method of API call among GET/ POST/ PUT/ PATCH/ DELETE http methods. Choose an HTTP method which you want to use in your project.

In the basic scenario, a user want to retrieve the data only. In such scenarios, only GET/ POST methods are sufficient to receive the data. You can simply choose mock type as ‘Default’ and choose a request method from GET/POST.

If the complex scenario such as CRUD requirements, you can simply choose mock type ‘Save’ and

Choose a request method from POST/PUT/PATCH/DELETE.

There is another specific scenario where you want to retrieve all your stored records at once during implementing the POST call to save the data. For such scenarios, you can create an API with mock type ‘Existing’. These scenario helps you to create a record list API.



* Response Status Code - The HTTP response status code from the API. It could be any one of these status codes: 200/ 400/ 401/ 500/ 502. Please choose one that suite your requirements.

* Content Encoding - Content Encoding of data. Default value sets to ‘UTF-8’.

Mock Name – Name of the mock. Type in the value to set the name of your mock.

* Mock Status - A checkbox for toggle the active state of mock. If checkbox is ticked, mock will be enabled. Otherwise you need to update the mock status from listing page.

Additional Fields

The below additional fields scenario specific. Depends upon the type of mock you choose, these field will be available as per the specific use case.

### Scenario 1

For mock type “Default”, these additional fields needed to be filled along with previous fields.

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

* Choose Count Option and write the number of records you want within input field. Max count limits to 1000000 (10 Lakhs). Records above 100000 (1 Lakh), needs streaming to be enabled from client end.
* Choose Size Option, and write the size of records in KB within input field. The Max size limit is 20480 KB (20 MB). Records above 1024 KB (1 MB), needs streaming to be enabled from client end.


### Scenario 2

For mock type “Save”, these additional fields needed to be filled along with previous fields.

Advanced Response - Optional, this contains some optional fields user can choose if required.
* Delay – If you want to your response to be delayed by a few seconds, you can use this toggle button. Once you enable it, it will open an input against it. Enter the value in seconds you want to delay. 60 seconds is the maximum limit for delay.

### Scenario 3

For mock type “Existing”, these additional fields needed to be filled along with previous fields.

Advanced Response - Optional, this contains some optional fields user can choose if required.
1)Delay – If you want to your response to be delayed by a few seconds, you can use this toggle button. Once you enable it, it will open an input against it. Enter the value in seconds you want to delay. 60 seconds is the maximum limit for delay.

Optional Fields

Advanced Options - Optional for user, this contains some optional fields user can choose.
-Headers: A combination of key/value pair of response headers. You can fill any amount of custom headers. These custom headers will be added to the API response.
-Params: A combination of key/value pair of request parameters. A user can fill any amount of custom parameters. There is not limit for the number of request parameters. You can use the request headers with the request URL of the mock.

## Edit a Mock

* Login into iRest.
* Go to Mock List Page.
* Choose a Mock for which you want to edit a mock.
* Click on the Edit Icon from the record.
* On the next page edit the fields on the page & click on submit to update the mock. Check the create mock section for the each fields detail.

## Try Mock

* Login into iRest.
* Go to Mock List Page.
* Click on the View Icon under *ACTION* column.
* On the next page there are all api listed in left section and in right section view part.
* Select any api from left panel and click on *TRY* button in right section.
* Selected api response can be seen in right panel.
* Kindly refer to RapiDoc example here [RapiDoc](https://rapidocweb.com/examples.html) for more insight.

## Create a Preview Mock

* Login into iRest.
* Go to Mock List Page.
* Click on the Add Icon on bottom right corner on the page.
* On the next page there are various fields as listed below.
* Fill the form & click on Preview button create a Preview mock.

## Create Mock Fields

* Base URL – A predefined field consists of base URL of the mock.
* Project Name – A searchable input field for creating or choosing an existing project.
* To create a new project, type in the value and click on add icon to create a new project.
* For existing project, type in the search value in input box and choose an existing project from the dropdown.
-Endpoint – An input field for the endpoint of the mock URL. Type in your suitable endpoint in this field.

The complete URL is the combination of above fields: Base URL + Project Name + Endpoint. For eg.

http://localhost/api/rest (Base URL) + test-project-name (Project Name) + test-endpoint (Endpoint)

The complete Mock URL looks like the below one:

http://localhost/api/rest/test-project-name/test-endpoint

* Mock Type - Mock Type could be any of three mentioned below. Choose one of them as per your requirements.
* Default: Return the JSON/Plain-Text Data in Response with certain optional advanced options such as delay, dynamic records, etc.
* Save: Mock APIs with CRUD Operations such as create, modify and delete the record.
* Existing: A Listing API with all the records stored during the CRUD Operation in 2nd type (Save) of API.

* Request Method - The HTTP request method of API call among GET/ POST/ PUT/ PATCH/ DELETE http methods. Choose an HTTP method which you want to use in your project.

In the basic scenario, a user want to retrieve the data only. In such scenarios, only GET/ POST methods are sufficient to receive the data. You can simply choose mock type as ‘Default’ and choose a request method from GET/POST.

If the complex scenario such as CRUD requirements, you can simply choose mock type ‘Save’ and

Choose a request method from POST/PUT/PATCH/DELETE.

There is another specific scenario where you want to retrieve all your stored records at once during implementing the POST call to save the data. For such scenarios, you can create an API with mock type ‘Existing’. These scenario helps you to create a record list API.



* Response Status Code - The HTTP response status code from the API. It could be any one of these status codes: 200/ 400/ 401/ 500/ 502. Please choose one that suite your requirements.

* Content Encoding - Content Encoding of data. Default value sets to ‘UTF-8’.

Mock Name – Name of the mock. Type in the value to set the name of your mock.

* Mock Status - A checkbox for toggle the active state of mock. If checkbox is ticked, mock will be enabled. Otherwise you need to update the mock status from listing page.

Additional Fields

The below additional fields scenario specific. Depends upon the type of mock you choose, these field will be available as per the specific use case.

Scenario 1

For mock type “Default”, these additional fields needed to be filled along with previous fields.

* Content Type - A list of all the content type which is expected from the Mock API response. Choose an option between these two fields: Text/Plain, Application/JSON.
* Response Body - Write down the response body data which you are expecting as your API response.

(OR)

* Upload Response Body – Click on upload button and attach your large JSON response body you are expecting from your API. Once you upload the file, all the content is populated into the response body input.
* Dropdown for quantity of bulk records - Dropdown consists 2 options, count & size.
* Choose Count Option and write the number of records you want within input field. Max count limits to 20.
* Choose Size Option, and write the size of records in KB within input field. The Max size limit is 20KB (0.02 MB).

* Advanced Response - Optional, this contains some optional fields user can choose if required.
* Delay – If you want to your response to be delayed by a few seconds, you can use this toggle button. Once you enable it, it will open an input against it. Enter the value in seconds you want to delay. 60 seconds is the maximum limit for delay.
* Dynamic Response – If you want to give dynamic data that will increase your data records limits up to an extent. You can enable the dynamic option and use it in your API. This Section consists the field mentioned below.
* Key - A Key from the JSON response body section on which dynamic operation is operated.
* Dropdown for Type of Key Value - Dropdown consists 2 options, random & specific.
* Choose Random type of key value if you need dummy data to be prefilled from the API end.
* If you choose Specific type of key value, an input field should be added for key value. You need to specify the value of the key on yourself. The value will be repeated in the Key within your response body which you mentioned in last step.

Dropdown for quantity of dynamic records - Dropdown consists 2 options, count & size.

* Choose Count Option and write the number of records you want within input field. Max count limits to 20.

Choose Size Option, and write the size of records in KB within input field. The Max size limit is 20 KB (0.02 MB).

## Simulate a Default GET API
</br>

* Default get api can be utilize by adding *iRest-auth-token* in header/query/cookie.
* Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*

![default get response](./src/static/assets/images/iRest_files/defaultGetApi.PNG "Default get api")
</br></br>

## Simulate a default POST API
</br>

* Default post api can be utilize by adding *iRest-auth-token* in header/query/cookie.
* Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*

![default post response](./src/static/assets/images/iRest_files/defaultPostApi.PNG "Default post api")
</br></br>

## Simulate a save POST API
</br>

* Default post api can be utilize by adding *iRest-auth-token* in header/query/cookie.
*  Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*
* Add payload in body.

![save post response](./src/static/assets/images/iRest_files/postApi.PNG "Save post  api")
</br></br>

## Simulate a save PUT API
</br>

* Put api can be utilize by adding *iRest-auth-token* in header/query/cookie & *IREST_RECORD_ID* in query.
*  Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*
* Add payload in body.
*  *IREST_RECORD_ID* can be taken from response of get api.

![save put response](./src/static/assets/images/iRest_files/putApi.PNG "Save put api")
</br></br>

## Simulate a save PATCH API
</br>

* Patch api can be utilize by adding *iRest-auth-token* in header/query/cookie & *IREST_RECORD_ID* in query.
*  Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*
* Add payload in body.
*  *IREST_RECORD_ID* can be taken from response of get api.

![save patch response](./src/static/assets/images/iRest_files/patchApi.PNG "Save patch api")
</br></br>

## Simulate a save DELETE API
</br>

* Delete api can be utilize by adding *iRest-auth-token* in header/query/cookie & *IREST_RECORD_ID* in query.
*  Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*
*  *IREST_RECORD_ID* can be taken from response of get api.

![save delete response](./src/static/assets/images/iRest_files/deleteApi.PNG "Save delete  api")
</br></br>

## API Authentication Token

* To access an api, token need to be added.
* Token can be added in *headers*, *query* Or *cookie*.
* *iRest-auth-token* is token key to be used.
* Use project auth token for *Project Specific* mock otherwise use mock auth token if authentication type is *Mock Specific*
* If authentication type is off, token can be ignored.

### Token in query
![Token in query](./src/static/assets/images/iRest_files/tokenInQuery.PNG "Token in query")
</br></br>

### Token in header
![Token in header](./src/static/assets/images/iRest_files/tokenInHeader.PNG "Token in header")
</br></br>

### Token in cookie
![Token in cookie](./src/static/assets/images/iRest_files/tokenInCookie.PNG "Token in cookie")
</br></br>

# Project List Section

Project List section consists all your projects in one place. This section consists various functionalities.

## Edit a Project

* Login into iRest.
* Go to Project List Section.
* Click on edit icon under *ACTION* column.
* Edit project name & click on *UPDATE* button.

## Delete a Project
*Note: All mocks associated with a project should be deleted before any project deletion*
* Login into iRest.
* Go to Project List Section.
* Choose a Project for which you want to delete permanently.
* Under the Actions column, Click on the delete Icon to delete your project permanently.

## Change Authentication

* Login into iRest.
* Go to Project List Section.
* Click toggle button under *AUTHENTICATION* column to enable/disable authentication for any project.

## Edit Token

* Login into iRest.
* Go to Project List Page.
* Click on the Key Icon under *ACTION* column..
* Edit token value in textbox inside popup.
* Cilck on *UPDATE* button.

## Delete Token

* Login into iRest.
* Go to Project List Page.
* Click on the Key Icon under *ACTION* column..
* A textbox with delete icon will appear, click on delete icon to delete token

## Change Token

* Login into iRest.
* Go to Project List Page.
* Click on the Key Icon under *ACTION* column.
* Cick on refresh icon it will generate new value.
* Cilck on *UPDATE* button.

        
