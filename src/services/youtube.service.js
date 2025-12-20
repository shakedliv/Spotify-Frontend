const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

const queryCache = new Map()
const trackIdCache = new Map()

export const youtubeService = {
    searchVideo,
    resolveVideoId,
}

const FALLBACK_VIDEO_ID = "dQw4w9WgXcQ"

async function resolveVideoId(track) {
    if (!track) return FALLBACK_VIDEO_ID;

    const trackId = track.id || track._id || track.track?.id;
    if (trackIdCache.has(trackId)) {
        return trackIdCache.get(trackId);
    }

    try {
        if (!API_KEY) throw new Error("Missing API key");

        const { videoId } = await searchVideo(track);
        trackIdCache.set(trackId, videoId);
        return videoId;
    } catch (err) {
        console.warn(
            "[YT fallback] Playing fallback audio for:",
            track?.title || track?.track?.name,
            err.message
        );

        trackIdCache.set(trackId, FALLBACK_VIDEO_ID);
        return FALLBACK_VIDEO_ID;
    }
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
