import { useSelector } from 'react-redux'
import { userService } from '../services/user'
import { StationPreview } from './StationPreview'
import { Link } from 'react-router-dom'

export function StationList({ onRemoveStation }) {


    const stations = useSelector(storeState => storeState.stationModule.stations)


    return (
        <div className="station-list">
            {stations.map(station => (
                <StationPreview
                    key={station._id}
                    station={station}
                    onRemoveStation={onRemoveStation}
                />
            ))}
        </div>
    )
}