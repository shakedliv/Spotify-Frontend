import 'dotenv/config'
import fs from 'fs'

// ===== CONFIG =====
const SEARCH_QUERY = 'eminem'
const LIMIT = 30

const OUTPUT_PATH = 'src/services/spotify/data/tracks.raw.json'

// ==================

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

async function searchTracks(token) {
	const res = await fetch(
		`https://api.spotify.com/v1/search?q=${encodeURIComponent(
			SEARCH_QUERY
		)}&type=track&market=US&limit=${LIMIT}`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)

	if (!res.ok) {
		const text = await res.text()
		throw new Error('Track search failed: ' + text)
	}

	const data = await res.json()
	return data.tracks.items
}

async function run() {
	console.log('Getting Spotify access token...')
	const token = await getAccessToken()

	console.log(`Searching tracks for "${SEARCH_QUERY}"...`)
	const tracks = await searchTracks(token)

	if (!tracks.length) {
		throw new Error('No tracks returned from Spotify')
	}

	fs.mkdirSync('src/services/spotify/data', { recursive: true })

	fs.writeFileSync(
		OUTPUT_PATH,
		JSON.stringify(tracks, null, 2)
	)

	console.log(`✔ Saved ${tracks.length} tracks to:`)
	console.log(OUTPUT_PATH)
}

run().catch(err => {
	console.error('❌ Error:', err.message)
	process.exit(1)
})
