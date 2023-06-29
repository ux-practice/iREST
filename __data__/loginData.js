const loginData = {
    request: {
        "type": "LOGIN_USER",
        "user": {
            "email": "abhishek.karnik@impetus.com",
            "password": "Indrapuri567"
        }
    },
    response: {
        "data": {
            "message": "Authorization successful.",
            "status": 200,
            "data": {
                "email": "abhishek.karnik@impetus.com",
                "name": "Abhishek Karnik",
                "_id": "b3a5233f-acc3-41b7-8673-4936ba195b4d"
            }
        },
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "169",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 08:56:44 GMT",
            "etag": "W/\"a9-PzqYTqzpwP/SgNQmJdgXuNZMaJs\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsIl9pZCI6ImIzYTUyMzNmLWFjYzMtNDFiNy04NjczLTQ5MzZiYTE5NWI0ZCIsImlhdCI6MTY4NTYwOTgwNCwiZXhwIjoxNjg1NjEzNDA0fQ.VeToF-x3T2tiLAjOVVDst0zme2LnbAFKz2Y9j8tgjHU",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/login",
            "method": "post",
            "data": "{\"email\":\"abhishek.karnik@impetus.com\",\"password\":\"Indrapuri567\"}",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
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
        "type": "LOGIN_USER",
        "user": {
            "email": "abhishek.karnik@impetus.com",
            "password": "test"
        }
    },
    responseErr: {
        "data": {
            "message": "Unauthorized. Password mismatch error.",
            "status": 401
        },
        "status": 401,
        "statusText": "Unauthorized",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "65",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 09:18:31 GMT",
            "etag": "W/\"41-E2gDUiMwtosjPTNPx5i6+9BNiYs\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/login",
            "method": "post",
            "data": "{\"email\":\"abhishek.karnik@impetus.com\",\"password\":\"Indrapuri5673\"}",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
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

export default loginData