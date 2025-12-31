import type { TransformationType } from './transformers';

export interface Category {
	name: string;
	types: TransformationType[];
}

export const CATEGORIES: Category[] = [
	{
		name: "Case Changes",
		types: ['lowercase', 'uppercase', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case']
	},
	{
		name: "Encoding",
		types: ['base64_encode', 'base64_decode']
	},
	{
		name: "Utilities",
		types: ['trim', 'reverse']
	}
];
