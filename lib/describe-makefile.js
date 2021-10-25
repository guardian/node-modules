const fs = require('fs');

const blue = '\x1b[36m';
const reset = '\x1b[0m';
const dim = '\x1b[2m';

console.log(
	fs
		.readFileSync('Makefile', 'utf8')
		.split('\n')
		.map((line) => line.match(/.PHONY: (?!--)([\S]+)( # )?(.*)/))
		.filter(Boolean)
		.map(
			([, target, , description]) =>
				`${blue}${target}${reset} ${dim}${description}${reset}`,
		)
		.sort()
		.join('\n'),
);
