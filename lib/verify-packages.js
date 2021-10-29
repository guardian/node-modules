const { sync: glob } = require('fast-glob');
const { suite } = require('uvu');
const assert = require('uvu/assert');

// get a list of each child directory of packages...
const PACKAGES = glob(['packages/*'], { onlyDirectories: true })
	// get it's path, a list of it's files and the contents of it's package manifest
	.map((pkgPath) => ({
		path: pkgPath,
		files: glob(['**/*'], {
			cwd: pkgPath,
			ignore: ['node_modules', 'dist'],
		}),
		pkg: require('../' + pkgPath + '/package.json'),
	}));

// for each package run some tests against it...
PACKAGES.forEach(({ pkg, files, path }) => {
	// These tests use uvu https://github.com/lukeed/uvu
	// Why not use Jest or Node's own assert stuff?
	// - uvu is _much_ faster than jest
	// - uvu has _much_ better error messages than node's defaults

	const ValidPackage = suite(path);

	ValidPackage('should define a `main` field', () => {
		assert.not.type(pkg.main, 'undefined');
	});

	ValidPackage('should publish under the `@guardian` scope', () => {
		assert.match(pkg.name, /^@guardian\//);
	});

	ValidPackage('should have a README.md', () => {
		assert.ok(files.includes('README.md'));
	});

	ValidPackage('should have a package.json', () => {
		assert.ok(files.includes('package.json'));
	});

	ValidPackage('should not have a tsconfig.json', () => {
		assert.not.ok(files.includes('tsconfig.json'));
	});

	switch (pkg.name.split('/')[1]) {
		case 'pkgu':
			ValidPackage('should not define any npm-scripts', () => {
				assert.type(pkg.scripts, 'undefined');
			});
			break;
		case 'editorconfig':
			break;
		default:
			ValidPackage('should define a `module` field', () => {
				assert.not.type(pkg.module, 'undefined');
			});
			ValidPackage('should have a `src/index.ts` file', () => {
				assert.ok(files.includes('src/index.ts'));
			});
			ValidPackage('should build using `pkgu`', () => {
				assert.is(pkg.scripts.build, 'pkgu');
			});
	}

	ValidPackage.run();
});
