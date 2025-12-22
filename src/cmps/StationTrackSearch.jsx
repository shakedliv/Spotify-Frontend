import { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { TrackList } from './TrackList'
import SearchIcon from '@mui/icons-material/Search'
import { CloseIcon } from '../assets/svg/CloseIcon'
import { Recommend } from '@mui/icons-material'
import { RecommendedSongs } from './RecommendedSongs'

export function StationTrackSearch({ onAddTrack, stationId, isFindMore, toggleFindMore }) {
    const [query, setQuery] = useState('')
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        if (!query) {
            setTracks([])
            return
        }

        const results = spotifyService.searchTracks(query)
        setTracks(results)
    }, [query])

    useEffect(() => {
        setQuery('')
    }, [stationId])

    function handleChange(ev) {
        setQuery(ev.target.value)
    }
   function handleCloseFindMore() {
   setQuery(null)
    toggleFindMore()
}
    return (
        <section className='station-track-search-container'>
            {isFindMore ? (
                <section className='station-track-search'>
                    <section className='station-track-search-header'>
                        <h4>Let's find something for your playlist</h4>
                        <div className='station-search-bar'>
                            <SearchIcon className='search-icon' />
                            <input
                                type='text'
                                placeholder='Search for songs'
                                value={query}
                                onChange={handleChange}
                            />
                        </div>
                    </section>
                    <button
                        className='close-btn'
                        onClick={() => handleCloseFindMore()}
                    >
                        <CloseIcon className='close-icon' />
                    </button>
                </section>
            ) : (
                <section className='recommended-container'>
                   <h5 className='find-more'  onClick={() => toggleFindMore()}>Find more</h5>
                    <h4 className='recommended-header'>Recommended</h4>
                    {tracks.length ? (
                        <h5 className='recommended-subheader'>Based on what's in this playlist</h5>
                    ) : (
                        <h5 className='recommended-subheader'>Based on your listening</h5>
                   )}
                   <RecommendedSongs />
                </section>
            )}
            {query && (
             <TrackList
                isTrackSearch={true}
                    tracks={tracks}
                    onAddTrack={onAddTrack}
                    isSearch={true}
                    // no onRemoveTrack here – this list is only for adding
                />
            )}
        </section>
    )
}
