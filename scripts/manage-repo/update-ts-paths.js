import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import { packageDirectorySync } from 'pkg-dir';
import prettier from 'prettier';

export const updateTsPaths = (packages) => {
	const projectRoot = packageDirectorySync();
	const require = createRequire(import.meta.url);
	const tsConfigPath = `${projectRoot}/tsconfig.json`;

	const tsConfig = require(tsConfigPath);

	const paths = packages.reduce((acc, { pkg, path: packagePath }) => {
		acc[pkg.name] = [
			path.relative(
				projectRoot,
				path.resolve(packagePath, 'src', 'index.ts'),
			),
		];
		return acc;
	}, {});

	tsConfig.compilerOptions.paths = paths;

	fs.writeFileSync(
		tsConfigPath,
		prettier.format(JSON.stringify(tsConfig), { parser: 'json' }),
	);
};
