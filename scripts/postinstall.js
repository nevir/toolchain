#!/usr/bin/env node

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if we're being installed as a dependency (not in development)
const isInstallation = !process.env.npm_config_global && 
  !process.cwd().includes('node_modules/@nevir/toolchain') &&
  process.cwd() !== join(__dirname, '..');

if (!isInstallation) {
  console.log('Skipping postinstall setup - running in development mode');
  process.exit(0);
}

console.log('🔧 Setting up @nevir/toolchain configurations...');

const projectRoot = process.cwd();

// Configuration templates
const configs = {
  'biome.jsonc': {
    extends: ['@nevir/toolchain/biome']
  },
  'dprint.json': {
    extends: './node_modules/@nevir/toolchain/dprint/config.json'
  },
  'tsconfig.json': {
    extends: '@nevir/toolchain/typescript/config.json'
  }
};

// Track what was created/updated
const results = [];

for (const [filename, config] of Object.entries(configs)) {
  const filePath = join(projectRoot, filename);
  const configContent = JSON.stringify(config, null, 2);
  
  if (existsSync(filePath)) {
    // Check if the existing config already extends our configuration
    try {
      const existing = JSON.parse(readFileSync(filePath, 'utf8'));
      const extendsArray = Array.isArray(existing.extends) ? existing.extends : [existing.extends];
      
      if (filename === 'biome.jsonc' && extendsArray.includes('@nevir/toolchain/biome')) {
        results.push(`⏭️  ${filename} already configured`);
        continue;
      }
      if (filename === 'dprint.json' && existing.extends === './node_modules/@nevir/toolchain/dprint/config.json') {
        results.push(`⏭️  ${filename} already configured`);
        continue;
      }
      if (filename === 'tsconfig.json' && extendsArray.includes('@nevir/toolchain/typescript/config.json')) {
        results.push(`⏭️  ${filename} already configured`);
        continue;
      }
    } catch (e) {
      // If we can't parse existing config, we'll skip it to be safe
      results.push(`⚠️  ${filename} exists but could not be parsed - skipping`);
      continue;
    }
    
    results.push(`⚠️  ${filename} exists - skipping to avoid overwriting`);
    continue;
  }
  
  writeFileSync(filePath, configContent);
  results.push(`✅ Created ${filename}`);
}

// Output results
console.log('\n' + results.join('\n'));

console.log('\n📦 Next steps:');
console.log('   Install peer dependencies as needed:');
console.log('   • yarn add --dev @biomejs/biome  # for biome.jsonc');
console.log('   • yarn add --dev dprint          # for dprint.json');
console.log('   • yarn add --dev typescript     # for tsconfig.json');
console.log('   • yarn add tslib                 # for typescript');

console.log('\n✨ @nevir/toolchain setup complete!');