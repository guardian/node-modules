/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	transform: {
		'^.+\\.tsx?$': 'esbuild-jest',
	},
	testEnvironment: 'node',
	maxWorkers: 1, // test hand without this
};
