import { useSelector } from 'react-redux'

import { StationPreview } from './StationPreview'


export function StationList({ onRemoveStation, stations}) {


  


    return (
        <div className="station-list">
            {stations.map(station => (
                <StationPreview
                    key={station._id}
                    station={station}
                    onRemoveStation={onRemoveStation}
                    type={'default'}
                />
            ))}
        </div>
    )
}