const projectEditData = {
    request: {
        "payload": {
            "projectName": "testp"
        },
        "id": "554dba80-5293-4d63-82f4-2c4ce79eff9b"
    },
    response: {
        "data": {
            "message": "Project updated successfully.",
            "status": 201
        },
        "status": 201,
        "statusText": "Created",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "56",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 10:57:00 GMT",
            "etag": "W/\"38-9qYQUQQq40n6Lpmtz849cVhuRdw\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/project/item/554dba80-5293-4d63-82f4-2c4ce79eff9b",
            "method": "put",
            "data": "{\"projectName\":\"testp\"}",
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
    },
    requestErr: {
        "payload": {
            "userId": "",
            "projectName": ""
        },
        "id": ""
    }
}

export default projectEditData;