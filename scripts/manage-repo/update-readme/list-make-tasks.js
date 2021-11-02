import { getMakefileTargets } from '../../get-makefile-targets.js';
import { generateMessage } from './generate-message.js';

export const listMakeTasks = ({ readme }) =>
	generateMessage({
		updates: getMakefileTargets()
			.map(
				({ target, description }) =>
					`-   \`make ${target}\` ${description}`,
			)
			.sort(),
		label: 'MAKE TASKS',
		url: import.meta.url,
		original: readme,
	});
