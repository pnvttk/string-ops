import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TRANSFORMATION_LABELS, type TransformationType } from '../utils/transformers';
import { GripVertical, X } from 'lucide-react';

interface TransformationBlockProps {
  id: string;
  type: TransformationType;
  onRemove: (id: string) => void;
}

export const TransformationBlock = ({ id, type, onRemove }: TransformationBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/5 shadow-lg group hover:border-white/10 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-white/5 text-slate-600 group-hover:text-slate-400 transition-colors"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      
      <div className="flex-1">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
          Transformation
        </div>
        <div className="text-sm font-semibold text-slate-100">
          {TRANSFORMATION_LABELS[type]}
        </div>
      </div>

      <button
        onClick={() => onRemove(id)}
        className="p-2 rounded-xl hover:bg-red-500/10 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
        title="Remove block"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
