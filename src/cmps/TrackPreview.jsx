export function TrackPreview({ track, onAddTrack, onRemoveTrack }) {
    const organizedTrack = track.track
    console.log('track:', organizedTrack)
    console.log('img:', organizedTrack.artists[0].name)
    return (
        <article className='track-preview'>
           
                <img
                    src={organizedTrack.album.images[0].url}
                    alt=''
                    style={{ width: 50, height: 50 }}
                />
            <span>{organizedTrack.name} </span>
            <span>{organizedTrack.artists[0].name}</span>
            <span>{organizedTrack.album?.name} </span>
            <div className='track-actions'>
                <button onClick={onRemoveTrack}>X</button>
                <button onClick={onAddTrack}>...</button>
            </div>
            {/* <span>{track.duration_ms}</span> convert to minutes */}
        </article>
    )
}
