
import { storageService } from '../async-storage.service'

import { userService } from '../user'
import defaultStationImg from '../../assets/imgs/defaultStationImg.png'
import { demoStations } from '../../assets/data/demo.stations.js'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
}
window.cs = stationService

async function query(filterBy = { txt: '' }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (!stations || !stations.length) {
        await storageService.postMany(STORAGE_KEY, demoStations)
    }
    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.description))
    }

    if (sortField === 'name') {
        stations.sort((station1, station2) =>
            station1[sortField].localeCompare(station2[sortField]) * +sortDir)
    }

    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {

        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        const stationToSave = {
            name: station.name,
            owner: userService.getLoggedinUser(),
            tracks: []
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}


function _mapSpotifyPlaylistToStation(demoPlaylist) {
    const playlist = demoPlaylist.playlist

    const items = demoPlaylist.tracks?.items || []
    const artistNamesSet = new Set()

    items.forEach(item => {
        const artists = item.track?.artists || []
        artists.forEach(artist => {
            if (artist.name) artistNamesSet.add(artist.name)
        })
    })

    const artistNames = Array.from(artistNamesSet)
    return {
        _id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        imgUrl: playlist.images?.[0]?.url || '',
        owner: {
            _id: playlist.owner?.id,
            fullname: playlist.owner?.display_name || playlist.owner?.id,
        },
        artists: artistNames,

    }
}