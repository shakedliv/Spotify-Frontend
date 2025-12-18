import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadStation } from '../store/actions/station.actions'


export function StationDetails() {

  const { stationId } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)


  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  console.log(station)

  if (!station) return <div>Loading...</div>

  return (
    <section className="station-details">
      <Link to="/station">Back to list</Link>

      <header>
        <img src={station.imgUrl || ''} alt={station.name} />
        <h1>{station.name}</h1>
        <h4 className='desc'>station description</h4>
        <h5>station creator</h5>

      </header>



    </section>
  )
}