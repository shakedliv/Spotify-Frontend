import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { LibraryOptionsModal } from './LibraryOptionsModal'
import { useCloseOnOutside } from '../hooks/useCloseOnOutside.js'

export function StationPreview({ station, onRemoveStation, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [menuStyle, setMenuStyle] = useState({})
    const menuRef = useRef(null)

    useCloseOnOutside(menuRef, () => {
        if (isModalOpen) setIsModalOpen(false)
    })

   function handleRightClick(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      if(type !== 'library') return

        const menuWidth = 325
        const menuHeight = 530
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight

        let x = ev.clientX
        let y = ev.clientY

        if (x + menuWidth > screenWidth) {
            x = x - menuWidth
        }

        if (y + menuHeight > screenHeight) {
            y = y - menuHeight
        }

        setMenuStyle({
            top: y + 'px',
            left: x + 'px',
            position: 'fixed',
            zIndex: 1000,
        })

        setIsModalOpen(true)
    }

    if (type === 'library') {
        return (
            <>
                <Link to={`/station/${station._id}`} className='station-link'>
                    <article
                        className='station-preview'
                        onContextMenu={handleRightClick}
                    >
                        <div className='station-img'>
                            <img
                                src={
                                    station.tracks[0]?.track.album.images[0]
                                        .url || station.imgUrl
                                }
                                alt={station.name}
                            />
                            <div className='icon-backdrop'>
                                <PlayArrowIcon className='library-play-icon' />
                            </div>
                        </div>
                        <h3 className='station-name'>{station.name}</h3>
                        <h5> Playlist • {station.owner.fullname}</h5>
                    </article>
                </Link>
                {isModalOpen && (
                    <div
                        className='station-options-menu'
                        ref={menuRef}
                        style={menuStyle}
                        onClick={(ev) => ev.stopPropagation()}
                    >
                        <LibraryOptionsModal
                            onRemoveStation={() => onRemoveStation(station._id)}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                )}
            </>
        )
    }

    if (type === 'first') {
        return (
            <Link to={`/station/${station._id}`} className='station-link'>
                <article
                    className='station-preview'
                    onContextMenu={handleRightClick}
                >
                    <div className='station-img'>
                        <img
                            src={
                                station.tracks[0]?.track.album.images[0].url ||
                                station.imgUrl
                            }
                            alt={station.name}
                        />
                    </div>
                    <h3 className='station-name'>{station.name}</h3>
                    <PlayCircleFilledIcon className='play-icon' />

                    {isModalOpen && (
                        <div
                            className='station-options-menu'
                            ref={menuRef}
                            style={{
                                ...menuStyle,
                                position: 'absolute',
                                zIndex: 100,
                            }}
                            onClick={(ev) => ev.stopPropagation()}
                        >
                            <LibraryOptionsModal
                                RemoveStation={() =>
                                    onRemoveStation(station._id)
                                }
                            />
                        </div>
                    )}
                </article>
            </Link>
        )
    }

    return (
        <Link to={`/station/${station._id}`} className='station-link'>
            <article
                className='station-preview'
                onContextMenu={handleRightClick}
            >
                <div className='station-img'>
                    <img
                        src={
                            station.tracks[0]?.track.album.images[0].url ||
                            station.imgUrl
                        }
                        alt={station.name}
                    />
                    <PlayCircleFilledIcon className='play-icon' />
                </div>
                <p className='station-desc'>{station.description}</p>

                {isModalOpen && (
                    <div
                        className='station-options-menu'
                        ref={menuRef}
                        style={{
                            ...menuStyle,
                            position: 'absolute',
                            zIndex: 100,
                        }}
                        onClick={(ev) => ev.stopPropagation()}
                    >
                        <LibraryOptionsModal
                            RemoveStation={() => onRemoveStation(station._id)}
                        />
                    </div>
                )}
            </article>
        </Link>
    )
}
