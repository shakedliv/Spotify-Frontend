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
            {/* <StationFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <section >
                <FirstStationList
                    onRemoveStation={onRemoveStation}
                    stations={stations}
                />
            </section>
            <h2>Made For</h2>
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
            />

            <h2>Jump back in</h2>
            <StationList
                onRemoveStation={onRemoveStation}
                stations={stations}
            />
        </main>
    )
}