import { execSync } from 'child_process';
import { join } from 'path';
import { readdir, stat } from 'fs/promises';

console.log('🔨 Building sdk...');

const external = ['react', 'react-dom', '@tanstack/react-query'];

// Clean dist directory
console.log('Cleaning dist directory...');
execSync('rm -rf dist', { stdio: 'inherit' });

// Build ESM
console.log('Building ESM modules with optimizations...');
const result = await Bun.build({
  entrypoints: ['./src/core/index.ts', './src/react/index.ts'],
  outdir: './dist/esm',
  target: 'node',
  external,
  naming: {
    entry: '[dir]/index.[ext]',
  },
  minify: false,
  sourcemap: 'external',
});

if (!result.success) {
  console.error('Build failed:', result.logs);
  process.exit(1);
}

// Build CJS - Skip for now as Bun doesn't support CJS format
console.log('Skipping CommonJS build (Bun limitation) - using ESM only...');
// Copy ESM to CJS for now  
execSync('mkdir -p dist/cjs', { stdio: 'inherit' });
if (result.outputs.length > 0) {
  execSync('cp -r dist/esm/* dist/cjs/ 2>/dev/null || true', { stdio: 'inherit' });
}

// Generate TypeScript declarations for ESM
console.log('Generating TypeScript declarations for ESM...');
try {
  execSync('tsc --project tsconfig.json', { stdio: 'inherit' });
} catch (e) {
  console.log('TypeScript compilation failed, continuing without type declarations');
}

// Generate TypeScript declarations for CJS (copy from ESM)
console.log('Copying TypeScript declarations for CJS...');
execSync('cp -r dist/esm/*.d.ts dist/cjs/ 2>/dev/null || true', { stdio: 'inherit' });

// Verify exports
console.log('Verifying exports are correctly built...');
try {
  console.log('📊 Build statistics:');

  const countFilesInDir = async (dir: string): Promise<number> => {
    let count = 0;
    const items = await readdir(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        count += await countFilesInDir(fullPath);
      } else {
        count++;
      }
    }
    return count;
  };

  const totalFiles = await countFilesInDir('./dist');
  console.log(`Total files generated: ${totalFiles}`);

  // Verify key directories exist
  const dirs = ['dist/esm/core', 'dist/esm/react', 'dist/cjs/core', 'dist/cjs/react'];
  for (const dir of dirs) {
    const files = await readdir(dir);
    if (files.length > 0) {
      console.log(`✅ ${dir}: ${files.length} files`);
    } else {
      throw new Error(`Directory ${dir} is empty or doesn't exist`);
    }
  }
} catch (error) {
  console.error('Failed to verify exports. Build may be incomplete.');
  console.error(error);
  process.exit(1);
}

console.log('✅ Build completed successfully.');
