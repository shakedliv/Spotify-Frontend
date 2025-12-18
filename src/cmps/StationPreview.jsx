import { Link } from "react-router-dom"


export function StationPreview({ station, onRemoveStation, type }) {

    const user = userService.getLoggedinUser()
    const canEdit = user && station.owner?._id === user._id


    if (type === 'first') {
        return (
            <Link to={`/station/${station._id}`} className="station-link">
                <article className="station-preview">

                    <div className="station-img">
                        <img src={station.imgUrl} alt={station.name} />
                    </div>
                    <h3 className="station-name">{station.name}</h3>
           
                </article >
            </Link>
        )

    }



    return (
        <Link to={`/station/${station._id}`} className="station-link">
            <article className="station-preview">

                <div className="station-img">
                    <img src={station.imgUrl} alt={station.name} />
                </div>
                <p className="station-desc">{station.description}</p>
                {/* <h4>
                    {station.artists.slice(0, 3).join(', ')}
                    {station.artists.length > 3 && ' and more'}
                </h4> */}
                {canEdit && (
                    <button
                        type="button"
                        onClick={() => onRemoveStation(station._id)}
                    >
                        x
                    </button>
                )}
            </article >
        </Link>
    )
}

