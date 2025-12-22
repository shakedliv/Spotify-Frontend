import { useSelector } from 'react-redux'
import { TrackList } from '../cmps/TrackList'
import likedSongsImg from '../assets/imgs/likedSongsImg.jpg'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { ShuffleIcon } from '../services/svg.service.js'
import { store } from '../store/store.js'
import {
    SAVE_LAST_ORDER,
    UPDATE_STATION,
} from '../store/reducers/station.reducer.js'
import { updateStation } from '../store/actions/station.actions.js'

export function LikedSongs() {
    const user = useSelector((state) => state.userModule.user)
   const station = null
   // change the user state
    async function onReorder(newTracks) {
        store.dispatch({ type: SAVE_LAST_ORDER, station: station })
        const updatedStation = { ...station, tracks: newTracks }
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
        try {
           await updateStation(updatedStation)
           //update user
        } catch (err) {
            console.error('Failed to update tracks order:', err)
        }
    }

    if (!user) return null
    const likedTracks = user.likedSongs
    return (
        <section className='liked-station-details'>
            <header>
                <div className='station-img liked'>
                    <img src={likedSongsImg} alt='liked songs' />
                </div>
                <h1>Liked Songs</h1>
                <h4 className='desc'>{likedTracks.length} songs</h4>

                <section className='station-details-btns'>
                    <div className='play-btns'>
                        <PlayCircleFilledIcon className='play-icon' />
                        <button className='shuffle-btn'>
                            <ShuffleIcon />
                        </button>
                    </div>
                    <div className='list-btn'>
                        List
                        <FormatListBulletedIcon className='list-icon' />
                    </div>
                </section>
            </header>

            <TrackList
                tracks={likedTracks}
             isSearch={false}
             isDraggable={false}
             onReorder={onReorder}
            />
        </section>
    )
}
