export const mockModalResponse = {
  mockList: {
    response: {
      message: 'Mock List',
      status: 200,
      type: 'MOCK_LIST_SUCCESS',
      data: {
        totalMocks: 1,
        mockList: [
          {
            serviceResponseType: 'default',
            method: 'GET',
            statusCode: '200',
            mockStatus: 'enabled',
            _id: '6232e060d70def3b6c16dc55',
            projectId: '6232dfc2d70def3b6c16dc4d',
            projectName: 'abc',
            endpoint: 'http://localhost:9000/api/rest/ad/name1',
            mockName: 'name 1',
            allowedMethods: ['default', 'api'],
          },
        ],
      },
    },
  },
}

export const mockModalWrapperResponse = {
  mockList: {
    response: {
      message: 'Mock List',
      status: 200,
      type: 'MOCK_LIST_SUCCESS',
      data: {
        totalMocks: 1,
        mockList: [
          {
            serviceResponseType: 'default',
            method: 'GET',
            statusCode: '200',
            mockStatus: 'enabled',
            _id: '6232e060d70def3b6c16dc55',
            projectId: '6232dfc2d70def3b6c16dc4d',
            projectName: 'abc',
            endpoint: 'http://localhost:9000/api/rest/ad/name1',
            mockName: 'name 1',
            allowedMethods: ['Default', 'api'],
          },
          {
            serviceResponseType: 'api',
            method: 'GET',
            statusCode: '404',
            mockStatus: 'enabled',
            _id: '6232e060d70def3b6c16dc55',
            projectId: '6232dfc2d70def3b6c16dc4d',
            projectName: 'def',
            endpoint: 'http://localhost:9000/api/rest/ad/name2',
            mockName: 'name 1',
            allowedMethods: ['Api'],
          },
        ],
      },
    },
  },
}
