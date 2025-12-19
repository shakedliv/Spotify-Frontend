import { useSelector } from 'react-redux'

import { StationPreview } from './StationPreview'


export function FirstStationList({ onRemoveStation, stations }) {

    return (
        <div className="first-station-list">
            {stations.slice(0, 8).map(station => (
                <StationPreview
                    key={station._id}
                    station={station}
                    onRemoveStation={onRemoveStation}
                    type={'first'}
                />
            ))}
        </div>
    )
}