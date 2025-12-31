import { useState, useMemo } from 'react';
import { TRANSFORMERS, type TransformationType } from '../utils/transformers';

export interface TransformationStep {
	id: string;
	type: TransformationType;
}

export const useStringFormatter = (initialInput: string = '') => {
	const [input, setInput] = useState(initialInput);
	const [steps, setSteps] = useState<TransformationStep[]>([]);

	const output = useMemo(() => {
		return steps.reduce((acc, step) => {
			const transformer = TRANSFORMERS[step.type];
			return transformer ? transformer(acc) : acc;
		}, input);
	}, [input, steps]);

	const addStep = (type: TransformationType) => {
		setSteps((prev) => [...prev, { id: crypto.randomUUID(), type }]);
	};

	const removeStep = (id: string) => {
		setSteps((prev) => prev.filter((step) => step.id !== id));
	};

	const moveStep = (fromIndex: number, toIndex: number) => {
		setSteps((prev) => {
			const result = [...prev];
			const [removed] = result.splice(fromIndex, 1);
			result.splice(toIndex, 0, removed);
			return result;
		});
	};

	const clearSteps = () => setSteps([]);

	return {
		input,
		setInput,
		steps,
		output,
		addStep,
		removeStep,
		moveStep,
		clearSteps,
	};
};
