/* eslint-disable @typescript-eslint/unbound-method -- this is how ts wants us to work */

import type { CompilerOptions } from 'typescript';
import {
	findConfigFile,
	ModuleKind,
	parseJsonConfigFileContent,
	readConfigFile,
	ScriptTarget,
	sys,
} from 'typescript';

// get the consumer project's typescript config
let projectCompilerOptions = {};
const configFileName = findConfigFile('./', sys.fileExists, 'tsconfig.json');

if (configFileName) {
	const configFile = readConfigFile(configFileName, sys.readFile);
	projectCompilerOptions = parseJsonConfigFileContent(
		configFile.config,
		sys,
		'./',
	);
}

const defaultCompilerOptions = {
	allowSyntheticDefaultImports: true,
	esModuleInterop: true,
	declaration: true,
	declarationDir: 'dist/types',
	declarationMap: true,
	emitDeclarationOnly: false,
	noEmit: true,
} as CompilerOptions;

const targetCompilerOptions: Readonly<Record<string, CompilerOptions>> = {
	cjs: {
		...defaultCompilerOptions,
		module: ModuleKind.CommonJS,
		target: ScriptTarget.ES2018,
	},
	esm: {
		...defaultCompilerOptions,
		module: ModuleKind.ESNext,
		target: ScriptTarget.ES2020,
	},
};

export const getCompilerOptions = (target: 'esm' | 'cjs') => ({
	...projectCompilerOptions,
	...targetCompilerOptions[target],
});
