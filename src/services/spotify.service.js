import rawTracks from '../services/spotify/data/tracks.raw.json'

export const spotifyService = {
    searchTracks
}

function searchTracks(query) {
    if (!query) return []

    const q = query.toLowerCase().trim()

    return rawTracks
        .filter(track =>
            track.name.toLowerCase().startsWith(q)
        )
        .map(normalizeTrack)
}

function normalizeTrack(track) {
    return {
        id: track.id,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        img:
            track.album.images[2]?.url ||
            track.album.images[0]?.url,
        album: track.album.name,
        duration: track.duration_ms
    }
}
