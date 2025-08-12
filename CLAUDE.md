# CLAUDE.md

This file provides guidance to [Claude Code](claude.ai/code) when working with
code in this repository.

## Project Overview

This is `@nevir/toolchain`, a package that contains configuration for
development tools that @nevir commonly relies upon.

Configurtion for each supported tool is (where possible) contained to a
corresponding directory within this project (e.g. `biome/`).

## Biome

This package exports shared configuration for [Biome](https://biomejs.dev/).

The configuration lives under [`./biome/`](./biome/), and is broken into several
files:

- [`config.jsonc`](./biome/config.jsonc): The entry point and global settings.
- [`css.jsonc`](./biome/css.jsonc): CSS-specific rules and actions.
- [`graphl.jsonc`](./biome/graphl.jsonc): GraphQL-specific rules and actions.
- [`javascript.jsonc`](./biome/javascript.jsonc): JS-specific rules and actions.
- [`json.jsonc`](./biome/json.jsonc): JSON-specific rules and actions.

### Maximalist Configuration

The configuration is intentionally maximalist:

- Each file enumerates **all** possible rules and actions for that language.
  - This allows for intentional maintenance: every time there is a version bump
    to Biome, we can explicitly apply configuration changes (vs implicit changes
    via the recommended configuration).
- Every rule is explicitly `"error"` or `"off"`.
- Every rule is given a brief comment explaining why it is enabled or disabled.
- `nursery` rules are omitted.

### Configuration Preferences

- **Favor pragmatism over theoretical purity**: Avoid overly strict complexity
  thresholds and allow developer judgment calls
- **Trust TypeScript's type system**: Disable redundant rules when TypeScript
  already provides the same checking
- **Prioritize code readability**: Allow flexibility in formatting and structure
  when it improves clarity (blockless statements, nested conditionals, template
  literals for human text)
- **Support ergonomic APIs**: Enable patterns that improve developer experience
  (default exports, barrel files, parameter assignment for defaults)
- **Allow project-specific decisions**: Keep environment-dependent rules
  (console usage, file naming) configurable rather than blanket enforcement

## Claude Behaviors

- After each task, commit all changes as a git commit.
