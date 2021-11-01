const { getMakefileTargets } = require('./get-makefile-targets');

const blue = '\x1b[36m';
const reset = '\x1b[0m';
const dim = '\x1b[2m';

console.log(
	getMakefileTargets()
		.map(
			({ target, description }) =>
				`${blue}${target}${reset} ${dim}${description}${reset}`,
		)
		.sort()
		.join('\n'),
);
