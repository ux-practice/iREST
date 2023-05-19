import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import TableSorting from '../../../../src/static/components/mockList/TableSorting'

describe('testing TableSorting Component', () => {
  test('rendering TableSorting with sortable variable to false', () => {
    const tableHeader = [
      {
        name: 'sample table 1',
        field: 'field',
        sortable: false,
      },
    ]
    const onSorting = jest.fn()
    render(<TableSorting tableHeader={tableHeader} onSorting={onSorting} />)
    const p = screen.getByText('sample table 1')
    fireEvent.click(p)
    expect(screen.getByText('sample table 1')).toBeTruthy()
    expect(screen.queryByRole('img')).toBeFalsy()
  })

  test('rendering TableSorting with sortable variable to true', () => {
    const tableHeader = [
      {
        name: 'sample table 2',
        field: 'field',
        sortable: true,
      },
    ]
    const onSorting = jest.fn()
    render(<TableSorting tableHeader={tableHeader} onSorting={onSorting} />)
    const p = screen.getByText('sample table 2')
    fireEvent.click(p)
    expect(screen.getByText('sample table 2')).toBeTruthy()
    fireEvent.click(p)
    expect(screen.getByRole('img')).toBeTruthy()
  })
})
