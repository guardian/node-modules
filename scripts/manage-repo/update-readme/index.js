import fs from 'fs';
import path from 'path';
import { packageDirectorySync } from 'pkg-dir';
import { listMakeTasks } from './list-make-tasks.js';
import { listPackages } from './list-packages.js';

export const updateReadme = (packages) => {
	const readMePath = path.resolve(packageDirectorySync(), 'README.md');
	let readme = fs.readFileSync(readMePath, 'utf8');

	readme = listPackages({ packages, readme });
	readme = listMakeTasks({ readme });

	fs.writeFileSync(readMePath, readme);
};
