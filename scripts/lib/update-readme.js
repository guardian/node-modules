import fs from 'fs';
import { getMakefileTargets } from './get-makefile-targets.js';
import { getPathTo } from './get-path-to.js';
import { updateReadmeSection } from './update-readme-section.js';

export const updateReadme = (packages) => {
	const readMePath = getPathTo('README.md');
	let readme = fs.readFileSync(readMePath, 'utf8');

	readme = updateReadmeSection({
		updates: packages.map(
			({ pkg, path }) =>
				`-   [\`${pkg.name}\`](${path})\n` +
				`    -   ${pkg.description}.`,
		),
		label: 'PACKAGES',
		url: import.meta.url,
		original: readme,
	});

	readme = updateReadmeSection({
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

	fs.writeFileSync(readMePath, readme);
};
