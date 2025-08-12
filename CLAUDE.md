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

The configuration is intentionally maximalist:
- Each file enumerates **all** possible rules and actions for that language.
  - This allows for intentional maintenance: every time there is a version bump
    to Biome, we can explicitly apply configuration changes (vs implicit changes
    via the recommended configuration).
- Every rule is explicitly `"error"` or `"off"`.
- Every rule is given a brief comment explaining why it is enabled or disabled.
- `nursery` rules are omitted.

## Claude Behaviors

- After each task, commit all changes as a git commit.
