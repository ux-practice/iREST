const previewMockData = {
    request: {
        "type": "PREVIEW_MOCK",
        "data": {
            "projectId": "3e70ae4c-473d-42dd-b467-d2485661d6bf",
            "projectName": "maneesh",
            "serviceResponseBody": "{\"fruit\":\"Apple\",\"size\":\"Large\",\"color\":\"Red\"}",
            "serviceResponseType": "default",
            "serviceResponseBodyType": "default",
            "referenceId": "",
            "path": "http://localhost:9000",
            "endpoint": "hg",
            "method": "GET",
            "statusCode": 200,
            "isDelay": false,
            "delaySeconds": 1,
            "headers": [],
            "params": [],
            "contentEncoding": "UTF-8",
            "contentType": "Application/Json",
            "mockName": "Mock_43602",
            "mockId": "",
            "mockStatus": "enabled",
            "randomSpecific": "random",
            "isDynamicResponse": false,
            "dynamicResponseKey": "[]",
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
            "ApiResponseSchemaTypes": {
                "GET": {}
            },
            "isPreview": true
        }
    },
    response: {
        "data": {
            "message": "Mock created successfully.",
            "status": 201,
            "data": {
                "id": "8a14fca8-eda5-4d5f-868a-bdd51c747b56",
                "mockName": "Mock_43602",
                "mockUrl": "http://localhost:9000/api/rest/maneesh/hg",
                "allowedMethods": "[\"GET\"]"
            }
        },
    
        "response":{
            "status": 201,
            "statusText": "Created",
            "config": {
                "url": "http://localhost:9000/api/mock/create?isPreview=true",
                "method": "post",
                "data": "{\"projectId\":\"3e70ae4c-473d-42dd-b467-d2485661d6bf\",\"projectName\":\"maneesh\",\"serviceResponseBody\":\"{\\\"fruit\\\":\\\"Apple\\\",\\\"size\\\":\\\"Large\\\",\\\"color\\\":\\\"Red\\\"}\",\"serviceResponseType\":\"default\",\"serviceResponseBodyType\":\"default\",\"referenceId\":\"\",\"path\":\"http://localhost:9000\",\"endpoint\":\"hg\",\"method\":\"GET\",\"statusCode\":200,\"isDelay\":false,\"delaySeconds\":1,\"headers\":[],\"params\":[],\"contentEncoding\":\"UTF-8\",\"contentType\":\"Application/Json\",\"mockName\":\"Mock_43602\",\"mockId\":\"\",\"mockStatus\":\"enabled\",\"randomSpecific\":\"random\",\"isDynamicResponse\":false,\"dynamicResponseKey\":\"[]\",\"dynamicResponseRandom\":true,\"dynamicResponseSpecific\":false,\"dynamicResponseSpecificKeyValue\":\"\",\"isDynamicImportCount\":true,\"dynamicImportCount\":1,\"isDynamicImportSize\":false,\"dynamicImportSize\":1024,\"bulkDataCount\":1,\"isBulkDataCount\":true,\"bulkDataSize\":20,\"isBulkDataSize\":false,\"allowedMethods\":[\"GET\"],\"isSchema\":false,\"schemaResponse\":[{\"name\":\"field\",\"type\":\"string\",\"fakerValue\":\"$address.buildingNumber\"}],\"ApiResponseSchemaTypes\":{\"GET\":{}},\"isPreview\":true}",
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
        
            "headers": {
                "access-control-allow-origin": "*",
                "connection": "keep-alive",
                "content-length": "213",
                "content-type": "application/json; charset=utf-8",
                "date": "Thu, 01 Jun 2023 10:41:54 GMT",
                "etag": "W/\"d5-5wZoRDX3PVVrMk2af8deGTPt6tc\"",
                "keep-alive": "timeout=5",
                "vary": "Accept-Encoding",
                "x-powered-by": "Express"
            },
            
            "request": {}
        }
    }
}

export default previewMockData;