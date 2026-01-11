import React, { useState, useEffect } from 'react'
import {
    DndContext,
    closestCenter,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableTrack } from './SortableTrack.jsx'
import { TrackPreview } from './TrackPreview.jsx'
import { TracksHeader } from './TracksHeader.jsx'
import stationSample from '../assets/data/station.sample.raw.json'
import { UPDATE_STATION } from '../store/reducers/station.reducer.js'
import { store } from '../store/store.js'
import { TrackSearchPreview } from './TrackSearchPreview.jsx'
import { trackService } from '../services/track/track.service.remote.js'
const demoData = stationSample.tracks.items

export function TrackList({
    tracks = demoData,
    onReorder,
    onRemoveTrack,
    onAddTrack,
    isSearch,
    isDraggable = true,
    isTrackSearch = false,
    isLikedSongsPage = false,
}) {
    const [openedTrackId, setOpenedTrackId] = useState(null)
    const [activeId, setActiveId] = useState(null)
    const activeTrack = tracks.find((t) => t.id === activeId)
    const [currTracks, setCurrTracks] = useState(tracks)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )
    useEffect(() => {
        setCurrTracks(tracks)
    }, [tracks])
    function handleDragStart(event) {
        setActiveId(event.active.id)
    }
    function onSort(sortBy) {
        const tracksToSort = [...currTracks]
        setCurrTracks(trackService.sortTracks(sortBy, tracksToSort))
    }
    function handleDragEnd(event) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            const oldIndex = currTracks.findIndex(
                (item) => item.id === active.id
            )
            const newIndex = currTracks.findIndex((item) => item.id === over.id)
            const newOrder = arrayMove(currTracks, oldIndex, newIndex)
            setCurrTracks(newOrder)
            onReorder(newOrder)
        }
        setActiveId(null)
    }
    return (
        <section className={activeId ? 'track-list is-dragging' : 'track-list'}>
            {!!tracks.length && (
                <TracksHeader
                    onSort={onSort}
                    isSearch={isSearch}
                    isTrackSearch={isTrackSearch}
                />
            )}
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <SortableContext
                    items={currTracks.map((track) => track.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className='track-list-container'>
                        {currTracks.map((track, index) => {
                            const content = isTrackSearch ? (
                                <TrackSearchPreview
                                    track={track}
                                    onAddTrack={onAddTrack}
                                />
                            ) : (
                                <TrackPreview
                                    tracks={tracks}
                                    trackIndex={index}
                                    isLikedSongsPage={isLikedSongsPage}
                                    trackNum={index + 1}
                                    track={track}
                                    isSearch={isSearch}
                                    isDraggable={isDraggable && !isSearch}
                                    onRemoveTrack={onRemoveTrack}
                                    onAddTrack={onAddTrack}
                                    isOperationsOpen={
                                        openedTrackId === track.id
                                    }
                                    onToggleOptions={(id) =>
                                        setOpenedTrackId(
                                            openedTrackId === id ? null : id
                                        )
                                    }
                                />
                            )
                            const canDrag =
                                isDraggable && !isSearch && !isTrackSearch
                            return canDrag ? (
                                <SortableTrack
                                    key={track.id}
                                    id={track.id}
                                    track={track}
                                >
                                    {content}
                                </SortableTrack>
                            ) : (
                                <React.Fragment key={track.id}>
                                    {content}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </SortableContext>

                <DragOverlay>
                    {activeId ? (
                        <TrackPreview track={activeTrack} isDragging />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </section>
    )
}
