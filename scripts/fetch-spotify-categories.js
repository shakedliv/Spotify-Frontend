import 'dotenv/config'
import fs from 'fs'

// ===== CONFIG =====
const LIMIT = 30
const OUTPUT_PATH = 'src/services/spotify/data/genres.raw.json'
// ==================

const BG_COLORS = [
    '#148A08',
    '#1E3264',
    '#8D67AB',
    '#E8115B',
    '#F037A5',
    '#AF2896',
    '#0D73EC',
    '#477D95',
    '#503750',
    '#BA5D07',
    '#E13300',
    '#537AA1',
]

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

async function getCategories(token) {
    const res = await fetch(
        `https://api.spotify.com/v1/browse/categories?limit=${LIMIT}&locale=en_US`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    if (!res.ok) {
        const text = await res.text()
        throw new Error('Categories fetch failed: ' + text)
    }

    const data = await res.json()
    return data.categories.items
}

async function run() {
    console.log('Getting Spotify access token...')
    const token = await getAccessToken()

    console.log('Fetching Spotify categories...')
    const categories = await getCategories(token)

    if (!categories.length) {
        throw new Error('No categories returned from Spotify')
    }

    const normalizedGenres = categories.map((category, idx) => ({
        id: category.id,
        name: category.name,
        imgUrl: category.icons[0]?.url || '',
        bgColor: BG_COLORS[idx % BG_COLORS.length],
    }))

    fs.mkdirSync('src/services/spotify/data', { recursive: true })

    fs.writeFileSync(
        OUTPUT_PATH,
        JSON.stringify(normalizedGenres, null, 2)
    )

    console.log(`✔ Saved ${normalizedGenres.length} genres to:`)
    console.log(OUTPUT_PATH)
}

run().catch(err => {
    console.error('❌ Error:', err.message)
    process.exit(1)
})
