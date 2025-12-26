import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { store } from '../store/store'
import { loadStation, updateStation } from '../store/actions/station.actions'
import { StationEdit } from '../cmps/StationEdit'
import { TrackList } from '../cmps/TrackList'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { ShuffleIcon } from '../services/svg.service.js'
import { FastAverageColor } from 'fast-average-color'
import { StationTrackSearch } from '../cmps/StationTrackSearch'
import { SAVE_LAST_ORDER, UPDATE_STATION } from '../store/reducers/station.reducer.js'
import defaultStationImg from '../assets/imgs/defaultStationImg.png'

import { SOCKET_EMIT_STATION_WATCH, SOCKET_EVENT_ADD_TRACK, SOCKET_EVENT_REMOVE_TRACK, SOCKET_EVENT_STATION_UPDATED, socketService } from '../services/socket.service.js'
import { CoPresent } from '@mui/icons-material'
import { SET_USER } from '../store/reducers/user.reducer.js'


export function StationDetails() {
    const { stationId } = useParams()
    const [r, setR] = useState(0)
    const [g, setG] = useState(0)
    const [b, setB] = useState(0)
    const [bgGradient, setBgGradient] = useState('')

    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    const tracks = station?.tracks || []
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isFindMore, setIsFindMore] = useState(false)


    useEffect(() => {
        const img = station?.tracks[0]?.track.album.images[0].url

        if (!img) {
            setBgGradient('linear-gradient(180deg, #666666ff 0%, #181818 40%)')
            return
        }
        const fac = new FastAverageColor()

        calcColor()
        async function calcColor() {
            try {
                const color = await fac.getColorAsync(img)
                console.log(color)
                const [r, g, b] = color.value

                setR(r)
                setG(g)
                setB(b)

                setBgGradient(
                    `linear-gradient(180deg, transparent, rgb(${r},${g},${b}))`
                )
            } catch (err) {
                console.error('error getting color:', err)
                setBgGradient('linear-gradient(180deg, #333 0%, #000 70%)')
            }
        }

    }, [station])

    useEffect(() => {
        loadStation(stationId)
        socketService.emit(SOCKET_EMIT_STATION_WATCH, stationId)
        socketService.on(SOCKET_EVENT_ADD_TRACK, onAddTrackFromSocket)
        socketService.on(SOCKET_EVENT_REMOVE_TRACK, onRemoveTrackFromSocket)



        return () => {
            socketService.off(SOCKET_EVENT_ADD_TRACK, onAddTrackFromSocket)
            socketService.off(SOCKET_EVENT_REMOVE_TRACK, onRemoveTrackFromSocket)

        }
    }, [stationId])


    function onAddTrackFromSocket(track) {
        const currentStation = store.getState().stationModule.station

        const currentTracks = currentStation.tracks || []
        const updatedTracks = [...currentTracks, track]

        store.dispatch({ type: UPDATE_STATION, station: { ...currentStation, tracks: updatedTracks } })
    }

    function onRemoveTrackFromSocket(trackId) {
        const currentStation = store.getState().stationModule.station

        const currentTracks = currentStation.tracks || []
        const updatedTracks = currentTracks.filter(t => t.id !== trackId)

        store.dispatch({ type: UPDATE_STATION, station: { ...currentStation, tracks: updatedTracks } })
    }


    async function onRemoveTrack(trackId) {
        const updatedTracks = station.tracks?.filter(
            (track) => track.id !== trackId
        )
        const updatedStation = { ...station, tracks: updatedTracks }
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })

        try {
            await updateStation(updatedStation)
            socketService.emit(SOCKET_EVENT_REMOVE_TRACK, { stationId, trackId })
        } catch (error) {
            console.error('Failed to remove track:', error)
        }
    }

    async function onAddTrack(track) {
        const isTrackExists = station.tracks?.some((t) => t.id === track.id)
        if (isTrackExists) {
            console.log('Track already exists in this station')
            return
        }
        track.dateAdded = Date.now()
        const updatedTracks = [...station.tracks, track]
        const updatedStation = { ...station, tracks: updatedTracks }
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
        try {
            await updateStation(updatedStation)
            socketService.emit(SOCKET_EVENT_ADD_TRACK, { stationId, track })
        } catch (error) {
            console.error('Failed to add track:', error)
        }
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
        <section className='station-details' >
            <header className='station-details-header' style={{ backgroundImage: bgGradient, backgroundColor: `rgb(${r - 80},${g - 80},${b - 80}` }} >
                <img
                    src={
                        station.imgUrl !== defaultStationImg ? station.imgUrl : station.tracks[0]?.track.album.images[0].url || defaultStationImg
                    }
                    alt={station.name}
                />
                <h1 onClick={() => setIsEditOpen(true)}>{station.name}</h1>
                <h4 className='desc'>{station.description || ''}</h4>
                <h5>
                    {station.owner?.fullname} •{' '}
                    <span>{station?.tracks?.length} songs</span>
                </h5>

            </header>

            <section className='station-details-btns' style={{ backgroundImage: `linear-gradient(180deg, rgba(${r},${g},${b},0.7), transparent)` }}>
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
