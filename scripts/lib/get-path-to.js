import path from 'path';
import { getRootDir } from './get-root-dir.js';

export const getPathTo = (target) => path.relative(getRootDir(), target);
