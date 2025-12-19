import { useSelector } from "react-redux"
import { TrackList } from "../cmps/TrackList"
import likedSongsImg from '../assets/imgs/likedSongsImg.jpg'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

export function LikedSongs() {
    const user = useSelector(state => state.userModule.user)


    if (!user) return null

    const likedTracks = user.likedSongs

    return (
        <section className="liked-station-details">
            <header>
                <div className="station-img liked">
                    <img src={likedSongsImg} alt="liked songs" />
                </div>
                <h1>Liked Songs</h1>
                <h4 className="desc">{likedTracks.length} songs</h4>


                <section className='station-details-btns'>
                    <div className='play-btns'>
                        <PlayCircleFilledIcon className="play-icon" />
                        <button className='shuffle-btn'>Shuffle</button>
                    </div>
                    <div className='list-btn'>List<FormatListBulletedIcon className="list-icon" /></div>
                </section>
            </header>

            <TrackList tracks={likedTracks} />
        </section>
    )
}