import { useSelector } from 'react-redux'
import { StationPreview } from './StationPreview'
import { Link } from 'react-router-dom'
import likedSongsImg from '../assets/imgs/likedSongsImg.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export function LibraryStationList({ onRemoveStation, stations }) {
    const user = useSelector((storeState) => storeState.userModule.user)
function handleLikedSongsRightClick(e) {
   e.preventDefault()
   // can open a model with pin later 
    }
    return (
        <>
            {user && (
                <Link to='/liked' className='station-link'>
                    <article
                        className='station-preview'
                        onContextMenu={handleLikedSongsRightClick}
                        
                    >
                        <div className='station-img liked'>
                            <img src={likedSongsImg} alt='' />
                            <div className='icon-backdrop'>
                                <PlayArrowIcon className='library-play-icon' />
                            </div>
                        </div>
                        <h3 className='station-name'>Liked Songs</h3>
                        <h5>{user.likedSongs?.length} songs</h5>
                    </article>
                </Link>
            )}

            {stations.map((station) => (
                <StationPreview
                    key={station._id}
                    station={station}
                    onRemoveStation={onRemoveStation}
                    type={'library'}
                />
            ))}
        </>
    )
}
