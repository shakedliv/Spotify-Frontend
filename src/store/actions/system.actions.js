import { SET_CURRENT_TRACK, SET_IS_PLAYING } from '../reducers/system.reducer'

export function setCurrentTrack(track) {
    return {
        type: SET_CURRENT_TRACK,
        track
    }
}

export function setIsPlaying(isPlaying) {
    return {
        type: SET_IS_PLAYING,
        isPlaying
    }
}
