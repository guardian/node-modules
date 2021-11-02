import fs from 'fs';
import { getPathTo } from './get-path-to.js';

export const getMakefileTargets = () =>
	fs
		.readFileSync(getPathTo('makefile'), 'utf8')
		.split('\n')
		.map((line) => line.match(/.PHONY: (?!--)([\S]+)( # )?(.*)/))
		.filter(Boolean)
		.map(([, target, , description]) => ({
			target,
			description,
		}));
