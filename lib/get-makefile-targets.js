const fs = require('fs');
const path = require('path');

exports.getMakefileTargets = () =>
	fs
		.readFileSync(path.resolve(__dirname, '../makefile'), 'utf8')
		.split('\n')
		.map((line) => line.match(/.PHONY: (?!--)([\S]+)( # )?(.*)/))
		.filter(Boolean)
		.map(([, target, , description]) => ({
			target,
			description,
		}));
