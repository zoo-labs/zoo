# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed with Yarn workspaces (Node >= 18).
- App: `app/` (Next.js dApp). Core site: `foundation/` (Next.js, tests). UI kits/SDKs: `ui/`, `zdk/`, `sdk/`. Smart contracts: `contracts/` (Hardhat). Shared components/utilities live in `core/`, `features/`, and `ui/`.
- Public assets reside under each package’s `public/`. Tests typically live in `__tests__/` or `test/` per package.

## Build, Test, and Development Commands
- Install: `yarn` (from repo root).
- Dev (App): `yarn dev` (alias for `yarn workspace @zoolabs/app dev`).
- Build all: `yarn build:all` (builds `zdk` then `app`).
- Package builds: e.g., `yarn workspace @zoolabs/zdk build`, `yarn workspace @zoolabs/foundation build`.
- Tests (examples):
  - Contracts: `yarn test` (runs Hardhat tests in `contracts/`).
  - Foundation: `yarn workspace @zoolabs/foundation test`.
  - SDK/ZDK: `yarn workspace @zoolabs/sdk test`, `yarn workspace @zoolabs/zdk test`.
- Contracts workflow examples: `yarn deploy`, `yarn deploy:testnet`, `yarn chain` (local node) via the `@zoolabs/contracts` workspace.

## Coding Style & Naming Conventions
- Language: TypeScript first. Indent 2 spaces. Prefer single quotes; semicolons follow each package’s Prettier config (App uses no‑semi, single quotes).
- Linting: Next/TypeScript ESLint rules at root and per package. Run per package, e.g., `yarn workspace @zoolabs/foundation lint` or `yarn workspace @zoolabs/zdk lint`.
- Formatting: use Prettier where provided, e.g., `yarn workspace @zoolabs/foundation format` or `yarn workspace @zoolabs/contracts format`.
- Naming: files/components in PascalCase for React components; tests as `*.test.ts(x)`.

## Testing Guidelines
- Frameworks: Jest (web packages), TSDX/Jest (`zdk`), Hardhat (`contracts`).
- Locations: `foundation/src/__tests__/`, `sdk/tests/`, `contracts/test/`, `zdk/test/`.
- Aim for meaningful coverage of logic, hooks, and utilities. Favor unit tests close to source; mock external services.

## Commit & Pull Request Guidelines
- Conventional Commits are preferred (see `foundation/commitlint.config.js`): `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `perf`, `revert`, `vercel`.
- PRs should include: clear description, scope (package paths), linked issues, screenshots for UI, and test notes (how to run/what changed).

## Security & Configuration Tips
- Do not commit secrets. Copy `.env.example` (where present) to `.env` locally.
- For contracts, never commit private keys; use Hardhat networks and environment vars. Exported ABIs/addresses sync into `app/` during deploy scripts.
