import { packageDirectorySync } from 'pkg-dir';

export const getRootDir = () => packageDirectorySync();
