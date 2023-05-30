# Native Code to Generate the Database Collection Schema(s)

Properties
```
// Project Collection
db.createCollection('projects', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'projects',
      required: ['status', 'projectName', 'userId', 'createdAt', 'updatedAt', '__v'],
      properties: {
        status: {
          bsonType: 'string'
        },
        projectName: {
          bsonType: 'string'
        },
        userId: {
          bsonType: 'objectId'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        },
        __v: {
          bsonType: 'double'
        }
      }
    }
  }
});

// User Collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'users',
      required: ['status', 'name', 'email', 'password', 'createdAt', 'updatedAt', '__v'],
      properties: {
        status: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        },
        email: {
          bsonType: 'string'
        },
        password: {
          bsonType: 'string'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        },
        __v: {
          bsonType: 'double'
        }
      }
    }
  }
});

// Service Response
db.createCollection('serviceresponses', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'serviceresponses',
      required: ['status', 'serviceResponseBody', 'mockId', 'createdAt', 'updatedAt', '__v', 'contentType'],
      properties: {
        status: {
          bsonType: 'string'
        },
        serviceResponseBody: {
          bsonType: 'string'
        },
        mockId: {
          bsonType: 'objectId'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        },
        __v: {
          bsonType: 'double'
        },
        contentType: {
          bsonType: 'string'
        }
      }
    }
  }
});

// Mocks Collection
db.createCollection('mocks', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'mocks',
      required: ['status', 'serviceResponseType', 'path', 'method', 'statusCode', 'isDelay', 'contentEncoding', 'contentType', 'mockStatus', 'isDynamicResponse', 'userId', 'projectId', 'projectName', 'endpoint', 'delaySeconds', 'mockName', 'headers', 'params', 'dynamicResponseKey', 'dynamicResponseSpecific', 'dynamicResponseSpecificKeyValue', 'isDynamicImportSize', 'dynamicImportSize', 'endpointRequestPath', 'createdAt', 'updatedAt', '__v', 'isDynamicImportCount', 'dynamicImportCount', 'dynamicResponseRandom', 'referenceId'],
      properties: {
        status: {
          bsonType: 'string'
        },
        serviceResponseType: {
          bsonType: 'string'
        },
        path: {
          bsonType: 'string'
        },
        method: {
          bsonType: 'string'
        },
        statusCode: {
          bsonType: 'string'
        },
        isDelay: {
          bsonType: 'bool'
        },
        contentEncoding: {
          bsonType: 'string'
        },
        contentType: {
          bsonType: 'string'
        },
        mockStatus: {
          bsonType: 'string'
        },
        isDynamicResponse: {
          bsonType: 'bool'
        },
        userId: {
          bsonType: 'objectId'
        },
        projectId: {
          bsonType: 'objectId'
        },
        projectName: {
          bsonType: 'string'
        },
        endpoint: {
          bsonType: 'string'
        },
        delaySeconds: {
          bsonType: 'double'
        },
        mockName: {
          bsonType: 'string'
        },
        headers: {
          bsonType: 'array',
          items: {
            title: 'mocks.headers',
            required: ['key', 'value'],
            properties: {
              key: {
                bsonType: 'string'
              },
              value: {
                bsonType: 'string'
              }
            }
          }
        },
        params: {
          bsonType: 'array',
          items: {
            title: 'mocks.params',
            required: ['key', 'value'],
            properties: {
              key: {
                bsonType: 'string'
              },
              value: {
                bsonType: 'string'
              }
            }
          }
        },
        dynamicResponseKey: {
          bsonType: 'string'
        },
        dynamicResponseSpecific: {
          bsonType: 'bool'
        },
        dynamicResponseSpecificKeyValue: {
          bsonType: 'string'
        },
        isDynamicImportSize: {
          bsonType: 'bool'
        },
        dynamicImportSize: {
          bsonType: 'double'
        },
        endpointRequestPath: {
          bsonType: 'string'
        },
        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        },
        __v: {
          bsonType: 'double'
        },
        isDynamicImportCount: {
          bsonType: 'bool'
        },
        dynamicImportCount: {
          bsonType: 'double'
        },
        dynamicResponseRandom: {
          bsonType: 'bool'
        },
        referenceId: {
          bsonType: 'objectId'
        }
      }
    }
  }
});
```
