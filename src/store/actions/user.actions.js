import { userService } from '../../services/user'
import { socketService } from '../../services/socket.service'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import {
    REMOVE_USER,
    SET_USER,
    SET_USERS,
    TOGGLE_LIKED_SONG,
    TOGGLE_STATION_LIKE,
} from '../reducers/user.reducer'
import { formatDate } from '../../services/util.service'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user,
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user,
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null,
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function toggleLikedSong(track) {
    const state = store.getState()
    const user = state.userModule.user
    if (!user) {
        showErrorMsg('You must log in to like songs')
        return
    }
    try {
        track.dateAddedToLikedSongs = Date.now()
        store.dispatch({ type: TOGGLE_LIKED_SONG, track })
        const updatedUser = store.getState().userModule.user
        const savedUser = await userService.update(updatedUser)
        store.dispatch({ type: SET_USER, user: savedUser })
    } catch (err) {
       store.dispatch({ type: TOGGLE_LIKED_SONG, track })
       throw err
    }
}
export async function toggleStationLike(stationId) {
    const state = store.getState()
    const user = state.userModule.user
    if (!user) {
        showErrorMsg('You must login to like playlist')
        return
    }
    try {
        store.dispatch({ type: TOGGLE_STATION_LIKE, stationId })
        const updatedUser = store.getState().userModule.user
        const savedUser = await userService.update(updatedUser)
        store.dispatch({ type: 'SET_USER', user: savedUser })
    } catch (err) {
       store.dispatch({ type: TOGGLE_STATION_LIKE, stationId })
         throw err
    }
}