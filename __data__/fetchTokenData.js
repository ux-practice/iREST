const fetchTokenData = {
    Payload: {
        "data": "8f4a558a-5506-446d-a1a8-c9d008644bd6",
        "isMockToken": true,
        "type":"FETCH_TOKEN"
    },
    Response: {
        "data": {
            "message": "Token detail",
            "status": 200,
            "data": {
                "_id": "06cb6edd-f5bb-41a7-b21f-0fc5ee6a2e5a",
                "token": "8aca5bd6-98de-4adb-9207-44b2e24ca3f1",
                "createdAt": "2023-05-24T10:57:01.513Z",
                "updatedAt": "2023-05-24T10:57:01.513Z",
                "userId": "b3a5233f-acc3-41b7-8673-4936ba195b4d",
                "projectId": "4f229789-dfb3-4a7c-b42b-9c56575f7926",
                "mockId": null
            }
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "331",
            "content-type": "application/json; charset=utf-8",
            "date": "Wed, 24 May 2023 11:02:38 GMT",
            "etag": "W/\"14b-jzAJOD+Nf9vVAFxJz+ZFH7fryZs\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/token/mockId/8f4a558a-5506-446d-a1a8-c9d008644bd6",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsIl9pZCI6ImIzYTUyMzNmLWFjYzMtNDFiNy04NjczLTQ5MzZiYTE5NWI0ZCIsImlhdCI6MTY4NDkyNTAwMiwiZXhwIjoxNjg0OTI4NjAyfQ.9iPfEdLj-YFMDUCHm49LA3XHAFDgykOsBe2J0XnUWho"
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

export default fetchTokenData;
