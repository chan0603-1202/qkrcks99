import { cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = 'dist';

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await cp('index.html', join(outputDir, 'index.html'));
await cp('src', join(outputDir, 'src'), { recursive: true });
await cp('assets', join(outputDir, 'assets'), { recursive: true });

console.log('Built static site to dist');
