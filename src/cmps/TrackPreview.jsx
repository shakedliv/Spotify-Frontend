import { useEffect } from 'react'
import { formatDate, formatDuration } from '../services/util.service.js'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLikedSong } from '../store/actions/user.actions.js'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { adaptTrackForPlayer } from '../services/track/track.util'
import { setCurrentTrack } from '../store/actions/system.actions'
import { youtubeService } from '../services/youtube.service'
import { Options } from '../assets/svg/Options.jsx'
import { AddToLikedSongs } from '../assets/svg/AddToLikedSongs.jsx'
import { RemoveFromLikedSongs } from '../assets/svg/RemoveFromLikedSongs.jsx'

export function TrackPreview({
    track,
    onAddTrack,
    onRemoveTrack,
    trackNum,
    onToggleOptions,
    isOperationsOpen,
    isDraggable,
    isSearch,
}) {
    const organizedTrack = track.track
    const user = useSelector((state) => state.userModule.user)
    const isLiked = user?.likedSongs?.some((t) => t.id === track.id)
    const dispatch = useDispatch()
   const classContainer = isDraggable
        ? 'track-preview draggable'
        : 'track-preview'

   const wideClass = isSearch ? 'wide' : ''
    useEffect(() => {
        if (!isOperationsOpen) return
        const closeMenu = () => onToggleOptions(null)
        window.addEventListener('click', closeMenu)
        return () => window.removeEventListener('click', closeMenu)
    }, [isOperationsOpen, onToggleOptions])

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
        }
    }

    function onLikeClick(ev) {
        ev.stopPropagation()
        toggleLikedSong(track)
    }

    function ToggleOptions(ev) {
        ev.stopPropagation()
        onToggleOptions(track.id)
    }
    return (
        <article className={classContainer} onClick={onPlayTrack}>
            {isSearch ? (
                <span className='hidden'></span>
            ) : (
                <span className='track-num'>{trackNum}</span>
            )}
          <section className={`${wideClass} basic-info-container`}>
                <img
                    className='track-img'
                    src={organizedTrack.album.images[0].url}
                    alt=''
                    style={{ width: 50, height: 50 }}
                />
                <b className='track-name'>{organizedTrack.name} </b>
                <span className='track-artist'>
                    {organizedTrack.artists[0].name}
                </span>
            </section>
            {!isSearch &&
            <>
                <span className='track-album'>
                    {organizedTrack.album?.name}{' '}
             </span>
             <span>{track.dateAdded}</span></>
            }
            <section className={'track-actions'}>
                <button className='like-btn' onClick={onLikeClick}>
                    {isLiked ? <RemoveFromLikedSongs /> : <AddToLikedSongs />}
                </button>
                <div className='time-options'>
                    <span className={'duration'}>
                        {formatDuration(organizedTrack.duration_ms)}
                    </span>
                    <button className={'options'} onClick={ToggleOptions}>
                        <Options />
                    </button>
                    {isOperationsOpen && (
                        <div
                            className='options-menu'
                            onClick={(ev) => ev.stopPropagation()}
                        >
                            <button onClick={() => onAddTrack(track)}>
                                Add to playlist
                            </button>
                            <button
                                onClick={() =>
                                    onRemoveTrack(track.id || organizedTrack.id)
                                }
                            >
                                Remove from this playlist
                            </button>
                            <button onClick={onLikeClick}>
                                Save to your Liked Songs
                            </button>
                            <button>Add to queue</button>
                            <button>Exclude from your taste profile</button>
                            <div className='separator'></div>
                            <button>Go to song radio</button>
                            <button>Go to artist</button>
                            <button>Go to album</button>
                            <button>View credits</button>
                            <button>Share</button>
                            <div className='separator'></div>
                            <button>Open in Desktop app</button>
                        </div>
                    )}
                </div>
            </section>
        </article>
    )
}
