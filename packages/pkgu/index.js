const path = require('path');
const chalk = require('chalk');
const rollup = require('rollup');
const ts = require('rollup-plugin-ts');
const { tsconfigResolver } = require('tsconfig-resolver');

const log = (...args) =>
	console.log.apply(console, [chalk.blue(`[ pkgu ]`), ...args]);

const tsconfigOverrides = {
	declaration: true,
	declarationMap: true,
	module: 'ESNext',
	sourceMap: true,
	target: 'ESNext',
};

async function build() {
	const pkg = require(path.resolve(process.cwd(), 'package.json'));
	log(chalk.dim('building'), chalk.blue(pkg.name));

	const { config: tsconfig, path: tsconfigPath } = await tsconfigResolver();
	if (tsconfig) {
		log(chalk.dim(`using ${chalk.underline(tsconfigPath)}`));
		log(
			chalk.dim(
				`extending compilerOptions:`,
				JSON.stringify(tsconfigOverrides, null, 2),
			),
		);
	} else {
		log(chalk.dim(`using default TypeScript config`));
	}

	const bundle = await rollup.rollup({
		input: path.join(process.cwd(), 'src', 'index.ts'),
		external: (id) => !/^[./]/.test(id),
		plugins: [
			ts({
				tsconfig: {
					...tsconfig?.compilerOptions,
					...tsconfigOverrides,
				},
			}),
		],
	});

	await Promise.all([
		bundle.write({
			file: path.resolve(process.cwd(), pkg.module),
			format: 'es',
			sourcemap: true,
		}),
		bundle.write({
			file: path.resolve(process.cwd(), pkg.main),
			format: 'commonjs',
			sourcemap: true,
		}),
	]);

	// closes the bundle
	await bundle.close();
}

build();
