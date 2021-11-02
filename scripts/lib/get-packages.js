import { createRequire } from 'module';
import path from 'path';
import glob from 'fast-glob';
import { getRootDir } from './get-root-dir.js';

const require = createRequire(import.meta.url);

export const getPackages = () =>
	glob
		.sync(['packages/*'], { onlyDirectories: true, cwd: getRootDir() })
		// get it's path, a list of it's files and the contents of it's package manifest
		.map((pkgPath) => ({
			path: pkgPath,
			files: glob.sync(['**/*'], {
				cwd: pkgPath,
				ignore: ['node_modules', 'dist'],
			}),
			pkg: require(path.resolve(getRootDir(), pkgPath, 'package.json')),
		}));
