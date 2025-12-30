import rawTracks from '../services/spotify/data/tracks.raw.json'
import rawExplorerItems from '../services/spotify/data/genres.raw.json'

const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET, VITE_LOCAL } =
    import.meta.env

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search'

const queryCache = new Map()

let accessToken = null
let tokenExpiresAt = 0

export const spotifyService = {
    searchTracks,
    searchTracksRemote,
    getExplorerItems,
    adaptTrackForList,
}

function searchTracks(query) {
    if (!query) return []

    const term = query.toLowerCase().trim()

    return rawTracks
        .filter((track) => track.name.toLowerCase().startsWith(term))
        .map(adaptTrackForList)
}

function getExplorerItems() {
    return rawExplorerItems
}

function adaptTrackForList(track) {
    return {
        id: track.id,
        track: {
            name: track.name,
            artists: track.artists.map((artist) => ({
                name: artist.name,
            })),
            album: {
                name: track.album.name,
                images: track.album.images,
            },
            duration_ms: track.duration_ms,
        },
    }
}

async function searchTracksRemote(query) {
    if (!query) return []

    const term = query.toLowerCase().trim()
    if (queryCache.has(term)) return queryCache.get(term)

    const promise = (async () => {
        const token = await getAccessToken()
        const params = new URLSearchParams({
            q: term,
            type: 'track',
            limit: 30,
        })
        const res = await fetch(`${SPOTIFY_SEARCH_URL}?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            throw new Error('Spotify search failed')
        }

        const data = await res.json()
        const tracks = data.tracks?.items || []
        return tracks.map(adaptSpotifyTrack)
    })()

    queryCache.set(term, promise)

    try {
        return await promise
    } catch (err) {
        queryCache.delete(term)
        throw err
    }
}

async function getAccessToken() {
    const now = Date.now()
    if (accessToken && now < tokenExpiresAt) return accessToken

    if (!VITE_SPOTIFY_CLIENT_ID || !VITE_SPOTIFY_CLIENT_SECRET) {
        throw new Error('Missing Spotify client credentials')
    }

    const res = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                btoa(`${VITE_SPOTIFY_CLIENT_ID}:${VITE_SPOTIFY_CLIENT_SECRET}`),
        },
        body: 'grant_type=client_credentials',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch Spotify access token')
    }

    const data = await res.json()
    accessToken = data.access_token
    tokenExpiresAt = now + data.expires_in * 1000 - 5000

    return accessToken
}

function adaptSpotifyTrack(track) {
    return {
        id: track.id,
        track: {
            name: track.name,
            artists: track.artists.map((a) => ({ name: a.name })),
            album: {
                name: track.album.name,
                images: track.album.images,
            },
            duration_ms: track.duration_ms,
        },
    }
}
