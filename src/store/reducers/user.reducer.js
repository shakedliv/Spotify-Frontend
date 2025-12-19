import { userService } from '../../services/user'

export const SET_USER = 'SET_USER'

export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

export const TOGGLE_LIKED_SONG = 'TOGGLE_LIKED_SONG'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],

}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case TOGGLE_LIKED_SONG: {
            if (!state.user) return state
            const track = action.track
            const isLiked = state.user.likedSongs?.some(t => t.id === track.id)
            const likedSongs = isLiked
                ? state.user.likedSongs.filter(t => t.id !== track.id)
                : [...(state.user.likedSongs || []), track]

            return {
                ...state, user: { ...state.user, likedSongs }
            }
        }
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
