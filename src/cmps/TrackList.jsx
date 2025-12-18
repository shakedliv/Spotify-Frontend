import React, { useState } from 'react'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { SortableTrack } from './SortableTrack.jsx'
import { TrackPreview } from './TrackPreview.jsx'

export function TrackList({ tracks, onRemoveTrack, onReorder }) {
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
                    {tracks.map((track) => (
                        <SortableTrack
                            id={track.id}
                            key={track.id}
                            track={track}
                        >
                            <TrackPreview
                                track={track}
                                onRemove={() => onRemoveTrack(track.id)}
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
    )
}
