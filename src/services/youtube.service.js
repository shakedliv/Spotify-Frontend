const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

const queryCache = new Map()
const trackIdCache = new Map()

export const youtubeService = {
    searchVideo,
    resolveVideoId,
}

async function resolveVideoId(track) {
    if (!track) throw new Error('resolveVideoId: track is required')

    const trackId = track.id || track._id
    if (!trackId) throw new Error('resolveVideoId: track id is missing')

    if (trackIdCache.has(trackId)) {
        console.log('[YT CACHE HIT]', trackId)
        return trackIdCache.get(trackId)
    }
    console.log('[YT CACHE MISS]', trackId)


    const { videoId } = await searchVideo(track)

    trackIdCache.set(trackId, videoId)

    return videoId
}

async function searchVideo(track) {
    if (!API_KEY) throw new Error('Missing VITE_YOUTUBE_API_KEY')

    const title = track?.title || track?.track?.name
    if (!title) throw new Error('searchVideo: track title is required')

    const query = buildSearchQuery(track)
    if (!query) throw new Error('searchVideo: query is empty')

    if (queryCache.has(query)) return queryCache.get(query)

    const promise = (async () => {
        const params = new URLSearchParams({
            part: 'snippet',
            type: 'video',
            maxResults: 1,
            q: query,
            key: API_KEY,
        })

        const res = await fetch(`${BASE_URL}?${params.toString()}`)
        const data = await res.json()

        if (!res.ok) {
            const msg = data?.error?.message || 'YouTube API request failed'
            throw new Error(msg)
        }

        if (!data.items || !data.items.length) {
            throw new Error('No YouTube results found')
        }

        return {
            videoId: data.items[0].id.videoId,
        }
    })()

    queryCache.set(query, promise)

    try {
        return await promise
    } catch (err) {
        queryCache.delete(query)
        throw err
    }
}

function buildSearchQuery(track) {
    const title = track?.title || track?.track?.name || ''

    let artists = ''

    if (Array.isArray(track?.artists)) {
        artists = track.artists.join(' ')
    } else if (Array.isArray(track?.track?.artists)) {
        artists = track.track.artists.map(a => a.name).join(' ')
    }

    return `${artists} ${title}`.trim()
}
