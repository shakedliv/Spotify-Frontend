import { useNavigate } from "react-router"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { stationService } from "../services/station"
import { addStation } from "../store/actions/station.actions"
import { StationList } from "./StationList"




export function Library() {

    const navigate = useNavigate()


    async function onAddStation() {
        const station = stationService.getEmptyStation()
        station.name = prompt('Name?', 'Some Name')
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
            // navigate(`/${savedStation._id}`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }



    return (
        <div className="Library"> 
            <header className="library-header">
                <h2>Your Library</h2>
                {<button onClick={onAddStation}>+</button>}
            </header>
            <section className="library-list">

            </section>
        </div>
    )
}