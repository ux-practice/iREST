import React from 'react'
import {render, screen} from '@testing-library/react'
import JsonEditorKey from '../../../../src/static/components/createMock/JsonditorKey'

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
    value: '{"name":"John"}',
    setDynamicKeys: jest.fn(),
    dynamicKeys: {name: 'John'},
  }
  const newProps = {
    setJsonEditorError: jest.fn(),
    json: {},
    text: 'NULL',
    mode: 'view',
    value: '{"name":"John"}',
    setDynamicKeys: jest.fn(),
    dynamicKeys: {name: 'John'},
  }
  it('Should render the component with tree mode', () => {
    render(<JsonEditorKey {...props} />)
    expect(screen.getByTestId('jsoneditor-key')).toBeTruthy()
  })
  it('Should render the component with view mode', () => {
    render(<JsonEditorKey {...newProps} />)
    expect(screen.getByTestId('jsoneditor-key')).toBeTruthy()
  })
})
