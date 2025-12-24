export function adaptTrackForPlayer(track) {
   
   const organizedTrack = track.track
   console.log('track:', track)

    return {
       id: track.id,
      //  album: organizedTrack.album,
        imgUrl: organizedTrack.album.images[0].url,
        title: organizedTrack.name,
       artists: organizedTrack.artists.map(artist => artist.name),
      //   artists: organizedTrack.artists,
        durationMs: organizedTrack.duration_ms,
    }
}
