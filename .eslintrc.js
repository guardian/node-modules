module.exports = {
	root: true,
	env: {
		jest: true,
		browser: true,
		node: true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		ecmaFeatures: {
			modules: true,
		},
		project: './tsconfig.json',
	},
	extends: ['@guardian/eslint-config'],
	ignorePatterns: ['dist', 'coverage'],
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: ['@guardian/eslint-config-typescript'],
			settings: {
				'import/resolver': {
					typescript: {},
				},
			},
		},
		{
			files: ['**/*.test.ts', '**/*.test.tsx'],
			rules: {
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
			},
		},
		{
			files: ['lib/**/*'],
			rules: {
				// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
				// node allows you to `require` whenever you like
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
};
