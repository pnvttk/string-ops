import { useState, useMemo } from 'react';
import { TRANSFORMERS, type TransformationType } from '../utils/transformers';
import { arrayMove } from '@dnd-kit/sortable';

export interface PipelineBlock {
	id: string;
	type: TransformationType;
}

export const usePipeline = (initialInput: string = '') => {
	const [input, setInput] = useState(initialInput);
	const [blocks, setBlocks] = useState<PipelineBlock[]>([]);

	const output = useMemo(() => {
		return blocks.reduce((acc, block) => {
			const transformer = TRANSFORMERS[block.type];
			return transformer ? transformer(acc) : acc;
		}, input);
	}, [input, blocks]);

	const addBlock = (type: TransformationType) => {
		setBlocks((prev) => [...prev, { id: crypto.randomUUID(), type }]);
	};

	const removeBlock = (id: string) => {
		setBlocks((prev) => prev.filter((block) => block.id !== id));
	};

	const moveBlock = (activeId: string, overId: string) => {
		setBlocks((items) => {
			const oldIndex = items.findIndex((i) => i.id === activeId);
			const newIndex = items.findIndex((i) => i.id === overId);
			return arrayMove(items, oldIndex, newIndex);
		});
	};

	const clearPipeline = () => setBlocks([]);

	return {
		input,
		setInput,
		blocks,
		setBlocks,
		output,
		addBlock,
		removeBlock,
		moveBlock,
		clearPipeline,
	};
};
