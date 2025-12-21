import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations, addStation, updateStation, removeStation, addStationMsg } from '../store/actions/station.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stationService } from '../services/station/'
import { userService } from '../services/user'

import { StationList } from '../cmps/StationList'
import { StationFilter } from '../cmps/StationFilter'
import { FirstStationList } from '../cmps/FirstStationList'


export function StationIndex() {
    const [activeFilter, setActiveFilter] = useState("all")
    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)


    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    async function onRemoveStation(stationId) {
        try {
            await removeStation(stationId)
            showSuccessMsg('Station removed')
        } catch (err) {
            showErrorMsg('Cannot remove station')
        }
    }


    return (
        <main className="station-index">
            <div className='filter-bar'>
                <button
                    className={`index-filter-btn ${activeFilter === "all" ? "active" : ""}`}
                    onClick={() => setActiveFilter("all")}>
                    All
                </button>
                <button
                    className={`index-filter-btn ${activeFilter === "music" ? "active" : ""}`}
                    onClick={() => setActiveFilter("music")}>
                    Music
                </button>
                <button
                    className={`index-filter-btn ${activeFilter === "podcast" ? "active" : ""}`}
                    onClick={() => setActiveFilter("podcast")}>
                    Podcast
                </button>
            </div>


            <FirstStationList
                onRemoveStation={onRemoveStation}
                stations={stations}
            />
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
                title={'Made For'}
            />

            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
                title={'Jump back in'}
            />
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
                title={'Trending'}
            />
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
                 title={'Recently Played'}
            />
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
            />
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
            />

        </main>
    )
}