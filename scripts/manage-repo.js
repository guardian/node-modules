import { getPackages } from './lib/get-packages.js';
import { updateReadme } from './lib/update-readme.js';
import { updateTsPaths } from './lib/update-ts-paths.js';

const packages = getPackages();

updateReadme(packages);
updateTsPaths(packages);
