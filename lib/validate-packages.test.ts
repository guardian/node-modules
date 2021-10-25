import { sync as glob } from 'fast-glob';

const packages = glob(['packages/*'], { onlyDirectories: true }).map(
	(pkgPath) => ({
		path: pkgPath,
		files: glob(['**/*'], {
			cwd: pkgPath,
			ignore: ['node_modules', 'dist'],
		}),
		pkg: require('../' + pkgPath + '/package.json'),
	}),
);

describe('Validate package construction', () => {
	packages.forEach(({ pkg, files, path }) => {
		test(path, () => {
			expect(pkg.scripts).toBeUndefined();
			expect(pkg.main).not.toBeUndefined();
			expect(pkg.module).not.toBeUndefined();
			expect(pkg.name).toMatch(/^@guardian\//);

			expect(files).toContain('README.md');
			expect(files).toContain('package.json');
			expect(files).toContain('src/index.ts');

			expect(files).not.toContain('tsconfig.json');
			expect(files).not.toContain('rollup.config.js');
		});
	});
});
