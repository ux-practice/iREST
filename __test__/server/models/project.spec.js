import mongoose from 'mongoose'
import Project from '../../../src/server/models/project'
import {status} from '../../../src/server/constants/schemaDefaults'

describe('Project Model', () => {
  let project
  const projectData = {
    projectName: 'default',
    userId: '5d72395328bfe921d1291b7d',
  }

  beforeAll(() => {
    // eslint-disable-next-line global-require
    require('../utils/mongo-test-url')
  })
  afterAll(done => {
    mongoose.disconnect(done)
  })

  beforeEach(() => {
    project = new Project(projectData)
    return project.save()
  })
  afterEach(() => {
    return Project.deleteOne()
  })

  it('test project name', () => {
    expect(project.projectName).toEqual(projectData.projectName)
  })

  it('test project userId', () => {
    expect(JSON.parse(JSON.stringify(project.userId))).toEqual(projectData.userId)
  })

  it('test project userId', () => {
    expect(project.status).toEqual(status.ENABLED)
  })
})
