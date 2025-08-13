# @nevir's Toolchain Configuration

Shared configuration for developer tools that I commonly use.

## Installation

```
yarn add --dev @nevir/toolchain
```

## Biome

1. ```sh
   yarn add --dev @biomejs/biome
   ```

2. Create a `biome.jsonc` with:
   ```jsonc
   { "extends": ["@nevir/toolchain/biome"] }
   ```

## TypeScript

1. ```sh
   yarn add --dev typescript
   yarn add tslib
   ```

2. Create a `tsconfig.jsonc` with:
   ```jsonc
   { "extends": "@nevir/toolchain" }
   ```
