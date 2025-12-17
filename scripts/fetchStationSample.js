import 'dotenv/config'
import fs from 'fs'


const MODE = 'playlist' // 'track' | 'playlist'

const TRACK_ID = '3n3Ppam7vgaVa1iaRUc9Lp'
const PLAYLIST_SEARCH_QUERY = 'lofi'

const TRACK_OUTPUT_PATH = 'src/services/station/data/track.sample.raw.json'
const PLAYLIST_OUTPUT_PATH = 'src/services/station/data/station.sample.raw.json'

//AUTH


async function getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        throw new Error('Missing Spotify client credentials')
    }

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        body: 'grant_type=client_credentials'
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error('Failed to get access token: ' + text)
    }

    const data = await res.json()
    return data.access_token
}

//FETCH TRACK


async function fetchTrack(token) {
    const res = await fetch(
        `https://api.spotify.com/v1/tracks/${TRACK_ID}?market=US`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    if (!res.ok) {
        const text = await res.text()
        throw new Error('Failed to fetch track: ' + text)
    }

    return res.json()
}

// FETCH PLAYLIST (SAFE FLOW)


async function fetchPlaylist(token) {
    // 1. Search playlists (client-credentials safe)
    const searchRes = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            PLAYLIST_SEARCH_QUERY
        )}&type=playlist&market=US&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    if (!searchRes.ok) {
        const text = await searchRes.text()
        throw new Error('Playlist search failed: ' + text)
    }

    const searchData = await searchRes.json()

    const playlists = (searchData.playlists?.items || []).filter(Boolean)

    if (!playlists.length) {
        throw new Error('No playlists returned from search')
    }

    const playlist = playlists[0]

    // 2. Fetch playlist tracks (always allowed)
    const itemsRes = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?market=US&limit=50`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    if (!itemsRes.ok) {
        const text = await itemsRes.text()
        throw new Error('Fetching playlist tracks failed: ' + text)
    }

    const tracks = await itemsRes.json()

    // RAW data, combined
    return {
        playlist,
        tracks
    }
}

// RUN


async function run() {
    console.log('Getting access token...')
    const token = await getAccessToken()

    if (MODE === 'track') {
        console.log('Fetching track...')
        const track = await fetchTrack(token)

        fs.writeFileSync(
            TRACK_OUTPUT_PATH,
            JSON.stringify(track, null, 2)
        )

        console.log('Track saved to:', TRACK_OUTPUT_PATH)
        return
    }

    if (MODE === 'playlist') {
        console.log('Fetching playlist...')
        const playlist = await fetchPlaylist(token)

        fs.writeFileSync(
            PLAYLIST_OUTPUT_PATH,
            JSON.stringify(playlist, null, 2)
        )

        console.log('✔ Playlist saved to:', PLAYLIST_OUTPUT_PATH)
        return
    }

    throw new Error(`Unknown MODE: ${MODE}`)
}

run()
