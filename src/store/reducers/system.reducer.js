export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK'
export const SET_TRACKS = 'SET_TRACKS'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SET_REPEAT = 'SET_REPEAT'
export const SET_SHUFFLE = 'SET_SHUFFLE'

const initialState = {
    isLoading: false,
    tracks: [],
    currentTrack: null,
    currentTrackIndex: null,
   isPlaying: false,
    isShuffle: false,
    isRepeat: false,
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, isLoading: true }

        case LOADING_DONE:
            return { ...state, isLoading: false }

        case SET_CURRENT_TRACK:
          return {
             ...state, currentTrack: action.track
               ,currentTrackIndex: action.index
             }
        case SET_TRACKS:
           return { 
                ...state, 
                tracks: action.tracks 
            }

        case SET_IS_PLAYING:
          return { ...state, isPlaying: action.isPlaying }
       
       case SET_SHUFFLE:
            return { ...state, isShuffle: action.isShuffle }
        case SET_REPEAT:
            return { ...state, isRepeat: action.isRepeat }

        default:
            return state
    }
}
