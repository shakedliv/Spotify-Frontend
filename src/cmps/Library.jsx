import { useNavigate } from "react-router"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { stationService } from "../services/station"
import { addStation } from "../store/actions/station.actions"
import { StationList } from "./StationList"
import { useSelector } from "react-redux"
import { LibraryStationList } from "./LibraryStationList"
import AddIcon from '@mui/icons-material/Add'



export function Library() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const navigate = useNavigate()


    async function onAddStation() {
        const station = stationService.getEmptyStation()
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
            navigate(`/station/${savedStation._id}`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }



    return (
        <div className="library">
            <header className="library-header">
                <h2>Your Library</h2>
                <button className="add-station-btn" onClick={onAddStation}><AddIcon /> <span>Create</span> </button>
            </header>
            <section className="library-list">
                <LibraryStationList
                    stations={stations}

                />

            </section>
        </div>
    )
}