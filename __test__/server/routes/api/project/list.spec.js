import mongoose from 'mongoose'
import request from 'supertest'
import Project from '../../../../../src/server/models/project'
import app from '../../../../../src/server/app'

describe('Project list', () => {
  beforeAll(async (done) => {
    // eslint-disable-next-line global-require
    require('../../../utils/mongo-test-url')
    await Project.deleteMany({})
    const projectObj = {
      projectName: 'test project',
      userId: '5f9c18dd053cb11a5770c76e',
    }
    const project = new Project(projectObj)
    await project.save()
    done()
  })
  afterAll(async (done) => {
    await Project.deleteMany({})
    mongoose.disconnect(done)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should responded with the project list', async () => {
    const query = {
      searchQuery: 'test',
      userId: "5f9c18dd053cb11a5770c76e",
      pageNo: 1,
    }
    const response = await request(app).get('/api/project/list').query(query)
    expect(response.statusCode).toBe(200)
  })
  it('Should responded with the project list without query params', async () => {
    const query = {}
    const response = await request(app).get('/api/project/list').query(query)
    expect(response.statusCode).toBe(200)
  })
  it('Should responded with the 204 without records', async () => {
    await Project.deleteMany({})
    const query = {}
    const response = await request(app).get('/api/project/list').query(query)
    expect(response.statusCode).toBe(204)
  })
  it('Should responded with error', async () => {
    const query = {}
    const error = {}
    Project.find = jest.fn((() => Promise.reject(error)))
    const response = await request(app).get('/api/project/list').query(query)
    expect(response.statusCode).toBe(500)
  })
})
