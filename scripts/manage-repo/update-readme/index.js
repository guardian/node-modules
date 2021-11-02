import fs from 'fs';
import { getPathTo } from '../../lib/get-path-to.js';
import { listMakeTasks } from './list-make-tasks.js';
import { listPackages } from './list-packages.js';

export const updateReadme = (packages) => {
	const readMePath = getPathTo('README.md');
	let readme = fs.readFileSync(readMePath, 'utf8');

	readme = listPackages({ packages, readme });
	readme = listMakeTasks({ readme });

	fs.writeFileSync(readMePath, readme);
};
