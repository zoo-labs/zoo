# Code Quality Requirements

## Code Formatting (TypeScript and Solidity)

The project uses Prettier to format both TypeScript and Solidity code. When modifying any code, you MUST run prettier to ensure code passes GitHub CI checks:

```shell
npm run pretty              # Format all files
npm run pretty:check        # Check formatting without fixing
```

This single command formats both TypeScript (`.ts`) and Solidity (`.sol`) files.

**Critical**: GitHub CI will fail if code doesn't match prettier formatting rules.

### Solidity configuration:

- 80 character line width
- 4 spaces indentation
- Double quotes for strings

## TypeScript Linting

The project uses ESLint for TypeScript code analysis:

```shell
npm run lint                # Lint and fix issues
npm run lint:check          # Check issues without fixing
```

## Solidity Linting

The project uses Solhint for Solidity code analysis and security patterns:

```shell
npm run solhint             # Check and fix issues
npm run solhint:check       # Check issues without fixing
```

Enforces best practices and project-specific rules defined in `.solhint.json`.

## When to Run Code Quality Checks

Always run these commands before committing:

1. `npm run pretty` - Format all code
2. `npm run lint` - Lint TypeScript files
3. `npm run solhint` - Lint Solidity contracts

This ensures your code passes all automated CI checks.

---

[← Solidity Conventions](./solidity-conventions.md) | [Project Planning →](../workflows/project-planning.md)
