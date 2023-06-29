import mongoose from 'mongoose'
import request from 'supertest'
import Project from '../../../../../src/server/models/project'
import User from '../../../../../src/server/models/user'
import app from '../../../../../src/server/app'

describe('Project create', () => {
  let userId
  beforeAll(async (done) => {
    // eslint-disable-next-line global-require
    require('../../../utils/mongo-test-url')
    const userObj = {
      name: 'Jon Doe',
      email: 'JonDoe@example.com',
      password: 'JonDoe@123'
    }
    const user = new User(userObj)
    const usr = await user.save()
    userId = usr._id
    done()
  })
  afterAll(async (done) => {
    await User.deleteMany({})
    await Project.deleteMany({})
    mongoose.disconnect(done)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('respond with 201 and 417 consecutively', async () => {
    const body = {
      projectName: 'test project 2',
      userId,
    }
    const response = await request(app).post('/api/project/create').send(body)
    expect(response.statusCode).toBe(201)
    const response2 = await request(app).post('/api/project/create').send(body)
    expect(response2.statusCode).toBe(417)
  })
  it('respond with 500 project save method not exist', async () => {
    const body = {
      projectName: 'test project 3',
      userId,
    }
    const error = {}
    jest.spyOn(Project.prototype, 'save').mockImplementationOnce(() => Promise.reject(error))
    const response = await request(app).post('/api/project/create').send(body)
    expect(response.statusCode).toBe(500)
  })
  it('respond with 500 project find method not exist', async () => {
    const body = {
      projectName: 'test project 4',
      userId,
    }
    const error = new Error
    Project.find = jest.fn((() => Promise.reject(error)))
    const response = await request(app).post('/api/project/create').send(body)
    expect(response.statusCode).toBe(500)
  })
  it('respond with 400 bad request with no userId', async () => { // validator middleware
    const body = {
      projectName: 'test project 2',
    }
    const response = await request(app).post('/api/project/create').send(body)
    expect(response.statusCode).toBe(400)
  })
  it('respond with 400 bad request with user not matched', async () => {
    const body = {
      projectName: 'test project 2',
      userId: '5f9c18dd053cb11a5770c76e',
    }
    const response = await request(app).post('/api/project/create').send(body)
    expect(response.statusCode).toBe(400)
  })
  it('respond with 500 bad request with user exists method', async () => {
    const body = {
      projectName: 'test project 2',
      userId: '5f9c18dd053cb11a5770c76e',
    }
    const error = {}
    User.exists = jest.fn((() => Promise.reject(error)))
    const response = await request(app).post('/api/project/create').send(body)
    expect(response.statusCode).toBe(500)
  })
})
