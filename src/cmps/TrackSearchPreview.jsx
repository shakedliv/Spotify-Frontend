import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {  useDispatch } from 'react-redux'

import { adaptTrackForPlayer } from '../services/track/track.util'
import { setCurrentTrack } from '../store/actions/system.actions'
import { youtubeService } from '../services/youtube.service'

export function TrackSearchPreview({ track, onAddTrack }) {
    const { track: info } = track
    const dispatch = useDispatch()

    async function onPlayTrack() {
        try {
            const videoId = await youtubeService.resolveVideoId(track)
            const adaptedTrack = {
                ...adaptTrackForPlayer(track),
                videoId,
            }
            dispatch(setCurrentTrack(adaptedTrack))
        } catch (err) {
           console.error('Failed to resolve YouTube video', err)
           showErrorMsg('Failed to play track. Please try again later.')
        }
    }
    return (
        <article className="track-search-preview" onClick={() => onPlayTrack()}>
            <div className="img-container" >
                <img src={info.album.images[0].url} alt="" />
                <PlayArrowIcon className="play-icon-overlay" />
            </div>

            <div className="info">
                <div className="name">{info.name}</div>
                <div className="artist">{info.artists[0].name}</div>
            </div>

            <div className="album">{info.album.name}</div>

            <button className="add-btn" onClick={(ev) => {
                ev.stopPropagation()
                onAddTrack(track)
            }}>
                Add
            </button>
        </article>
    )
}