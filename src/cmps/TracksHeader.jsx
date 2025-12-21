import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ClockIcon } from '../assets/svg/ClockIcon.jsx'

export function TracksHeader({ onSort, isSearch }) {
    const [sortDir, setSortDir] = useState(1)
    function handleSort(sortField) {
        const sortBy = { sortField: sortField, sortDirection: sortDir }
        setSortDir(sortDir * -1)
        onSort(sortBy)
    }

    if (isSearch) return <h1 className='songs-header'>Songs</h1>
    return (
        <section className='tracks-header-container'>
            <span className='number'>#</span>
            <span className={'btn title'} onClick={() => handleSort('name')}>
                Title
            </span>
            <span className={'btn album'} onClick={() => handleSort('album')}>
                Album
            </span>
            <span
                className={'btn date-added'}
                onClick={() => handleSort('date-added')}
            >
                Date added
            </span>
            <div className={'duration-container'}>
                <span
                    className={'btn duration'}
                    onClick={() => handleSort('duration')}
                >
                    <ClockIcon />
                </span>
                <button className='demoBtn'>
                    <ArrowDropDownIcon />
                </button>
            </div>
        </section>
    )
}
