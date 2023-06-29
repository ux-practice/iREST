const registerData = {
    request: {
        "type": "REGISTER_USER",
        "user": {
            "name": "Abhishek Karnik",
            "email": "abc@abc.com",
            "password": "Indrapuri567"
        }
    },
    response: {
        "data": {
            "message": "User created successfully",
            "status": 201,
            "data": {
                "email": "abhishek.karnik1@impetus.com",
                "_id": "3d34d9ca-42b2-4501-b984-d8957c2a84c3"
            }
        },
        "status": 201,
        "statusText": "Created",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "145",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 11:02:49 GMT",
            "etag": "W/\"91-Eiovl9dimLuqVxNB8HVgx7yCk5I\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/register",
            "method": "post",
            "data": "{\"name\":\"Abhishek Karnik1\",\"email\":\"abhishek.karnik1@impetus.com\",\"password\":\"Indrapuri567\"}",
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

export default registerData;