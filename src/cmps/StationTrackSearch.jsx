import { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { TrackList } from './TrackList'
import SearchIcon from '@mui/icons-material/Search'

export function StationTrackSearch({ onAddTrack }) {
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

    function handleChange(ev) {
        setQuery(ev.target.value)
    }

    return (
        <section className='station-track-search'>
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

            {query && (
                <TrackList
                    tracks={tracks}
                    onAddTrack={onAddTrack}
                    isSearch={true}
                    // no onRemoveTrack here – this list is only for adding
                />
            )}
        </section>
    )
}
