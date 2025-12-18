import { useState } from 'react'
export function TrackPreview({ track, onAddTrack, onRemoveTrack, trackNum }) {
   const organizedTrack = track.track
    return (
        <article className='track-preview'>
          <section className='basic-info-container'>
             <span className='track-num'>{trackNum}</span>
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
            <span>Sep 24, 2024</span> 
            <span>3:45</span> 
            <div className='track-actions'>
                <button onClick={onRemoveTrack}>X</button>
                <button onClick={onAddTrack}>...</button>
            </div>
        </article>
    )
}
