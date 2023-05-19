import mongoose from 'mongoose'
import Mock from '../../../src/server/models/mock'
import {status} from '../../../src/server/constants/schemaDefaults'

describe('Mock Model', () => {
  let mock
  const mockData = {
    projectId: '5d836f5181544724725b9d39',
    projectName: 'default',
    userId: '5d72395328bfe921d1291b7d',
    serviceResponseBody: '{aa: 1, bb: 2, cc: 3}',
    serviceResponseType: 'save',
    referenceId: '5d834d63da46c426af721ee2',
    path: 'http://localhost:9000',
    endpoint: 'mock-endpoint',
    endpointRequestPath: 'projectName/mock-endpoint',
    method: 'GET',
    statusCode: 200,
    isDelay: false,
    delaySeconds: 0,
    headers: [],
    params: [],
    contentEncoding: 'UTF-8',
    contentType: 'Text/Plain',
    mockName: 'mock1',
    mockStatus: 'enabled',
    isDynamicResponse: false,
    dynamicResponseKey: 'aa',
    dynamicResponseRandom: false,
    dynamicResponseSpecific: true,
    dynamicResponseSpecificKeyValue: 'abcd',
    isDynamicImportCount: true,
    dynamicImportCount: 1,
    isDynamicImportSize: false,
    dynamicImportSize: 1024,
  }

  beforeAll(() => {
    // eslint-disable-next-line global-require
    require('../utils/mongo-test-url')
  })
  afterAll(done => {
    mongoose.disconnect(done)
  })

  beforeEach(() => {
    mock = new Mock(mockData)
    return mock.save()
  })
  afterEach(() => {
    return Mock.deleteOne()
  })

  it('test mock userId', () => {
    expect(mock.status).toEqual(status.ENABLED)
  })

  it('test mock name', () => {
    expect(mock.projectName).toEqual(mockData.projectName)
  })

  it('test mock userId', () => {
    expect(JSON.parse(JSON.stringify(mock.userId))).toEqual(mockData.userId)
  })

  it('test mock statusCode', () => {
    expect(JSON.parse(mock.statusCode)).toEqual(mockData.statusCode)
  })
})
