import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { spotifyService } from '../services/spotify.service'
import { TrackList } from '../cmps/TrackList'
import { ExplorerList } from '../cmps/ExplorerList'
import { StationList } from '../cmps/StationList'
import { showErrorMsg } from '../services/event-bus.service'

export function Search() {
    const [searchParams] = useSearchParams()
    const [tracks, setTracks] = useState([])
    const [explorerItems, setExplorerItems] = useState([])

    let query = searchParams.get('q') || ''

    useEffect(() => {
        if (!query) {
            setTracks([])
            setExplorerItems(spotifyService.getExplorerItems())
            return
        }

        let isActive = true

       const fetchTracks = async () => {
            try {
                const results = await spotifyService.searchTracksRemote(query)
                if (!isActive) return
                setTracks(results)
            } catch (err) {
                console.error('Spotify search failed:', err)
                showErrorMsg('Spotify search failed. Please try again later.')
            }
        }
       const timeoutId = setTimeout(fetchTracks, 400)

        return () => {
            isActive = false
            clearTimeout(timeoutId)
        }
    }, [query])

    return (
        <section className='search-page'>
            {!query && <ExplorerList items={explorerItems} />}
            {query && <TrackList tracks={tracks} isSearch={true} />}
        </section>
    )
}
