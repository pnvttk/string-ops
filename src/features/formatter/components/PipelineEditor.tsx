import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { TransformationBlock } from './TransformationBlock';
import { type PipelineBlock } from '../hooks/usePipeline';
import { ArrowDown, Layers } from 'lucide-react';

interface PipelineEditorProps {
  blocks: PipelineBlock[];
  onRemove: (id: string) => void;
}

export const PipelineEditor = ({ blocks, onRemove }: PipelineEditorProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'pipeline-drop-zone',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`min-h-[400px] rounded-[2.5rem] border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center ${
        isOver 
          ? 'border-primary/50 bg-primary/5 scale-[0.99]' 
          : 'border-white/5 bg-slate-900/20'
      }`}
    >
      {blocks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center">
            <Layers className="w-8 h-8 text-slate-500" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-300">Empty Pipeline</p>
            <p className="text-xs max-w-[200px]">Drag blocks here or click them to build your pipeline</p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">
          <SortableContext 
            items={blocks.map(b => b.id)} 
            strategy={verticalListSortingStrategy}
          >
            {blocks.map((block, index) => (
              <div key={block.id} className="flex flex-col items-center">
                {index > 0 && (
                  <div className="py-2 opacity-20">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
                <div className="w-full">
                  <TransformationBlock
                    id={block.id}
                    type={block.type}
                    onRemove={onRemove}
                  />
                </div>
              </div>
            ))}
          </SortableContext>
          
          <div className="pt-8 flex flex-col items-center opacity-20">
            <div className="w-1 h-8 bg-linear-to-b from-white to-transparent rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};
