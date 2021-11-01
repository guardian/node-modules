import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getMakefileTargets = () =>
	fs
		.readFileSync(
			path.resolve(
				path.dirname(fileURLToPath(import.meta.url)),
				'..',
				'makefile',
			),
			'utf8',
		)
		.split('\n')
		.map((line) => line.match(/.PHONY: (?!--)([\S]+)( # )?(.*)/))
		.filter(Boolean)
		.map(([, target, , description]) => ({
			target,
			description,
		}));
