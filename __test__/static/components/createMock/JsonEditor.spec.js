import React from 'react'
import {render, screen} from '@testing-library/react'
import JsonEditor from '../../../../src/static/components/createMock/JsonEditor'

describe('testing JsonEditor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  const props = {
    setJsonEditorError: jest.fn(),
    json: {},
    text: 'STRING',
    mode: 'tree',
  }
  const newProps = {
    setJsonEditorError: jest.fn(),
    json: {},
    text: 'NULL',
    mode: 'view',
  }
  it('Should render the component with tree mode', () => {
    render(<JsonEditor {...props} />)
    expect(screen.getByText('STRING')).toBeTruthy()
  })
  it('Should render the component with view mode', () => {
    render(<JsonEditor {...newProps} />)
    expect(screen.getByText('NULL')).toBeTruthy()
  })
})
