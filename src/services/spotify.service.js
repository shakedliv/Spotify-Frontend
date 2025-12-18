import rawTracks from '../services/spotify/data/tracks.raw.json'

export const spotifyService = {
    searchTracks,
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
        },
    }
}
