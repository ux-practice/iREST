import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Tree from '../../../../src/static/components/common/TreeStructure'

describe('testing the Tree Structure', () => {
  it('should render the Tree Structure', () => {
    render(<Tree />)
    expect(screen.getByText('address')).toBeTruthy()
    expect(screen.getByText('animal')).toBeTruthy()
    expect(screen.getByText('color')).toBeTruthy()
    expect(screen.getByText('company')).toBeTruthy()
    expect(screen.getByText('database')).toBeTruthy()
    expect(screen.getByText('datatype')).toBeTruthy()
    expect(screen.getByText('date')).toBeTruthy()
    expect(screen.getByText('finance')).toBeTruthy()
    expect(screen.getByText('git')).toBeTruthy()
    expect(screen.getByText('helpers')).toBeTruthy()
    expect(screen.getByText('image')).toBeTruthy()
    expect(screen.getByText('internet')).toBeTruthy()
    expect(screen.getByText('music')).toBeTruthy()
    expect(screen.getByText('name')).toBeTruthy()
    expect(screen.getByText('phone')).toBeTruthy()
    expect(screen.getByText('random')).toBeTruthy()
    expect(screen.getByText('science')).toBeTruthy()
    expect(screen.getByText('system')).toBeTruthy()
    expect(screen.getByText('vehicle')).toBeTruthy()
    expect(screen.getByText('word')).toBeTruthy()
  })
})
