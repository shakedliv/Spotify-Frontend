import React, { useState, useEffect } from 'react'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableTrack } from './SortableTrack.jsx'
import { TrackPreview } from './TrackPreview.jsx'
import { TracksHeader } from './TracksHeader.jsx'
import stationSample from '../assets/data/station.sample.raw.json'
const demoData = stationSample.tracks.items

export function TrackList({
    tracks = demoData,
    onRemoveTrack,
    onReorder,
    onAddTrack,
}) {
   console.log('tracks:', tracks)
   console.log('onRemoveTrack:',onRemoveTrack )
    const [activeId, setActiveId] = useState(null)
    const activeTrack = tracks.find((t) => t.id === activeId)
    const [currTracks, setCurrTracks] = useState(tracks)
    useEffect(() => {
        setCurrTracks(tracks)
    }, [tracks])
    function handleDragStart(event) {
        setActiveId(event.active.id)
    }
    function onSort(sortBy) {
        // sortBy = {sortField: name, sortDirection: -1}
        const tracksToSort = [...currTracks]
        const { sortField, sortDirection } = sortBy

        //   if (sortField === 'name' || sortField === 'album') {
        //       tracksToSort.sort(
        //           (track1, track2) =>
        //               track1[sortField].localeCompare(track2[sortField]) *
        //               +sortDirection
        //       )
        if (sortField === 'name') {
            tracksToSort.sort(
                (track1, track2) =>
                    track1.track.name.localeCompare(track2.track.name) *
                    +sortDirection
            )
        } else if (sortField === 'album') {
            tracksToSort.sort(
                (track1, track2) =>
                    track1.track.album.name.localeCompare(
                        track2.track.album.name
                    ) * +sortDirection
            )
        } else if (sortField === 'duration') {
            tracksToSort.sort(
                (track1, track2) =>
                    (track1.track.duration_ms - track2.track.duration_ms) *
                    +sortDirection
            )
        }
        // else if (sortField === 'date-added') {
        //       tracksToSort.sort(
        //           (track1, track2) =>
        //           (track1.dateAdded - track2.dateAdded) * +sortDirection
        //       )
        //   }
        setCurrTracks(tracksToSort)
    }
    function handleDragEnd(event) {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = currTracks.findIndex(
                (item) => item.id === active.id
            )
            const newIndex = currTracks.findIndex((item) => item.id === over.id)

            const newOrder = arrayMove(currTracks, oldIndex, newIndex)
            onReorder(newOrder)
        }
        setActiveId(null)
    }

    return (
        <>
            <TracksHeader onSort={onSort} />
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={currTracks}
                    strategy={verticalListSortingStrategy}
                >
                    <div className='track-list-container'>
                        {currTracks.map((track, index) => (
                            <SortableTrack
                                id={track.id}
                                key={track.id}
                                track={track}
                            >
                                <TrackPreview
                                    trackNum={index + 1}
                                    key={track.id}
                                    track={track}
                                    onRemoveTrack={onRemoveTrack}
                                    onAddTrack={onAddTrack}
                                />
                            </SortableTrack>
                        ))}
                    </div>
                </SortableContext>

                <DragOverlay>
                    {activeId ? (
                        <TrackPreview track={activeTrack} isDragging />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    )
}
