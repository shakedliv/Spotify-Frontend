import { SET_CURRENT_TRACK, SET_IS_PLAYING, SET_TRACKS,SET_REPEAT,SET_SHUFFLE } from '../reducers/system.reducer'

export function setCurrentTrack(track,index) {
    return {
        type: SET_CURRENT_TRACK,
        track,index
    }
}
export function setTracks(tracks) {
    return {
        type: SET_TRACKS,
        tracks
    }
}
export function toggleShuffle(isShuffle) {
    return { type: SET_SHUFFLE, isShuffle: !isShuffle }
}
export function toggleRepeat(isRepeat) {
    return { type: SET_REPEAT, isRepeat: !isRepeat }
}

export function setIsPlaying(isPlaying) {
    return {
        type: SET_IS_PLAYING,
        isPlaying
    }
}
