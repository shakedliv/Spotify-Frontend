import { useNavigate } from "react-router"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { stationService } from "../services/station"
import { addStation, removeStation } from "../store/actions/station.actions"

import { useSelector } from "react-redux"
import { LibraryStationList } from "./LibraryStationList"
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

import { LibraryOpenIcon, LibraryCloseIcon, ExpandIcon, SearchIcon } from '../services/svg.service.js'


export function Library({ isLibraryOpen, onToggleLibrary }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const user = useSelector(storeState => storeState.userModule.user)
    const [activeTab, setActiveTab] = useState('')

    const navigate = useNavigate()

 
    const stationsForUser = stations.filter(station =>
            user?.userStationsIds?.includes(station._id))


    async function onRemoveStation(stationId) {
        try {
            await removeStation(stationId)
            showSuccessMsg('Station removed')
        } catch (err) {
            showErrorMsg('Cannot remove station')
        }
    }

    async function onAddStation() {
        const station = stationService.getEmptyStation()
        station.name = `My Playlist #${stationsForUser.length + 1}`
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
            navigate(`/station/${savedStation._id}`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }

    const className = isLibraryOpen ? 'open' : 'closed'
    return (
        <div className={`library ${className}`}>
            <header className="library-header">
                <div className="icon-title-div">
                    <span onClick={onToggleLibrary} className="library-toggle"> {isLibraryOpen ? <LibraryOpenIcon /> : <LibraryCloseIcon />}</span>
                    <h2>Your Library</h2>
                </div>
                <div className="library-header-btns">
                    <button className="add-station-btn" onClick={onAddStation}><AddIcon /> <span>Create</span> </button>
                    <button className="expand-btn" ><ExpandIcon /></button>
                </div>
            </header>

            <section className="filter-btns">
                <button
                    className={`library-btn ${activeTab === "playlists" ? "active" : ""}`}
                    onClick={() => setActiveTab("playlists")}
                >
                    Playlists
                </button>

                <button
                    className={`library-btn ${activeTab === "artists" ? "active" : ""}`}
                    onClick={() => setActiveTab("artists")}
                >
                    Artists
                </button>

                <button
                    className={`library-btn ${activeTab === "albums" ? "active" : ""}`}
                    onClick={() => setActiveTab("albums")}
                >
                    Albums
                </button>
            </section>

            <div className="search-sort">
                <button className="search"><SearchIcon /></button>
                <span className="sort-list">Recents <FormatListBulletedIcon /></span>
            </div>

            <section className={`library-station-list ${className}`}>
                <LibraryStationList
                    onRemoveStation={(stationId) => { onRemoveStation(stationId) }}
                    stations={stationsForUser}
                />
            </section>
        </div>
    )
}