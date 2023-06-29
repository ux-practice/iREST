const updateTokenData = {
    request: {
        "type": "UPDATE_TOKEN",
        "data": {
            "id": "6a600b93-854d-4a8a-b28b-5e46dfd0a874",
            "token": "f5244df4-28f1-45d9-8f63-fccbb0fae803"
        },
        "isMockToken": true
    },
    requestErr: {
        "type": "UPDATE_TOKEN",
        "data": {},
        "isMockToken": true
    },
    response: {
        "data": {
            "message": "Token details added for mock.",
            "status": 200,
            "data": {
                "_id": "82445bc9-9b65-4d09-8a39-124ce35904b4",
                "mockId": "6a600b93-854d-4a8a-b28b-5e46dfd0a874",
                "token": "f5244df4-28f1-45d9-8f63-fccbb0fae803",
                "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
                "updatedAt": "2023-06-01T11:22:01.612Z",
                "createdAt": "2023-06-01T11:22:01.612Z"
            }
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "331",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 11:22:01 GMT",
            "etag": "W/\"14b-JlXQr9K+WwJO8MetUb+dISdEahw\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/token/mockId/6a600b93-854d-4a8a-b28b-5e46dfd0a874",
            "method": "put",
            "data": "{\"token\":\"f5244df4-28f1-45d9-8f63-fccbb0fae803\"}",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsIl9pZCI6ImIzYTUyMzNmLWFjYzMtNDFiNy04NjczLTQ5MzZiYTE5NWI0ZCIsImlhdCI6MTY4NTYxNzUyNCwiZXhwIjoxNjg1NjIxMTI0fQ.lxNCXyD5mBgjyNIFLyGUaGTHAcUehNpEFf_X6TFmZ1c"
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

export default updateTokenData;
