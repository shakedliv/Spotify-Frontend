import { useState } from 'react'

export function TracksHeader({ onSort }) {
   const [sortDir, setSortDir] = useState(1)
   function handleSort(sortField) {
      const sortBy = { sortField: sortField, sortDirection: sortDir }
      setSortDir(sortDir * -1)
      onSort(sortBy)
   }

    return (
        <section className='tracks-header-container'>
            <section>
                <span>#</span>
                <span onClick={() => handleSort('name')}>Title</span>
            </section>
            <span onClick={() => handleSort('album')}>Album</span>
            <span onClick={() => handleSort('date-added')}>Date added</span>
            <span onClick={() => handleSort('duration')}>🕑</span>
            <span>ℹ️</span>
        </section>
    )
}
