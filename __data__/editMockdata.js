const editMockData = {
    request: {
        "data": "5e6a4250-01e2-4077-86c1-a718086aca0f"
    },
    response: {
        "data": {
            "message": "Mock detail",
            "status": 200,
            "data": {
                "mock": {
                    "_id": "5e6a4250-01e2-4077-86c1-a718086aca0f",
                    "status": "enabled",
                    "projectName": "maneesh",
                    "serviceResponseType": "default",
                    "referenceId": null,
                    "path": "/rest",
                    "endpoint": "maneesh/re34",
                    "endpointRequestPath": "re34",
                    "statusCode": "200",
                    "isDelay": false,
                    "delaySeconds": null,
                    "headers": [],
                    "params": [],
                    "contentEncoding": "UTF-8",
                    "contentType": "Application/Json",
                    "mockName": "Mock_71311",
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
                    "authenticationType": "PROJECT_SPECIFIC",
                    "createdAt": "2023-06-01T07:19:35.447Z",
                    "updatedAt": "2023-06-01T07:28:29.340Z",
                    "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
                    "projectId": "3e70ae4c-473d-42dd-b467-d2485661d6bf",
                    "ApiResponseSchemaTypes": {
                        "GET": {}
                    },
                    "serviceResponse": {
                        "_id": "5e6a4250-01e2-4077-86c1-a718086aca0f",
                        "status": "enabled",
                        "serviceResponseBody": "{}",
                        "contentType": "Application/Json",
                        "createdAt": "2023-06-01T07:19:35.447Z",
                        "updatedAt": "2023-06-01T07:28:29.390Z",
                        "mockId": "5e6a4250-01e2-4077-86c1-a718086aca0f"
                    }
                }
            }
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-encoding": "gzip",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 08:01:06 GMT",
            "etag": "W/\"54c-9kRvp5bLuUCqGmBYqZ6617S7l0w\"",
            "keep-alive": "timeout=5",
            "transfer-encoding": "chunked",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/mock/item/5e6a4250-01e2-4077-86c1-a718086aca0f",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
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
    error: {
        "data": {
            "message": "error",
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
}



export default editMockData;