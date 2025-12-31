import { useDraggable } from '@dnd-kit/core';
import { TRANSFORMATION_LABELS, type TransformationType } from '../utils/transformers';
import { Plus } from 'lucide-react';

interface DraggableLibraryBlockProps {
  type: TransformationType;
  onClick: (type: TransformationType) => void;
}

export const DraggableLibraryBlock = ({ type, onClick }: DraggableLibraryBlockProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `library-${type}`,
    data: { type },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100,
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onClick(type)}
      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.1] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group text-left"
    >
      <span className="text-sm font-medium text-slate-300 group-hover:text-white truncate">
        {TRANSFORMATION_LABELS[type]}
      </span>
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-slate-800 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
        <Plus className="w-3 h-3 text-slate-500 group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
};
