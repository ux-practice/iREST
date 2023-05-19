import mongoose from 'mongoose'
import User from '../../../src/server/models/user'
import {status} from '../../../src/server/constants/schemaDefaults'


describe('User Model', () => {
  let user
  const userData = {
    email: 'anurag.jain@impetus.co.in',
    password: 'impetus',
    name: 'Anurag Jain',
  }

  beforeAll(() => {
    // eslint-disable-next-line global-require
    require('../utils/mongo-test-url')
  })
  afterAll(done => {
    mongoose.disconnect(done)
  })

  beforeEach(() => {
    user = new User(userData)
    return user.save()
  })
  afterEach(() => {
    return User.deleteOne()
  })

  it('test user email match', () => {
    expect(user.email).toEqual(userData.email)
  })

  it('test user password match case 1', () => {
    function passwordMatcher(err, isMatched) {
      expect(err).toBe(null)
      expect(isMatched).toBe(true)
    }

    user.comparePassword(userData.password, user.password, passwordMatcher)
  })

  it('test user password match case 2', () => {
    function passwordMatcher2(err, isMatched) {
      expect(err).toBe(null)
      expect(isMatched).toBe(false)
    }

    user.comparePassword('wrongPassword', user.password, passwordMatcher2)
  })

  it('test user status', () => {
    expect(user.status).toEqual(status.ENABLED)
  })
})
