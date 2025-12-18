import React, { useState } from 'react'
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

console.log('demoData:', demoData)
function doNothing() {}
export function TrackList({
    tracks = demoData,
    onRemoveTrack = doNothing,
    onReorder,
    onAddTrack = doNothing,
}) {
    const [trackNum, setTrackNum] = useState(0)
    const [activeId, setActiveId] = useState(null)
    const activeTrack = tracks.find((t) => t.id === activeId)

    function handleDragStart(event) {
        setActiveId(event.active.id)
    }

    function handleDragEnd(event) {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = tracks.findIndex((item) => item.id === active.id)
            const newIndex = tracks.findIndex((item) => item.id === over.id)

            const newOrder = arrayMove(tracks, oldIndex, newIndex)
            onReorder(newOrder)
        }
        setActiveId(null)
    }

    return (
        <>
            <TracksHeader />
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={tracks}
                    strategy={verticalListSortingStrategy}
                >
                    <div className='track-list-container'>
                        {tracks.map((track, index) => (
                            <SortableTrack
                                id={track.id}
                                key={track.id}
                                track={track}
                            >
                              <TrackPreview
                                 trackNum={index + 1}
                                    key={track.id}
                                    track={track}
                                    onRemoveTrack={() =>
                                        onRemoveTrack(track.id)
                                    }
                                    onAddTrack={() => onAddTrack(track.id)}
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
