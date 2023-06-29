import mongoose from 'mongoose'
import ServiceResponse from '../../../src/server/models/serviceResponse'
import {status} from '../../../src/server/constants/schemaDefaults'

describe('Service Response Model', () => {
  let serviceResponse
  const serviceResponseData = {
    serviceResponseBody: '{a: 1, b: 2, c: 3}',
    mockId: '5d72395328bfe921d1291b7d',
    contentType: 'application/json'
  }

  beforeAll(() => {
    // eslint-disable-next-line global-require
    require('../utils/mongo-test-url')
  })
  afterAll(done => {
    mongoose.disconnect(done)
  })

  beforeEach(() => {
    serviceResponse = new ServiceResponse(serviceResponseData)
    return serviceResponse.save()
  })
  afterEach(() => {
    return ServiceResponse.deleteOne()
  })

  it('test service response name', () => {
    expect(serviceResponse.serviceResponseBody).toEqual(serviceResponseData.serviceResponseBody)
  })

  it('test service response userId', () => {
    expect(JSON.parse(JSON.stringify(serviceResponse.mockId))).toEqual(serviceResponseData.mockId)
  })

  it('test service response userId', () => {
    expect(serviceResponse.status).toEqual(status.ENABLED)
  })
})
