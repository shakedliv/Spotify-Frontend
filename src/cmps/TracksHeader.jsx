import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export function TracksHeader({ onSort }) {
    const [sortDir, setSortDir] = useState(1)
    function handleSort(sortField) {
        const sortBy = { sortField: sortField, sortDirection: sortDir }
        setSortDir(sortDir * -1)
        onSort(sortBy)
    }

    return (
        <section className='tracks-header-container'>
            <span>#</span>
            <span className={'btn'} onClick={() => handleSort('name')}>
                Title
            </span>
            <span className={'btn'} onClick={() => handleSort('album')}>
                Album
            </span>
            <span className={'btn'} onClick={() => handleSort('date-added')}>
                Date added
            </span>
            <div className={'duration-container'}>
                <span className={'btn duration'} onClick={() => handleSort('duration')}>
                    🕑
                </span>
                <button className='demoBtn'>
                    <ArrowDropDownIcon />
                </button>
            </div>
        </section>
    )
}
