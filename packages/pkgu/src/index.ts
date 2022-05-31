#!/usr/bin/env node

import readPkgUp from 'read-pkg-up';
import sade from 'sade';
import type { PackageJson } from 'type-fest';
import { bundle } from './bundle';
import { conformPackageJson } from './conform-package-json';

const pkguPkgResult = readPkgUp.sync({
	cwd: __dirname,
	normalize: false,
});

// this is mainly to keep TS happy that we can rely on the result.
// a world in which is actually throws is one i don't want to be part of.
if (!pkguPkgResult) throw new Error("Can't find my own package.json!");

const pkguPkg = pkguPkgResult.packageJson as PackageJson;

sade('pkgu', true)
	.version(pkguPkg.version as string)
	.describe(
		'Compiles your src directory to ./dist, ready for publishing. Automatically handles creating ESM, CommonJS and types.',
	)
	.action(async () => {
		console.log('Checking your package.json');
		const projectPkg = await conformPackageJson();

		console.log(`Building ${projectPkg.name}`);
		await bundle({ pkg: projectPkg, cwd: process.cwd() });
	})
	.parse(process.argv);
