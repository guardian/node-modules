import { getPackages } from '../get-packages.js';
import { updateReadme } from './update-readme/index.js';

const packages = getPackages();

updateReadme(packages);
