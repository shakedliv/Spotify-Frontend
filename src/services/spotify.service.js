import rawTracks from '../services/spotify/data/tracks.raw.json'
import rawExplorerItems from '../services/spotify/data/genres.raw.json'

export const spotifyService = {
    searchTracks,
    getExplorerItems,
}

function searchTracks(query) {
    if (!query) return []

    const term = query.toLowerCase().trim()

    return rawTracks
        .filter(track =>
            track.name.toLowerCase().startsWith(term)
        )
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
            artists: track.artists.map(artist => ({
                name: artist.name,
            })),
            album: {
                name: track.album.name,
                images: track.album.images,
            },
            duration: formatDuration(track.duration_ms),
        },
    }
}

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
