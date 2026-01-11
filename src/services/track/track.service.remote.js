import { httpService } from '../http.service'

export const trackService = {
    query,
    getById,
    add,
   remove,
   adaptTrackForPlayer,
    sortTracks,
}

async function query(filterBy = { name: ''}) {
    return httpService.get(`track`, filterBy)
}

function getById(trackId) {
    return httpService.get(`track/${trackId}`)
}

async function remove(trackId) {
    return httpService.delete(`track/${trackId}`)
}
async function add(track) {
  return httpService.post('track', track)
}

function adaptTrackForPlayer(track) {
   
   const organizedTrack = track.track

    return {
       id: track.id,
        imgUrl: organizedTrack.album.images[0].url,
        title: organizedTrack.name,
       artists: organizedTrack.artists.map(artist => artist.name),
        durationMs: organizedTrack.duration_ms,
    }
}

function sortTracks(sortBy, tracksToSort) {
        const { sortField, sortDirection } = sortBy

        if (sortField === 'name') {
            tracksToSort.sort(
                (track1, track2) =>
                    track1.track.name.localeCompare(track2.track.name) *
                    +sortDirection
            )
        } else if (sortField === 'album') {
            tracksToSort.sort(
                (track1, track2) =>
                    track1.track.album.name.localeCompare(
                        track2.track.album.name
                    ) * +sortDirection
            )
        } else if (sortField === 'duration') {
            tracksToSort.sort(
                (track1, track2) =>
                    (track1.track.duration_ms - track2.track.duration_ms) *
                    +sortDirection
            )
        } else if (sortField === 'date-added') {
            tracksToSort.sort(
                (track1, track2) =>
                    (track1.dateAdded - track2.dateAdded) * +sortDirection
            )
   }
   return tracksToSort
}