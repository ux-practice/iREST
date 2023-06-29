const updateAuthData = {
    request: {
        "type": "UPDATE_AUTH_TYPE",
        "data": {
            "authenticationType": "MOCK_SPECIFIC"
        },
        "isMockAuth": true
    },
    response: {
        "data": {
            "message": "Authentication type updated successfully.",
            "status": 201
        },
        "status": 201,
        "statusText": "Created",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "68",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 11:08:05 GMT",
            "etag": "W/\"44-xekdrWPLza2imUOG3DUuKYgxLGU\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/authentication/mockId/6a600b93-854d-4a8a-b28b-5e46dfd0a874",
            "method": "put",
            "data": "{\"authenticationType\":\"MOCK_SPECIFIC\"}",
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

export default updateAuthData;