import { useRef } from "react"
import { StationPreview } from "./StationPreview"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { userService } from "../services/user"


export function StationList({ onRemoveStation, stations, title }) {
    const scrollerRef = useRef(null)
    const user = userService.getLoggedinUser()
    function scrollByOffset(offset) {
        if (!scrollerRef.current) return
        scrollerRef.current.scrollBy({
            left: offset,
            behavior: "smooth",
        })
    }



    return (
        <>
            {!!stations.length &&

                (title === 'Made For') ?
                <div>
                    <h3 className="username-station-header">{title}</h3>
                    <h1 className='index-header' >{user?.fullname}</h1>
                </div>
                :
                <div className='index-header'>{title}</div>



            }
            <section className="station-row">

                <button
                    className="station-row-arrow left"
                    onClick={() => scrollByOffset(-300)}
                >
                    <ArrowBackIosNewIcon />
                </button>

                <div className="station-list" ref={scrollerRef}>
                    {stations.map((station) => (
                        <StationPreview
                            key={station._id}
                            station={station}
                            onRemoveStation={onRemoveStation}
                            type="default"
                        />
                    ))}
                </div>

                <button
                    className="station-row-arrow right"
                    onClick={() => scrollByOffset(300)}
                >
                    <ArrowForwardIosIcon />
                </button>

            </section>
        </>
    )
}
