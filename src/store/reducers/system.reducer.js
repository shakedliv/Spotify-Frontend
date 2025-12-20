export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'


const initialState = {
  isLoading: false,
  currentTrack: null,
  isPlaying: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }

    case LOADING_DONE:
      return { ...state, isLoading: false }

    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.track }

    case SET_IS_PLAYING:
      return { ...state, isPlaying: action.isPlaying }

    default:
      return state
  }

}
