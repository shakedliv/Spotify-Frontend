export function TrackPreview({ track, onAddTrack, onRemoveTrack }) {
    const organizedTrack = track.track
    return (
        <article className='track-preview'>
          <section className='basic-info-container'>
             <span  className='track-num'>1</span>
             <img
                 className='track-img'
                src={organizedTrack.album.images[0].url}
                alt=''
                style={{ width: 50, height: 50 }}
            />
                <b className='track-name'>{organizedTrack.name} </b>
                <span  className='track-artist'>{organizedTrack.artists[0].name}</span>
            </section>
            <span>{organizedTrack.album?.name} </span>
            <div className='track-actions'>
                <button onClick={onRemoveTrack}>X</button>
                <button onClick={onAddTrack}>...</button>
            </div>
            {/* <span>{track.duration_ms}</span> convert to minutes */}
        </article>
    )
}
