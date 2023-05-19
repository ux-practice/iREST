import {customFormat} from '../../src/server/logger'

describe('logger', () => {
  it('custom format no extra params', () => {
    const params = {
      label: 'Default Logger',
      timestamp: '2021-02-03T10:50:25.713+05:30',
      level: 'debug',
      message: 'hello world!',
    }
    expect(customFormat(params)).toMatchSnapshot()
  })
  it('custom format no extra params', () => {
    const params = {
      label: 'Default Logger',
      timestamp: '2021-02-03T10:50:25.713+05:30',
      level: 'debug',
      message: 'hello world!',
      headers: {'content-type': 'application/json'}
    }
    expect(customFormat(params)).toMatchSnapshot()
  })
})
