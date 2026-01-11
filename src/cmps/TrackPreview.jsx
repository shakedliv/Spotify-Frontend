import { useRef, useState } from 'react'
import { formatDate, formatDuration } from '../services/util.service.js'
import { useSelector, useDispatch } from 'react-redux'

import { trackService } from '../services/track/track.service.remote.js'
import { setCurrentTrack, setTracks } from '../store/actions/system.actions'
import { youtubeService } from '../services/youtube.service'
import { AddToLikedSongs } from '../assets/svg/AddToLikedSongs.jsx'
import { RemoveFromLikedSongs } from '../assets/svg/RemoveFromLikedSongs.jsx'
import { useCloseOnOutside } from '../hooks/useCloseOnOutside.js'

//SVG Icons
import { PlusIcon } from '../assets/svg/PlusIcon.jsx'
import { ArrowAsideIcon } from '../assets/svg/ArrowAsideIcon.jsx'
import { AddIcon } from '../assets/svg/AddIcon.jsx'
import { TrashIcon } from '../assets/svg/TrashIcon.jsx'
import { Options } from '../assets/svg/Options.jsx'
import { AddToQueueIcon } from '../assets/svg/AddToQueueIcon.jsx'
import { SpotifyIcon } from '../assets/svg/SpotifyIcon.jsx'
import { toggleLikedSong } from '../store/actions/user.actions.js'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { SongRadioIcon } from '../assets/svg/SongRadioIcon.jsx'
import { ExcludeIcon } from '../assets/svg/ExcludeIcon.jsx'
import { ArtistIcon } from '../assets/svg/ArtistIcon.jsx'
import { AlbumIcon } from '../assets/svg/AlbumIcon.jsx'
import { ViewCreditsIcon } from '../assets/svg/ViewCreditsIcon.jsx'
import { ShareIcon } from '../assets/svg/ShareIcon.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

export function TrackPreview({
    track,
    tracks = [],
    onAddTrack,
    onRemoveTrack,
    trackNum,
    onToggleOptions,
    isOperationsOpen,
    isSearch,
    trackIndex,
    isLikedSongsPage = false,
}) {
    const organizedTrack = track.track
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userModule.user)
    const isLiked = user?.likedSongs?.some((t) => t.id === track.id)
    const menuRef = useRef(null)
    const [menuStyle, setMenuStyle] = useState({})
    const wideClass = isSearch ? 'wide' : ''

    useCloseOnOutside(menuRef, () => {
        if (isOperationsOpen) onToggleOptions(null)
    })

    async function onPlayTrack() {
        try {
            const videoId = await youtubeService.resolveVideoId(track)
            const adaptedTrack = {
                ...trackService.adaptTrackForPlayer(track),
                videoId,
            }
            dispatch(setTracks(tracks))
            dispatch(setCurrentTrack(adaptedTrack, trackIndex))
        } catch (err) {
            console.error('Failed to resolve YouTube video', err)
            showErrorMsg('Failed to play track. Please try again later.')
        }
    }
    function handleAddTrack(track) {
        onAddTrack(track)
        onToggleOptions(null)
    }

    function onLikeClick(ev) {
        ev.stopPropagation()
         try {
             toggleLikedSong(track)
        } catch (err) {
            showErrorMsg('Cannot Add to liked songs')
        }
    }

    function toggleOptions(ev) {
        ev.stopPropagation()
        const rect = ev.currentTarget.getBoundingClientRect()
        const screenHeight = window.innerHeight
        const menuHeight = 450
        const style =
            rect.bottom + menuHeight > screenHeight
                ? { bottom: '100%', top: 'auto' }
                : { top: '100%', bottom: 'auto' }

        setMenuStyle(style)
        onToggleOptions(track.id)
    }
    return (
        <article className={'track-preview'} onClick={onPlayTrack}>
            {isSearch ? (
                <span className='hidden'></span>
            ) : (
                <div className='index-col'>
                    <span className='track-num'>{trackNum}</span>
                    <PlayArrowIcon className='play-icon' />
                </div>
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
            {!isSearch && (
                <>
                    <span className='track-album'>
                        {organizedTrack.album?.name}{' '}
                    </span>
                    <span className='track-date'>
                        {isLikedSongsPage
                            ? formatDate(track.dateAddedToLikedSongs)
                            : formatDate(track.dateAdded)}
                    </span>
                </>
            )}
            <section className={'track-actions'}>
                <button className='like-btn' onClick={onLikeClick}>
                    {isLiked ? <RemoveFromLikedSongs /> : <AddToLikedSongs />}
                </button>
                <div className='time-options' ref={menuRef}>
                    <span className={'duration'}>
                        {formatDuration(organizedTrack.duration_ms)}
                    </span>
                    <button className={'options'} onClick={toggleOptions}>
                        <Options />
                    </button>
                    {isOperationsOpen && (
                        <div
                            className='options-menu'
                            ref={menuRef}
                            style={menuStyle}
                            onClick={(ev) => ev.stopPropagation()}
                        >
                            <button
                                className='flex align-center space-between'
                                onClick={() => handleAddTrack(track)}
                            >
                                <div className='flex align-center gap-1'>
                                    <PlusIcon />
                                    <span>Add to playlist</span>
                                </div>
                                <ArrowAsideIcon />
                            </button>

                            <button
                                className='flex align-center gap-1'
                                onClick={() =>
                                    onRemoveTrack(track.id || organizedTrack.id)
                                }
                            >
                                <TrashIcon />
                                <span>Remove from this playlist</span>
                            </button>

                            <button
                                className='flex align-center gap-1'
                                onClick={onLikeClick}
                            >
                                <AddIcon />
                                <span>Save to your Liked Songs</span>
                            </button>

                            <button className='flex align-center gap-1'>
                                <AddToQueueIcon />
                                <span>Add to queue</span>
                            </button>

                            <button className='flex align-center gap-1'>
                                <ExcludeIcon />
                                <span>Exclude from your taste profile</span>
                            </button>

                            <div className='separator'></div>

                            <button className='flex align-center gap-1'>
                                <SongRadioIcon />
                                <span>Go to song radio</span>
                            </button>

                            <button className='flex align-center space-between'>
                                <div className='flex align-center gap-1'>
                                    <ArtistIcon />
                                    <span>Go to artist</span>
                                </div>
                                <ArrowAsideIcon />
                            </button>

                            <button className='flex align-center gap-1'>
                                <AlbumIcon />
                                <span>Go to album</span>
                            </button>

                            <button className='flex align-center gap-1'>
                                <ViewCreditsIcon />
                                <span>View credits</span>
                            </button>

                            <button className='flex align-center space-between'>
                                <div className='flex align-center gap-1'>
                                    <ShareIcon />
                                    <span>Share</span>
                                </div>
                                <ArrowAsideIcon />
                            </button>

                            <div className='separator'></div>

                            <button className='flex align-center gap-1'>
                                <SpotifyIcon />
                                <span>Open in Desktop app</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </article>
    )
}
