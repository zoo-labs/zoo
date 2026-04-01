# DAO UI Automation

Automated UI regression testing for the DAO webapp using Selenium WebDriver and TypeScript.

## Quick Start

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run all tests:**
   ```sh
   npm test
   ```

## Running Tests

### Quick Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests for all governance types |
| `npm run test:debug` | Quick test (5 tests per governance type) |
| `npm run test:multisig` | Run only multisig tests |
| `npm run test:erc20` | Run only ERC20 token voting tests |
| `npm run test:erc721` | Run only ERC721 NFT voting tests |
| `npm run test:production` | Test against production environment |
| `npm run test:release` | Test against latest release |
| `npm run test:single -- <file>` | Run a specific test file |

### Runtime Arguments

For custom combinations or when you need more flexibility:

```bash
# Combine multiple options
npm test -- --debug --env=release --governance=erc20
```

**Available Arguments:**

| Argument | Values | Description |
|----------|--------|-------------|
| `--debug` | (flag) | Run only 5 tests per governance type |
| `--governance=` | `erc20`, `erc721`, `multisig` | Run tests for specific governance type |
| `--file=` | `tests/path/to/file.test.ts` | Run a single test file |
| `--env=` | `production`, `release` | Environment (default: `develop`) |
| `--base-url=` | Any URL | Override environment with custom URL |
| `--flags=` | `feature_1=on,debug=on` | Pass feature flags as URL parameters |
| `--no-headless` | (flag) | Disable headless mode; run test in chrome tab |

## Configuration

**Key files in `config/` directory:**
- `environments.ts` - Environment URLs and release fetching
- `test-daos.ts` - DAO addresses for each governance type  
- `test-settings.ts` - Parallelism, timeouts, browser settings
- `pages.ts` - Page routes within the app

## Project Structure

```
tests/
├── general/            # Cross-governance tests (app navigation, DAO creation)
├── multisig/           # Multi-signature governance tests
└── token-voting/       # ERC20/ERC721 governance tests  

config/                 # Test configuration
test-results/           # Generated reports and screenshots
```

## Development

**Requirements:**
- Chrome & ChromeDriver installed and in PATH
- Node.js and npm

**Key Features:**
- Tests run in parallel (configurable in `test-settings.ts`)
- Screenshots automatically captured on test completion  
- HTML and Markdown reports generated for all runs
- Cross-platform support (Windows, macOS, Linux)

