import { useState } from 'react'
import { formatDate, formatDuration } from '../services/util.service.js'
export function TrackPreview({ track, onAddTrack, onRemoveTrack, trackNum }) {
    const organizedTrack = track.track
    console.log('organizedTrack:', organizedTrack)
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
                <span className='track-artist'>
                    {organizedTrack.artists[0].name}
                </span>
            </section>
            <span>{organizedTrack.album?.name} </span>
            <span>Sep 24, 2024</span>
            <span>{formatDuration(organizedTrack.duration_ms)}</span>
            <div className='track-actions'>
                <button onClick={() => onRemoveTrack(track.id)}>X</button>
                <button onClick={() => onAddTrack(track)}>...</button>
            </div>
        </article>
    )
}
