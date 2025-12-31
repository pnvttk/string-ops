import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { usePipeline } from '../hooks/usePipeline';
import { BlockLibrary } from './BlockLibrary';
import { PipelineEditor } from './PipelineEditor';
import { TRANSFORMATION_LABELS, type TransformationType } from '../utils/transformers';
import { Copy, Trash2, Wand2, Plus } from 'lucide-react';
import { GlassCard } from '../../ui/components/GlassCard';

export const FormatterApp = () => {
  const { 
    input, 
    setInput, 
    blocks, 
    output, 
    addBlock, 
    removeBlock, 
    moveBlock, 
    clearPipeline 
  } = usePipeline();
  
  const [activeType, setActiveType] = useState<TransformationType | null>(null);
  const [copied, setCopied] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.id.toString().startsWith('library-')) {
      setActiveType(active.data.current?.type);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id.toString().startsWith('library-')) {
      addBlock(active.data.current?.type);
    } else if (over && active.id !== over.id) {
      moveBlock(active.id.toString(), over.id.toString());
    }
    
    setActiveType(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-[1400px] mx-auto px-6 pb-24 space-y-12 pt-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                String<span className="text-primary">Ops</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium max-w-md">
              A high-performance modular pipeline for text transformations.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={clearPipeline}
              title="Clear pipeline"
              className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-20"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Result'}
            </button>
          </div>
        </header>

        <main className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Library Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="px-2">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Block Library
              </h2>
            </div>
            <GlassCard className="p-6">
              <BlockLibrary onAdd={addBlock} />
            </GlassCard>
          </div>

          {/* Pipeline Central */}
          <div className="lg:col-span-5 space-y-6">
            <div className="px-2 flex items-center justify-between">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                Active Pipeline
                <span className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-[9px] text-slate-300">
                  {blocks.length}
                </span>
              </h2>
            </div>
            <PipelineEditor 
              blocks={blocks} 
              onRemove={removeBlock} 
            />
          </div>

          {/* Input/Output Column */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">
                Flow Input
              </h2>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Drop source text here..."
                className="w-full h-40 bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 text-slate-200 placeholder:text-slate-700 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-hidden transition-all resize-none font-mono text-sm leading-relaxed"
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] px-2">
                Pipeline Result
              </h2>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-[2rem] opacity-20 blur-sm group-hover:opacity-30 transition-opacity" />
                <div className="relative w-full min-h-[12rem] bg-slate-950 border border-white/10 rounded-[2rem] p-8 font-mono text-lg text-white break-all whitespace-pre-wrap">
                  {output || <span className="opacity-10 italic">Waiting for input...</span>}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <DragOverlay>
        {activeType ? (
          <div className="px-6 py-4 rounded-2xl bg-primary shadow-2xl shadow-primary/40 text-white font-bold flex items-center gap-3 border border-white/20 select-none">
            <Plus className="w-4 h-4" />
            {TRANSFORMATION_LABELS[activeType]}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
