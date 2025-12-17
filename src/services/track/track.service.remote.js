import { httpService } from '../http.service'

export const trackService = {
    query,
    getById,
    add,
    remove,
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
