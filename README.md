# @nevir's Toolchain Configuration

Shared configuration for developer tools that I commonly use.

## Installation

```
yarn add --dev @nevir/toolchain
```

**That's it!** The package will automatically create configuration files for supported tools during installation.

## What Gets Configured

The postinstall script automatically creates:

### Biome (`biome.jsonc`)
```jsonc
{ "extends": ["@nevir/toolchain/biome"] }
```

### Dprint (`dprint.json`) 
```jsonc
{ "extends": "./node_modules/@nevir/toolchain/dprint/config.json" }
```

### TypeScript (`tsconfig.json`)
```jsonc
{ "extends": "@nevir/toolchain/typescript/config.json" }
```

## Installing Tool Dependencies

After installation, add the peer dependencies you need:

```sh
# For Biome formatting and linting
yarn add --dev @biomejs/biome

# For Dprint formatting  
yarn add --dev dprint

# For TypeScript
yarn add --dev typescript
yarn add tslib
```

## Manual Setup (if needed)

If you prefer manual setup or need to recreate configs, you can create the files shown above manually. The postinstall script will skip existing configuration files to avoid overwriting your customizations.
