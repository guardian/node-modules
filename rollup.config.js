import path from 'path';
import glob from 'fast-glob';
import ts from 'rollup-plugin-ts';

const packages = glob.sync(['packages/*'], { onlyDirectories: true });
const configs = packages.map((pkgPath) => {
	const pkg = require(path.resolve(pkgPath, 'package.json'));

	return {
		input: path.join(pkgPath, 'src', 'index.ts'),
		external: (id) => !/^[./]/.test(id),
		output: [
			{
				file: path.resolve(pkgPath, pkg.main),
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: path.resolve(pkgPath, pkg.module),
				format: 'es',
				sourcemap: true,
			},
		],
		plugins: [ts()],
	};
});

// eslint-disable-next-line import/no-default-export -- it's what rollup wants
export default configs;
