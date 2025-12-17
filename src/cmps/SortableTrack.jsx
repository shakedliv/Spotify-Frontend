import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableTrack({ id, children }) {
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging 
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    
    touchAction: 'none' 
  };

  return (
    <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
    >
      {children}
    </div>
  );
}