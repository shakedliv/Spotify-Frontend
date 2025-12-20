
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import defaultStationImg from '../../assets/imgs/defaultStationImg.png'
// import demoPlaylist from '../../assets/styles/data/station.sample.raw.json'
// import stationSample from '../../assets/data/station.sample.raw.json'

// const demoData = stationSample.tracks.items

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
}
window.cs = stationService


async function query(filterBy = { txt: '' }) {
    // let stations = [_mapSpotifyPlaylistToStation(demoPlaylist)]
    var stations = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.description))
    }

    if (sortField === 'name') {
        stations.sort((station1, station2) =>
            station1[sortField].localeCompare(station2[sortField]) * +sortDir)
    }

    console.log(stations)

    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {

        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        const stationToSave = {
            name: station.name,
            imgUrl: station.imgUrl || defaultStationImg,
            owner: userService.getLoggedinUser(),
            tracks: []
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

// async function addStationMsg(stationId, txt) {
//     // Later, this is all done by the backend
//     const station = await getById(stationId)

//     const msg = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     station.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, station)

//     return msg
// }

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