import { Link } from "react-router-dom"
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import defaultStationImg from '../assets/imgs/defaultStationImg.png'

export function StationPreview({ station, onRemoveStation, type }) {

    const user = userService.getLoggedinUser()
    const canEdit = user && station.owner?._id === user._id

    if (type === 'library') {
        return (
            <Link to={`/station/${station._id}`} className="station-link">
                <article className="station-preview">

                    <div className="station-img">
                        <img src={station.imgUrl !== defaultStationImg ? station.imgUrl : station.tracks[0]?.track.album.images[0].url || defaultStationImg} alt={station.name} />
                        <div className='icon-backdrop'>
                            < PlayArrowIcon className='library-play-icon' />
                        </div>
                    </div>
                    <h3 className="station-name">{station.name}</h3>
                    <h5> Playlist • {station.owner.fullname}</h5>
                </article >
            </Link>
        )

    }


    if (type === 'first') {
        return (
            <Link to={`/station/${station._id}`} className="station-link">
                <article className="station-preview">

                    <div className="station-img">
                        <img src={station.imgUrl !== defaultStationImg ? station.imgUrl : station.tracks[0]?.track.album.images[0].url || defaultStationImg} alt={station.name} />
                    </div>
                    <h3 className="station-name">{station.name}</h3>
                    <PlayCircleFilledIcon className="play-icon" sx={{}} />

                </article >
            </Link>
        )

    }

    return (
        <Link to={`/station/${station._id}`} className="station-link">
            <article className="station-preview">

                <div className="station-img">
                    <img src={station.imgUrl !== defaultStationImg ? station.imgUrl : station.tracks[0]?.track.album.images[0].url || defaultStationImg} alt={station.name} />
                    <PlayCircleFilledIcon className="play-icon" sx={{}} />
                </div>
                <p className="station-desc">{station.description}</p>

                {/* {canEdit && (
                    <button
                        type="button"
                        onClick={() => onRemoveStation(station._id)}
                    >
                        x
                    </button>
                )} */}

            </article >
        </Link>
    )
}

