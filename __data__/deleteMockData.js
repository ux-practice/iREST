const deleteMockData = {
    request: {
        "type": "DELETE_MOCK",
        "data": {
            "id": "3849a984-9315-4b59-8aab-e4f8b7720a98"
        }
    },
    response: {
        "data": {
            "message": "Mock deleted successfully.",
            "status": 202
        },
        "status": 202,
        "statusText": "Accepted",
        "headers": {
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "53",
            "content-type": "application/json; charset=utf-8",
            "date": "Thu, 01 Jun 2023 06:35:46 GMT",
            "etag": "W/\"35-8U8zd3yIkRSZIcSeY6ewBEYjPkg\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding",
            "x-powered-by": "Express"
        },
        "config": {
            "url": "http://localhost:9000/api/mock/item/4df7e593-23c8-4ba5-906e-2f4a23ac3655",
            "method": "delete",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsIl9pZCI6ImIzYTUyMzNmLWFjYzMtNDFiNy04NjczLTQ5MzZiYTE5NWI0ZCIsImlhdCI6MTY4NTYwMTM0MiwiZXhwIjoxNjg1NjAxMzUyfQ.TM1-cU9H-4mmmRDKYwsdVbbjpJSz0bcFFnZV5s1pqMU"
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

export default deleteMockData;