const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

export const youtubeService = {
    searchVideo,
}

async function searchVideo(track) {
    const title = track.title || track.track?.name
    if (!title) throw new Error('searchVideo: track title is required')

    const query = buildSearchQuery(track)
    

    const params = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        maxResults: 1,
        q: query,
        key: API_KEY,
    })

    const res = await fetch(`${BASE_URL}?${params.toString()}`)
    const data = await res.json()

    if (!data.items || !data.items.length) {
        throw new Error('No YouTube results found')
    }

    return {
        videoId: data.items[0].id.videoId,
    }
}

function buildSearchQuery(track) {
    const title = track.title || track.track?.name || ''

    let artists = ''

    if (Array.isArray(track.artists)) {
        artists = track.artists.join(' ')
    } else if (Array.isArray(track.track?.artists)) {
        artists = track.track.artists.map(a => a.name).join(' ')
    }

    return `${artists} ${title}`.trim()
}

