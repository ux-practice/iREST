import React, {useState} from 'react'
import arrowUp from '../../assets/images/iRest_files/arrowUp.png'
import arrowDown from '../../assets/images/iRest_files/arrowDown.png'
import './mockList.css'

const TableSorting = ({tableHeader, onSorting}) => {
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')

  const onSortingChange = field => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc'
    setSortingField(field)
    setSortingOrder(order)
    onSorting(field, order)
  }

  const processImage = () => {
    if (sortingOrder === 'asc') {
      return <img src={arrowUp} alt="arrow_up" />
    }
    return <img src={arrowDown} alt="arrow_up" />
  }

  return (
    <thead className="table-theme">
      <tr>
        {tableHeader.map(({name, field, sortable}) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            style={{cursor: 'pointer'}}
            className="table-label"
          >
            {name} {sortingField && sortingField === field && processImage()}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableSorting
