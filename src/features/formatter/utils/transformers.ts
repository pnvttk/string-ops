export type TransformationType =
	| 'lowercase'
	| 'uppercase'
	| 'snake_case'
	| 'camelCase'
	| 'PascalCase'
	| 'kebab-case'
	| 'trim'
	| 'reverse'
	| 'base64_encode'
	| 'base64_decode';

export const TRANSFORMERS: Record<TransformationType, (str: string) => string> = {
	lowercase: (str) => str.toLowerCase(),
	uppercase: (str) => str.toUpperCase(),
	snake_case: (str) =>
		str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.map(x => x.toLowerCase())
			.join('_') || str.toLowerCase(),
	camelCase: (str) => {
		const s = str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
			.join('') || str;
		return s.slice(0, 1).toLowerCase() + s.slice(1);
	},
	PascalCase: (str) =>
		str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
			.join('') || str,
	'kebab-case': (str) =>
		str
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			?.map(x => x.toLowerCase())
			.join('-') || str.toLowerCase(),
	trim: (str) => str.trim(),
	reverse: (str) => str.split('').reverse().join(''),
	base64_encode: (str) => btoa(str),
	base64_decode: (str) => {
		try {
			return atob(str);
		} catch (e) {
			return str;
		}
	}
};

export const TRANSFORMATION_LABELS: Record<TransformationType, string> = {
	lowercase: 'lowercase',
	uppercase: 'UPPERCASE',
	snake_case: 'snake_case',
	camelCase: 'camelCase',
	PascalCase: 'PascalCase',
	'kebab-case': 'kebab-case',
	trim: 'Trim',
	reverse: 'Reverse',
	base64_encode: 'Base64 Enc',
	base64_decode: 'Base64 Dec'
};
