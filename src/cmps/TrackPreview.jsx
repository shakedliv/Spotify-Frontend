import { Link } from 'react-router-dom'

export function TrackPreview({ track, onRemove }) {
    return (
        <article className='track-preview'>
            {track.img && (
                <img src={track.img} alt='' style={{ width: 50, height: 50 }} />
            )}
            <span>{track.name}</span>
            <span>{track.artists}</span>
          <span>{track.album?.name}</span>
          <button onClick={onRemove}></button>
            {/* <span>{track.duration_ms}</span> convert to minutes */}
        </article>
    )
}
