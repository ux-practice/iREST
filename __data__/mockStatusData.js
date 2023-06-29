const mockServiceData = {
    request: {
        "type": "MOCK_STATUS",
        "data": {
            "id": "46e1c558-4477-4e2f-8f67-81936825de73",
            "mockStatus": "disabled"
        }
    },
    response: {
        "data": {
            "message": "Status changes succesfully.",
            "status": 200,
            "data": {
                "mock": {
                    "_id": "84322c45-7c8b-479a-a39a-d153ae89a4a1",
                    "status": "enabled",
                    "projectName": "ewse",
                    "serviceResponseType": "default",
                    "referenceId": null,
                    "path": "/rest",
                    "endpoint": "ewse/7ju",
                    "endpointRequestPath": "7ju",
                    "statusCode": "200",
                    "isDelay": false,
                    "delaySeconds": null,
                    "headers": "[]",
                    "params": "[]",
                    "contentEncoding": "UTF-8",
                    "contentType": "Application/Json",
                    "mockName": "Mock_39530",
                    "mockStatus": "disabled",
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
                    "allowedMethods": "[\"GET\"]",
                    "authenticationType": "PROJECT_SPECIFIC",
                    "createdAt": "2023-06-01T08:33:19.017Z",
                    "updatedAt": "2023-06-01T10:33:49.318Z",
                    "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
                    "projectId": "ac2cbdd6-f1e4-4bb8-93f4-4a51ddffe67a"
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
            "date": "Thu, 01 Jun 2023 10:33:49 GMT",
            "etag": "W/\"42b-ndPxS92000M4oZBMPeY7V4wAhhk\"",
            "keep-alive": "timeout=5",
            "transfer-encoding": "chunked",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/mock/item/84322c45-7c8b-479a-a39a-d153ae89a4a1",
            "method": "patch",
            "data": "{\"mockStatus\":\"disabled\"}",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsIl9pZCI6ImIzYTUyMzNmLWFjYzMtNDFiNy04NjczLTQ5MzZiYTE5NWI0ZCIsImlhdCI6MTY4NTYxMzUxNywiZXhwIjoxNjg1NjE3MTE3fQ.TRd6TWXIPfD13Kc8vvwirHFDONP0vaK7NajLHXnRUu0"
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

export default mockServiceData;