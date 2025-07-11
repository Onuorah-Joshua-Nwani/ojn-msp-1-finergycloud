#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

console.log('Railway Build Script Starting...');

try {
  // Check if index.html is in root (GitHub structure)
  if (existsSync('./index.html') && !existsSync('./client/index.html')) {
    console.log('Found index.html in root, setting up client directory...');
    
    // Create client directory if it doesn't exist
    if (!existsSync('./client')) {
      mkdirSync('./client', { recursive: true });
    }
    
    // Copy index.html to client directory
    copyFileSync('./index.html', './client/index.html');
    console.log('Copied index.html to client directory');
  }
  
  // Verify client/index.html now exists
  if (!existsSync('./client/index.html')) {
    console.error('ERROR: client/index.html not found after setup!');
    process.exit(1);
  }
  
  // Build using the production config
  console.log('Building client with vite...');
  execSync('npx vite build --config vite.config.production.ts', { stdio: 'inherit' });
  
  console.log('Building server with esbuild...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
