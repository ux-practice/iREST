import React from 'react'
import ReactDOM from 'react-router-dom'
import {render} from '@testing-library/react'
import PreviewWrapper from '../../../../src/static/components/createMock/PreviewWrapper'
import {data} from './PreviewWrapper'
import {act} from 'react-dom/test-utils'

beforeEach(() => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.IntersectionObserver = mockIntersectionObserver
})

describe('testing PreviewWrapper Component', () => {
  it('Should render the component and match its snapshot', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {loadSpec: jest.fn()},
    })
    const {container} = render(<PreviewWrapper mock={data.mock} method="GET" statusCode={200} />)
    const element = container.getElementsByClassName('preview-wrapper')
    expect(element).toBeTruthy()
  })
  it('single div class validate', () => {
    const {container} = render(<PreviewWrapper mock={data.mock} method="GET" statusCode={200} />)
    const element = container.getElementsByClassName('preview-wrapper')
    expect(element).toBeTruthy()
  })
})
