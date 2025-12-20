import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadStation, updateStation } from '../store/actions/station.actions'
import { StationEdit } from '../cmps/StationEdit'
import { TrackList } from '../cmps/TrackList'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

export function StationDetails() {

  const { stationId } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)

  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  console.log(station)

  async function onRemoveTrack(trackId) {
    const updatedTracks = station.tracks.filter(track => track.id !== trackId)
    const updatedStation = { ...station, tracks: updatedTracks }
    await updateStation(updatedStation)
  }


  async function onAddTrack(track) {
    console.log('hi')
    const updatedTracks = [...station.tracks, track]
    const updatedStation = { ...station, tracks: updatedTracks }
    await updateStation(updatedStation)
  }


  if (!station) return <div>Loading...</div>

  return (
    <section className="station-details">

      <header>
        <img src={station.imgUrl || ''} alt={station.name} />
        <h1 onClick={() => setIsEditOpen(true)}>{station.name}</h1>
        <h4 className='desc'>{station.description || ''}</h4>
        <h5>{station.owner.fullname}</h5>

        <section className='station-details-btns'>
          <div className='play-btns'>
            <PlayCircleFilledIcon className="play-icon" />
            <button className='shuffle-btn'>Shuffle</button>
          </div>
          <div className='list-btn'>List<FormatListBulletedIcon className="list-icon" /></div>
        </section>
      </header>


      <TrackList
        tracks={station.tracks}
        onRemoveTrack={onRemoveTrack}
        onAddTrack={onAddTrack}
      />

      {isEditOpen && (
        <StationEdit
          station={station}
          onClose={() => setIsEditOpen(false)}
        />
      )}

    </section>
  )
}