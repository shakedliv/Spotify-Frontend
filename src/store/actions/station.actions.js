import { stationService } from '../../services/station'
import { store } from '../store'
import { ADD_STATION, UNDO_REORDER, REMOVE_STATION, SET_STATIONS, SET_STATION, UPDATE_STATION, ADD_STATION_MSG, REMOVE_TRACK, ADD_TRACK } from '../reducers/station.reducer'
import { showErrorMsg } from '../../services/event-bus.service'
import { SET_USER } from '../reducers/user.reducer'

export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        store.dispatch(getCmdSetStation(station))
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        showErrorMsg('Could not remove station. Please try again')
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdAddStation(savedStation))

        const user = store.getState().userModule.user
        if (user) {
            const updatedUserStationsIds = [...(user.userStationsIds || []), savedStation._id]
            const updatedUser = { ...user, userStationsIds: updatedUserStationsIds }

            const savedUserResponse = await userService.update(updatedUser)

            store.dispatch({ type: SET_USER, user: savedUserResponse })
        }

        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        showErrorMsg('Could not add station. Please try again')

        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        console.log('station:', savedStation)
        store.dispatch({ type: UPDATE_STATION, station: savedStation })

        return savedStation
    } catch (err) {
        store.dispatch(getCmdUndoReorder())
        console.log('Cannot save station', err)
        showErrorMsg('Could not save station. Please try again')

        throw err
    }
}


export async function addTrackToStation(track) {
    const station = store.getState().stationModule.station

    track.dateAdded = Date.now()
    const updatedTracks = [...station.tracks, track]
    const updatedStation = { ...station, tracks: updatedTracks }
    try {
        await updateStation(updatedStation)
    
    } catch (err) {
        console.error('Failed to add track:', err)
        throw err
    }
}

export async function removeTrackFromStation(trackId) {
    try {
        const station = store.getState().stationModule.station
        const updatedStation = {
            ...station,
            tracks: station.tracks.filter(track => track.id !== trackId)
        }
        await updateStation(updatedStation)

    } catch (err) {
        console.error('Failed to remove track:', err)
        throw err
    }
}



// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdUndoReorder() {
    return {
        type: UNDO_REORDER
    }
}
function getCmdAddStationMsg(msg) {
    return {
        type: ADD_STATION_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationService.getEmptyStation())
    await updateStation({
        _id: 'm1oC7',
        name: 'Station-Good',
    })
    await removeStation('m1oC7')
    // TODO unit test addStationMsg
}
