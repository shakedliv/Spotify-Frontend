import { storageService } from '../async-storage.service'
import rawTracks from '../../assets/data/track.sample.raw.json'

const STORAGE_KEY = 'track'

export const trackService = {
    query,
    getById
}

async function query(filterBy = { txt: '', sortField: '', sortDir: 1 }) {
    await _ensureSeeded()
    let tracks = await storageService.query(STORAGE_KEY)

    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(txt, 'i')
        tracks = tracks.filter(track =>
            regex.test(track.title) ||
            track.artists.some(artist => regex.test(artist))
        )
    }

    if (sortField === 'title') {
        tracks.sort((a, b) => a.title.localeCompare(b.title) * sortDir)
    }

    if (sortField === 'duration') {
        tracks.sort((a, b) => (a.durationMs - b.durationMs) * sortDir)
    }

    return tracks
}

function getById(trackId) {
    return storageService.get(STORAGE_KEY, trackId)
}

async function _ensureSeeded() {
    const tracks = await storageService.query(STORAGE_KEY)
    if (tracks.length) return

    const rawList = Array.isArray(rawTracks) ? rawTracks : [rawTracks]

    for (const rawTrack of rawList) {
        const track = _normalizeTrack(rawTrack)
        await storageService.post(STORAGE_KEY, track)
    }
}

function _normalizeTrack(rawTrack) {
    return {
        spotifyId: rawTrack.id,
        title: rawTrack.name,
        artists: rawTrack.artists.map(artist => artist.name),
        durationMs: rawTrack.duration_ms,
        album: rawTrack.album.name,
        imgUrl: rawTrack.album.images[0]?.url || '',

    }
}
