/* eslint-disable @typescript-eslint/no-var-requires -- it's building a node file */

import { promises } from 'fs';
import path from 'path';
import { isObject, isString } from '@guardian/libs';
import sortPackageJson from 'sort-package-json';
import type { PackageJson } from 'type-fest';

const { writeFile } = promises;

export interface ValidPackageJson extends PackageJson {
	main: string;
	module: string;
	files: string[];
	name: string;
}

export const conformPackageJson = async () => {
	const pkgPath = path.resolve(process.cwd(), 'package.json');

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we're validating it ourselves
	const pkg = require(pkgPath);

	if (!isObject(pkg)) {
		console.error(`Cannot find package.json in ${process.cwd()}`);
		process.exit(1);
	}

	if (!isString(pkg.name)) {
		console.error(`Package has no name`);
		process.exit(1);
	}

	if (!pkg.name.startsWith('@guardian/')) {
		console.error(`Package name must be scoped to @guardian`);
		process.exit(1);
	}

	// @guardian scope packages should always be peerDependencies
	// this ensures we don't bundle them more than once per application
	// if (isObject(pkg.dependencies)) {
	// 	const guardianDeps = Object.keys(pkg.dependencies).filter((dep) =>
	// 		dep.startsWith('@guardian/'),
	// 	);

	// 	for (const dep of guardianDeps) {
	// 		info(`Moving ${dep} to peerDependencies`);
	// 		pkg.peerDependencies ||= {};
	// 		pkg.peerDependencies[dep] = pkg.dependencies[dep];
	// 		delete pkg.dependencies[dep];
	// 	}
	// }

	pkg.main = 'dist/cjs/index.js';
	pkg.module = 'dist/esm/index.js';
	pkg.types = 'dist/types/index.d.ts';
	pkg.files = ['dist'];

	for (const field of ['unpkg', 'source'] as const) {
		if (pkg[field]) {
			console.info(`Removing ${field} field from package.json`);
			delete pkg[field];
		}
	}

	await writeFile(
		pkgPath,
		JSON.stringify(sortPackageJson(pkg), null, 2) + '\n',
	);

	return pkg as unknown as ValidPackageJson;
};
