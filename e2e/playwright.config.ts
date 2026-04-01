import { defineConfig, devices } from '@playwright/test';

/**
 * Zoo Ecosystem E2E Test Configuration
 *
 * This configuration file defines settings for testing the full Zoo ecosystem:
 * - Blockchain (Hardhat)
 * - Smart Contracts (ZOO, KEEPER, ZK, Governance)
 * - dApps (6 applications across different ports)
 */

export default defineConfig({
  // Test directory
  testDir: './tests',

  // Maximum time one test can run
  timeout: 120 * 1000, // 120 seconds

  // Run tests in files in parallel
  fullyParallel: false, // Sequential for blockchain state consistency

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Number of workers (sequential blockchain tests)
  workers: process.env.CI ? 1 : 1,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL for dApps
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Maximum time each action can take
    actionTimeout: 30 * 1000,

    // Navigation timeout
    navigationTimeout: 30 * 1000,
  },

  // Configure projects for major browsers
  projects: [
    // Setup Verification (no browser needed)
    {
      name: 'setup',
      testMatch: /00-setup\/.*.spec.ts/,
      use: {
        headless: true,
      },
    },

    // Blockchain & Contract Tests (no browser needed)
    {
      name: 'infrastructure',
      testMatch: /01-infrastructure\/.*.spec.ts/,
      use: {
        headless: true,
      },
      dependencies: ['setup'],
    },

    {
      name: 'contracts',
      testMatch: /02-contracts\/.*.spec.ts/,
      use: {
        headless: true,
      },
      dependencies: ['infrastructure'], // Requires blockchain to be running
    },

    // dApp UI Tests (browser required)
    {
      name: 'dapps-chromium',
      testMatch: /03-dapps\/.*.spec.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['contracts'], // Requires contracts to be deployed
    },

    {
      name: 'dapps-firefox',
      testMatch: /03-dapps\/.*.spec.ts/,
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['contracts'],
    },

    {
      name: 'dapps-webkit',
      testMatch: /03-dapps\/.*.spec.ts/,
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['contracts'],
    },

    // Mobile Tests
    {
      name: 'dapps-mobile-chrome',
      testMatch: /03-dapps\/.*.spec.ts/,
      use: {
        ...devices['Pixel 5'],
      },
      dependencies: ['contracts'],
    },

    {
      name: 'dapps-mobile-safari',
      testMatch: /03-dapps\/.*.spec.ts/,
      use: {
        ...devices['iPhone 12'],
      },
      dependencies: ['contracts'],
    },

    // Integration Tests (full end-to-end flows)
    {
      name: 'integration',
      testMatch: /04-integration\/.*.spec.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['dapps-chromium'], // Requires everything to be running
    },
  ],

  // Test output folder
  outputDir: 'test-results/',

  // Web Server (dApps)
  // Note: We manage dApp servers manually in fixtures for better control
  // webServer: {
  //   command: 'npm run dev:all',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
