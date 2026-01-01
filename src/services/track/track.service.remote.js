import { httpService } from '../http.service'

export const trackService = {
    query,
    getById,
    add,
   remove,
    adaptTrackForPlayer,
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
