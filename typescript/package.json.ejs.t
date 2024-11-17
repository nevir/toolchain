---
inject: true
to: package.json
after: dependencies
skip_if: typescript
sh: cd <%= cwd %> && yarn install
---
"typescript": "*",
