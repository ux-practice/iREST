import mongoose from 'mongoose'
import request from 'supertest'
import User, {UserSchema} from '../../../../../src/server/models/user'
import app from '../../../../../src/server/app'

describe('Project create', () => {
  beforeAll(async (done) => {
    // eslint-disable-next-line global-require
    require('../../../utils/mongo-test-url')
    const userObj = {
      name: 'Jon Doe',
      email: 'JonDoe@example.com',
      password: 'JonDoe@123'
    }
    const user = new User(userObj)
    await user.save()
    done()
  })
  afterAll(async (done) => {
    await User.deleteMany({})
    mongoose.disconnect(done)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('respond with 400 bad request', async () => { // validator middleware
    const body = {}
    const response = await request(app).post('/api/login').send(body)
    expect(response.statusCode).toBe(400)
  })
  it('respond with 200 with valid credentials', async () => {
    const body = {
      email: 'JonDoe@example.com',
      password: 'JonDoe@123'
    }
    const response = await request(app).post('/api/login').send(body)
    expect(response.statusCode).toBe(200)
    expect(response.body.data.name).toBe('Jon Doe')
  })
  it('respond with 500 with internal error', async () => {
    const body = {
      email: 'JonDoe@example.com',
      password: 'JonDoe@123'
    }
    const error = {}
    User.findOne = (reqBody, cb) => cb(error)
    const response = await request(app).post('/api/login').send(body)
    expect(response.statusCode).toBe(500)
  })
  it('respond with 400 bad request', async () => {
    const body = {
      email: 'JonDoe@example.com',
      password: 'JonDoe@123'
    }
    User.findOne = (reqBody, cb) => cb(null)
    const response = await request(app).post('/api/login').send(body)
    expect(response.statusCode).toBe(400)
  })
  it('respond with 401 unauthorized', async () => {
    const body = {
      email: 'JonDoe@example.com',
      password: 'JonDoe@123'
    }
    const error = {}
    UserSchema.methods.comparePassword = (a, b, clb) => clb(error)
    User.findOne = (reqBody, cb) => cb(null, {})
    const response = await request(app).post('/api/login').send(body)
    expect(response.statusCode).toBe(401)
  })
})
