import { getPackages } from '../get-packages.js';
import { updateReadme } from './update-readme.js';

const packages = getPackages();

updateReadme(packages);
