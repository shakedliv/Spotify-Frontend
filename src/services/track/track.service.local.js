import { storageService } from '../async-storage.service'
import { makeId, formatDate } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'station'

export const trackService = {
    query,
    getById,
    add,
    remove,
}
window.cs = trackService

async function query(filterBy = { name: '' }) {
    var tracks = await storageService.query(STORAGE_KEY)
    const { name, sortField, sortDir } = filterBy

    // sorting and filtering is relevant just for playlists (not albums)
    if (name) {
        const regex = new RegExp(name, 'i')
        tracks = tracks.filter(
            (track) =>
                regex.test(track.name) ||
                track.artists.some((artist) => regex.test(artist.name))
        )
    }
    if (sortField === 'name') {
        tracks.sort(
            (track1, track2) =>
                track1[sortField].localeCompare(track2[sortField]) * +sortDir
        )
    }
    if (sortField === 'artist') {
        tracks.sort(
            (track1, track2) =>
                (track1[sortField] - track2[sortField]) * +sortDir
        )
    }

    tracks = tracks.map(
        ({ id, name, artists, img, duration_ms, date_added, owner }) => ({
            id,
            name,
            artists,
            img,
            duration_ms,
            date_added,
            owner,
        })
    )
    return tracks
}

function getById(trackId) {
    return storageService.get(STORAGE_KEY, trackId)
}

async function remove(trackId) {
    await storageService.remove(STORAGE_KEY, trackId)
}

async function add(track) {
    const trackToSave = {
        id: track.id,
        name: track.name,
        artists: track.artists,
        duration_ms: track.duration_ms,
        date_added: formatDate(Date.now()),
        img: track.img,
    }
    const savedTrack = await storageService.post(STORAGE_KEY, trackToSave)
    return savedTrack
}
