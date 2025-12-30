export function adaptTrackForPlayer(track) {
   
   const organizedTrack = track.track

    return {
       id: track.id,
        imgUrl: organizedTrack.album.images[0].url,
        title: organizedTrack.name,
       artists: organizedTrack.artists.map(artist => artist.name),
        durationMs: organizedTrack.duration_ms,
    }
}
