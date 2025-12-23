import rawTracks from '../services/spotify/data/tracks.raw.json'
import { spotifyService } from '../services/spotify.service.js'
import { TrackList } from './TrackList.jsx'
import { useEffect, useState } from 'react'
export function RecommendedSongs({ onAddTrack, stationTracks }) {
   console.log('stationTracks:',stationTracks )
    const [tracks, setTracks] = useState([])
   useEffect(() => {
      const adaptedTracks = rawTracks.map(spotifyService.adaptTrackForList)
      const filteredTracks = adaptedTracks.filter(track => !stationTracks.find(stationTrack => stationTrack.id === track.id))   
        setTracks(filteredTracks)
   }, [stationTracks])
   
   function handleOnAddTrack(track) {
    setTracks(tracks.filter(t => t.id !== track.id))  
    onAddTrack(track)
   }

    return (
        <section className='recommended-songs'>
          <TrackList
                isTrackSearch={true}
                tracks={tracks}
                onAddTrack={(track) => handleOnAddTrack(track)}
                isSearch={true}
            />
        </section>
    )
}
