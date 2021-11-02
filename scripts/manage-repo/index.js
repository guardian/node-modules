import { getPackages } from '../lib/get-packages.js';
import { updateReadme } from './update-readme/index.js';
import { updateTsPaths } from './update-ts-paths.js';

const packages = getPackages();

updateReadme(packages);
updateTsPaths(packages);
