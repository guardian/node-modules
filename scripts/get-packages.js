import { createRequire } from 'module';
import glob from 'fast-glob';

const require = createRequire(import.meta.url);

export const getPackages = () =>
	glob
		.sync(['packages/*'], { onlyDirectories: true })
		// get it's path, a list of it's files and the contents of it's package manifest
		.map((pkgPath) => ({
			path: pkgPath,
			files: glob.sync(['**/*'], {
				cwd: pkgPath,
				ignore: ['node_modules', 'dist'],
			}),
			pkg: require('../' + pkgPath + '/package.json'),
		}));
