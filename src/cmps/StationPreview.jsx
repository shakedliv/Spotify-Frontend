import { Link } from "react-router-dom"


export function StationPreview({ station, onRemoveStation }) {

    const user = userService.getLoggedinUser()
    const canEdit = user && station.owner?._id === user._id

    return (
        <Link to={`/station/${station._id}`} className="station-link">
            <article className="station-preview">

                <div className="station-img">
                    <img src="" alt={station.name} />
                </div>
                <p className="station-desc">playlist text</p>

{/* 
                {canEdit && (
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

