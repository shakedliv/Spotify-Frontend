import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { store } from '../store/store'
import { loadStation, updateStation } from '../store/actions/station.actions'
import { StationEdit } from '../cmps/StationEdit'
import { TrackList } from '../cmps/TrackList'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { ShuffleIcon } from '../services/svg.service.js'
import { FastAverageColor } from 'fast-average-color'
import { StationTrackSearch } from '../cmps/StationTrackSearch'
import {
    SAVE_LAST_ORDER,
    UPDATE_STATION,
} from '../store/reducers/station.reducer.js'
import { formatDate } from '../services/util.service.js'
import { CloseIcon } from '../assets/svg/CloseIcon.jsx'

export function StationDetails() {
    const { stationId } = useParams()

    const [bgGradient, setBgGradient] = useState(
        'linear-gradient(180deg, #333 0%, #000 70%)'
    )
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    const tracks = station?.tracks || []
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isFindMore, setIsFindMore] = useState(false)

    useEffect(() => {
        loadStation(stationId)
    }, [stationId])

    useEffect(() => {
        const img = station?.tracks[0]?.track.album.images[0].url

        if (!img) {
            setBgGradient('linear-gradient(180deg, #333 0%, #000 60%)')
            return
        }
        const fac = new FastAverageColor()


        async function calcColor() {
            try {
                const color = await fac.getColorAsync(img)
              
                const [r, g, b] = color.value
                const main = `rgb(${r}, ${g}, ${b})`
                const dark = `rgb(${Math.max(r - 40, 0)}, 
                ${Math.max(g - 40, 0)}, ${Math.max(b - 40, 0)})`

                setBgGradient(
                    `linear-gradient(180deg, ${main} 0%, ${dark} 15%, #000 45%)`
                )
            } catch (err) {
                console.error('error getting color:', err)
                setBgGradient('linear-gradient(180deg, #333 0%, #000 70%)')
            }
        }

        calcColor()

    }, [station])


    async function onRemoveTrack(trackId) {
        const updatedTracks = station.tracks.filter(
            (track) => track.id !== trackId
        )
        const updatedStation = { ...station, tracks: updatedTracks }
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
        await updateStation(updatedStation)
    }

    async function onAddTrack(track) {
        const isTrackExists = station.tracks.some((t) => t.id === track.id)
        if (isTrackExists) {
            console.log('Track already exists in this station')
            return
        }
        track.dateAdded = Date.now()
        const updatedTracks = [...station.tracks, track]
        const updatedStation = { ...station, tracks: updatedTracks }
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
        await updateStation(updatedStation)
    }

    async function onReorder(newTracks) {
        store.dispatch({ type: SAVE_LAST_ORDER, station: station })
        const updatedStation = { ...station, tracks: newTracks }
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
        try {
            await updateStation(updatedStation)
        } catch (err) {
            console.error('Failed to update tracks order:', err)
        }
    }

    function toggleFindMore() {
        setIsFindMore(!isFindMore)
    }
    if (!station) return <div>Loading...</div>

    return (
        <section className='station-details' style={{ backgroundImage: bgGradient }}>
            <header>
                <img
                    src={
                        station.tracks[0]?.track.album.images[0].url ||
                        station.imgUrl
                    }
                    alt={station.name}
                />
                <h1 onClick={() => setIsEditOpen(true)}>{station.name}</h1>
                <h4 className='desc'>{station.description || ''}</h4>
                <h5>
                    {station.owner.fullname} •{' '}
                    <span>{station?.tracks?.length} songs</span>
                </h5>

                <section className='station-details-btns'>
                    <div className='play-btns'>
                        <PlayCircleFilledIcon className='play-icon' />
                        <button className='shuffle-btn'>
                            {' '}
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
                tracks={station.tracks}
                onReorder={onReorder}
                onRemoveTrack={onRemoveTrack}
                onAddTrack={onAddTrack}
                isSearch={false}
            />

            <StationTrackSearch
                onAddTrack={onAddTrack}
                stationId={stationId}
                isFindMore={isFindMore}
             toggleFindMore={toggleFindMore}
             stationTracks={station.tracks}
            />

            {isEditOpen && (
                <StationEdit
                    station={station}
                    onClose={() => setIsEditOpen(false)}
                />
            )}
        </section>
    )
}
