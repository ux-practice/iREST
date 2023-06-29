const createMockRequest = {
    "type": "CREATE_MOCK",
    "data": {
        "projectId": "e162b388-634a-4a16-acfc-a2c38e43c001",
        "projectName": "test1",
        "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
        "serviceResponseBody": "{\n    \"d\": \"dfs\"\n}",
        "serviceResponseType": "default",
        "serviceResponseBodyType": "default",
        "referenceId": "",
        "path": "http://localhost:9000",
        "endpoint": "sdfsdvb",
        "method": "GET",
        "statusCode": 200,
        "isDelay": false,
        "delaySeconds": 0,
        "headers": [],
        "params": [],
        "contentEncoding": "UTF-8",
        "contentType": "Application/Json",
        "mockName": "xz",
        "mockId": "",
        "mockStatus": "enabled",
        "randomSpecific": "random",
        "isDynamicResponse": false,
        "dynamicResponseKey": "",
        "dynamicResponseRandom": true,
        "dynamicResponseSpecific": false,
        "dynamicResponseSpecificKeyValue": "",
        "isDynamicImportCount": true,
        "dynamicImportCount": 1,
        "isDynamicImportSize": false,
        "dynamicImportSize": 1024,
        "bulkDataCount": 1,
        "isBulkDataCount": true,
        "bulkDataSize": 20,
        "isBulkDataSize": false,
        "allowedMethods": [
            "GET"
        ],
        "isSchema": false,
        "schemaResponse": [
            {
                "name": "field",
                "type": "string",
                "fakerValue": "$address.buildingNumber"
            }
        ],
        "isPreview": false
    }
}

const createMockErr = {
    "data": {
        "message": "Endpoint already exists. Choose different endpoint.",
        "status": 417
    },
    "status": 417,
    "statusText": "Expectation Failed",
    "headers": {
        "access-control-allow-origin": "*",
        "connection": "keep-alive",
        "content-length": "78",
        "content-type": "application/json; charset=utf-8",
        "date": "Thu, 13 Apr 2023 12:53:14 GMT",
        "etag": "W/\"4e-OXrWPR1P8aovO3HDyG+w2GNiNwQ\"",
        "keep-alive": "timeout=5",
        "vary": "Accept-Encoding",
        "x-powered-by": "Express"
    },
    "config": {
        "url": "http://localhost:9000/api/mock/create",
        "method": "post",
        "data": "{\"projectId\":\"e162b388-634a-4a16-acfc-a2c38e43c001\",\"projectName\":\"test1\",\"userId\":\"b3a5233f-acc3-41b7-8673-4936ba195b4d\",\"serviceResponseBody\":\"{\\n    \\\"asdf\\\": \\\"sdf\\\"\\n}\",\"serviceResponseType\":\"default\",\"serviceResponseBodyType\":\"default\",\"referenceId\":\"\",\"path\":\"http://localhost:9000\",\"endpoint\":\"d\",\"method\":\"GET\",\"statusCode\":200,\"isDelay\":false,\"delaySeconds\":0,\"headers\":[],\"params\":[],\"contentEncoding\":\"UTF-8\",\"contentType\":\"Application/Json\",\"mockName\":\"d\",\"mockId\":\"\",\"mockStatus\":\"enabled\",\"randomSpecific\":\"random\",\"isDynamicResponse\":false,\"dynamicResponseKey\":\"\",\"dynamicResponseRandom\":true,\"dynamicResponseSpecific\":false,\"dynamicResponseSpecificKeyValue\":\"\",\"isDynamicImportCount\":true,\"dynamicImportCount\":1,\"isDynamicImportSize\":false,\"dynamicImportSize\":1024,\"bulkDataCount\":1,\"isBulkDataCount\":true,\"bulkDataSize\":20,\"isBulkDataSize\":false,\"allowedMethods\":[\"GET\"],\"isSchema\":false,\"schemaResponse\":[{\"name\":\"field\",\"type\":\"string\",\"fakerValue\":\"$address.buildingNumber\"}],\"isPreview\":false}",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5MDEyMywiZXhwIjoxNjgxNDc2NTIzfQ.jJDqI5XgF02fAPdM54dpChx9zOfqcOTZleixyjbVdcg"
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1
    },
    "request": {}
}

const createMockResponse = {
    "data": {
        "message": "Mock created successfully.",
        "status": 201,
        "data": {
            "id": "d72efcd0-d2fe-4e2f-982e-932fc7395f5e",
            "mockName": "ddf",
            "mockUrl": "http://localhost:9000/api/rest/test1/drere",
            "allowedMethods": "[\"GET\"]"
        }
    },
    "status": 201,
    "statusText": "Created",
    "headers": {
        "access-control-allow-origin": "*",
        "connection": "keep-alive",
        "content-length": "207",
        "content-type": "application/json; charset=utf-8",
        "date": "Thu, 13 Apr 2023 12:54:47 GMT",
        "etag": "W/\"cf-qduAW9ux2bmZsw0TWr3hmNjxgQU\"",
        "keep-alive": "timeout=5",
        "vary": "Accept-Encoding",
        "x-powered-by": "Express"
    },
    "config": {
        "url": "http://localhost:9000/api/mock/create",
        "method": "post",
        "data": "{\"projectId\":\"e162b388-634a-4a16-acfc-a2c38e43c001\",\"projectName\":\"test1\",\"userId\":\"b3a5233f-acc3-41b7-8673-4936ba195b4d\",\"serviceResponseBody\":\"{\\n    \\\"asdf\\\": \\\"sdf\\\"\\n}\",\"serviceResponseType\":\"default\",\"serviceResponseBodyType\":\"default\",\"referenceId\":\"\",\"path\":\"http://localhost:9000\",\"endpoint\":\"drere\",\"method\":\"GET\",\"statusCode\":200,\"isDelay\":false,\"delaySeconds\":0,\"headers\":[],\"params\":[],\"contentEncoding\":\"UTF-8\",\"contentType\":\"Application/Json\",\"mockName\":\"ddf\",\"mockId\":\"\",\"mockStatus\":\"enabled\",\"randomSpecific\":\"random\",\"isDynamicResponse\":false,\"dynamicResponseKey\":\"\",\"dynamicResponseRandom\":true,\"dynamicResponseSpecific\":false,\"dynamicResponseSpecificKeyValue\":\"\",\"isDynamicImportCount\":true,\"dynamicImportCount\":1,\"isDynamicImportSize\":false,\"dynamicImportSize\":1024,\"bulkDataCount\":1,\"isBulkDataCount\":true,\"bulkDataSize\":20,\"isBulkDataSize\":false,\"allowedMethods\":[\"GET\"],\"isSchema\":false,\"schemaResponse\":[{\"name\":\"field\",\"type\":\"string\",\"fakerValue\":\"$address.buildingNumber\"}],\"isPreview\":false}",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5MDEyMywiZXhwIjoxNjgxNDc2NTIzfQ.jJDqI5XgF02fAPdM54dpChx9zOfqcOTZleixyjbVdcg"
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1
    },
    "request": {}
}

const fetchListRequest = {
    "type": "FETCH_LIST_BY_ID",
    "data": "66808427-e032-4c84-855b-0ae18667cb04"
}

const fetchListResponse = {
    "data": {
        "message": "Mock Detail",
        "status": 200,
        "data": {
            "mock": {
                "_id": "66808427-e032-4c84-855b-0ae18667cb04",
                "status": "enabled",
                "projectName": "test1",
                "serviceResponseType": "default",
                "referenceId": null,
                "path": "/rest",
                "endpoint": "test1/dfdsf",
                "endpointRequestPath": "dfdsf",
                "statusCode": "200",
                "isDelay": false,
                "delaySeconds": null,
                "headers": [],
                "params": [],
                "contentEncoding": "UTF-8",
                "contentType": "Application/Json",
                "mockName": "asd",
                "mockStatus": "enabled",
                "isDynamicResponse": false,
                "isSchema": false,
                "dynamicResponseKey": null,
                "dynamicResponseRandom": null,
                "dynamicResponseSpecific": null,
                "dynamicResponseSpecificKeyValue": null,
                "isDynamicImportCount": null,
                "dynamicImportCount": null,
                "isDynamicImportSize": null,
                "dynamicImportSize": null,
                "isBulkDataCount": true,
                "bulkDataCount": 1,
                "isBulkDataSize": null,
                "bulkDataSize": null,
                "allowedMethods": [
                    "GET"
                ],
                "createdAt": "2023-04-14T04:08:32.532Z",
                "updatedAt": "2023-04-14T04:08:32.532Z",
                "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
                "projectId": "e162b388-634a-4a16-acfc-a2c38e43c001",
                "serviceResponse": {
                    "_id": "ca7496ee-1b5a-4c45-9086-b5ddb265ff06",
                    "status": "enabled",
                    "serviceResponseBody": "{\n    \"df\": \"dsf\"\n}",
                    "contentType": "Application/Json",
                    "createdAt": "2023-04-14T04:08:32.551Z",
                    "updatedAt": "2023-04-14T04:08:32.551Z",
                    "mockId": "66808427-e032-4c84-855b-0ae18667cb04"
                }
            }
        }
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "access-control-allow-origin": "*",
        "content-encoding": "gzip",
        "content-type": "application/json; charset=utf-8",
        "date": "Fri, 14 Apr 2023 04:09:54 GMT",
        "etag": "W/\"50e-WfCjkLn9e7jae5+MTJnD/vtUcZk\"",
        "vary": "Accept-Encoding",
        "x-powered-by": "Express"
    },
    "config": {
        "url": "http://localhost:9000/api/mock/item/66808427-e032-4c84-855b-0ae18667cb04",
        "method": "get",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTQ0NTI1OSwiZXhwIjoxNjgxNTMxNjU5fQ.3mC2YnRgfKUZPd9pwuZYvb5iAfnHNKnK_eekEu7VEnY"
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1
    },
    "request": {}
}

const editMockData = {
    request: {
        "type": "CREATE_MOCK",
        "data": {
            "projectId": "3e70ae4c-473d-42dd-b467-d2485661d6bf",
            "projectName": "maneesh",
            "serviceResponseBody": "{}",
            "serviceResponseType": "default",
            "serviceResponseBodyType": "default",
            "referenceId": "",
            "path": "/rest",
            "endpoint": "re34",
            "method": "GET",
            "statusCode": "200",
            "isDelay": false,
            "delaySeconds": 1,
            "headers": [],
            "params": [],
            "contentEncoding": "UTF-8",
            "contentType": "Application/Json",
            "mockName": "Mock_71311",
            "mockId": "5e6a4250-01e2-4077-86c1-a718086aca0f",
            "mockStatus": "enabled",
            "randomSpecific": "random",
            "isDynamicResponse": false,
            "dynamicResponseKey": "[]",
            "dynamicResponseRandom": true,
            "dynamicResponseSpecific": false,
            "dynamicResponseSpecificKeyValue": "",
            "isDynamicImportCount": false,
            "dynamicImportCount": 1,
            "isDynamicImportSize": true,
            "dynamicImportSize": 1024,
            "bulkDataCount": 1,
            "isBulkDataCount": true,
            "bulkDataSize": 20,
            "isBulkDataSize": false,
            "allowedMethods": [
                "GET"
            ],
            "isSchema": false,
            "schemaResponse": [
                {
                    "name": "field",
                    "type": "string",
                    "fakerValue": "$address.buildingNumber"
                }
            ],
            "ApiResponseSchemaTypes": {
                "GET": {}
            },
            "_id": "5e6a4250-01e2-4077-86c1-a718086aca0f",
            "status": "enabled",
            "endpointRequestPath": "re34",
            "authenticationType": "PROJECT_SPECIFIC",
            "createdAt": "2023-06-01T07:19:35.447Z",
            "updatedAt": "2023-06-01T07:20:44.720Z",
            "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
            "serviceResponse": {
                "_id": "5e6a4250-01e2-4077-86c1-a718086aca0f",
                "status": "enabled",
                "serviceResponseBody": "{}",
                "contentType": "Application/Json",
                "createdAt": "2023-06-01T07:19:35.447Z",
                "updatedAt": "2023-06-01T07:20:44.758Z",
                "mockId": "5e6a4250-01e2-4077-86c1-a718086aca0f"
            },
            "specificResponseType": "other",
            "isPreview": false
        }
    },
    response: {
        "data": {
            "message": "Mock updated successfully.",
            "status": 200,
            "data": {
                "mockUrl": "http://localhost:9000/api/rest/undefined"
            }
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "115",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 07:24:12 GMT",
            "etag": "W/\"73-ggSb95QioH3m23s1YidfW//lOa4\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/mock/item/5e6a4250-01e2-4077-86c1-a718086aca0f",
            "method": "put",
            "data": "{\"projectId\":\"3e70ae4c-473d-42dd-b467-d2485661d6bf\",\"projectName\":\"maneesh\",\"serviceResponseBody\":\"{}\",\"serviceResponseType\":\"default\",\"serviceResponseBodyType\":\"default\",\"referenceId\":\"\",\"path\":\"/rest\",\"endpoint\":\"re34\",\"method\":\"GET\",\"statusCode\":\"200\",\"isDelay\":false,\"delaySeconds\":1,\"headers\":[],\"params\":[],\"contentEncoding\":\"UTF-8\",\"contentType\":\"Application/Json\",\"mockName\":\"Mock_71311\",\"mockId\":\"5e6a4250-01e2-4077-86c1-a718086aca0f\",\"mockStatus\":\"enabled\",\"randomSpecific\":\"random\",\"isDynamicResponse\":false,\"dynamicResponseKey\":\"[]\",\"dynamicResponseRandom\":true,\"dynamicResponseSpecific\":false,\"dynamicResponseSpecificKeyValue\":\"\",\"isDynamicImportCount\":false,\"dynamicImportCount\":1,\"isDynamicImportSize\":true,\"dynamicImportSize\":1024,\"bulkDataCount\":1,\"isBulkDataCount\":true,\"bulkDataSize\":20,\"isBulkDataSize\":false,\"allowedMethods\":[\"GET\"],\"isSchema\":false,\"schemaResponse\":[{\"name\":\"field\",\"type\":\"string\",\"fakerValue\":\"$address.buildingNumber\"}],\"ApiResponseSchemaTypes\":{\"GET\":{}},\"_id\":\"5e6a4250-01e2-4077-86c1-a718086aca0f\",\"status\":\"enabled\",\"endpointRequestPath\":\"re34\",\"authenticationType\":\"PROJECT_SPECIFIC\",\"createdAt\":\"2023-06-01T07:19:35.447Z\",\"updatedAt\":\"2023-06-01T07:20:44.720Z\",\"userId\":\"b3a5233f-acc3-41b7-8673-4936ba195b4d\",\"serviceResponse\":{\"_id\":\"5e6a4250-01e2-4077-86c1-a718086aca0f\",\"status\":\"enabled\",\"serviceResponseBody\":\"{}\",\"contentType\":\"Application/Json\",\"createdAt\":\"2023-06-01T07:19:35.447Z\",\"updatedAt\":\"2023-06-01T07:20:44.758Z\",\"mockId\":\"5e6a4250-01e2-4077-86c1-a718086aca0f\"},\"specificResponseType\":\"other\",\"isPreview\":false}",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsIl9pZCI6ImIzYTUyMzNmLWFjYzMtNDFiNy04NjczLTQ5MzZiYTE5NWI0ZCIsImlhdCI6MTY4NTYwMzU1NiwiZXhwIjoxNjg1NjA3MTU2fQ.Jci-aIn0ZSJ7nFKteWV8snWk2DEELR7BAsP40MnQDsk"
            },
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1
        },
        "request": {}
    },
}

const createMockServicedata = {
    createMockErr,
    createMockRequest,
    createMockResponse,
    fetchListRequest,
    fetchListResponse,
    editMockData
}

export default createMockServicedata;