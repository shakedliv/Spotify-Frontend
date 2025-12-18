import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, addStationMsg } from '../store/actions/station.actions'


export function StationDetails() {

  const { stationId } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  console.log(station)



  return (
    <section className="station-details">
      <Link to="/station">Back to list</Link>

      <header>
        <img src={station.imgUrl} alt={station.name} />
        <h1>{station.name}</h1>
        <h4></h4>
      </header>

      <h1>Station Details</h1>
      {station && <div>
        <h3>{station.name}</h3>

        <pre> {JSON.stringify(station, null, 2)} </pre>
      </div>
      }


    </section>
  )
}