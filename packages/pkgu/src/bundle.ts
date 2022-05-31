import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';
import hashbang from 'rollup-plugin-hashbang';
import ts from 'rollup-plugin-ts';
import type { ValidPackageJson } from './conform-package-json';
import { getCompilerOptions } from './get-compiler-options';

const external = (id: string) => !/^[./]/.test(id);
const extensions = ['.ts', '.tsx', '.mjs', '.jsx', '.js'];

export const bundle = async ({
	pkg,
	cwd,
}: {
	pkg: ValidPackageJson;
	cwd: string;
}) => {
	const input = path.resolve(cwd, 'src', 'index.ts');

	return Promise.all([
		rollup({
			input,
			external,
			plugins: [
				ts({ tsconfig: getCompilerOptions('esm') }),
				nodeResolve({ extensions }),
				hashbang(),
			],
		}).then((bundle) =>
			bundle
				.write({
					dir: pkg.module.replace('/index.js', ''),
					format: 'esm',
					sourcemap: true,
					preserveModules: true,
				})
				.then(bundle.close),
		),
		rollup({
			input,
			external,
			plugins: [
				ts({ tsconfig: getCompilerOptions('cjs') }),
				nodeResolve({ extensions }),
				hashbang(),
			],
		}).then((bundle) =>
			bundle.write({
				dir: pkg.main.replace('/index.js', ''),
				format: 'cjs',
				sourcemap: true,
				preserveModules: true,
			})
			.then(bundle.close),
		),
	]);
};
