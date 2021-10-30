const { sync: glob } = require('fast-glob');

module.exports = () =>
	glob(['packages/*'], { onlyDirectories: true })
		// get it's path, a list of it's files and the contents of it's package manifest
		.map((pkgPath) => ({
			path: pkgPath,
			files: glob(['**/*'], {
				cwd: pkgPath,
				ignore: ['node_modules', 'dist'],
			}),
			pkg: require('../' + pkgPath + '/package.json'),
		}));
