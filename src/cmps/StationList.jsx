import { useRef } from "react"
import { StationPreview } from "./StationPreview"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'


export function StationList({ onRemoveStation, stations, title }) {
    const scrollerRef = useRef(null)

    function scrollByOffset(offset) {
        if (!scrollerRef.current) return
        scrollerRef.current.scrollBy({
            left: offset,
            behavior: "smooth",
        })
    }



    return (
        <>
            {!!stations.length && <div className='index-header'>{title}</div>}
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
