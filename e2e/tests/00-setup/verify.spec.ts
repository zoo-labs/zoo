/**
 * Setup Verification Tests
 * Verifies that all E2E test prerequisites are met
 */

import { test, expect } from '@playwright/test';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('E2E Setup Verification', () => {
  test('should have Node.js >= 20.x', async () => {
    const version = process.version;
    const major = parseInt(version.slice(1).split('.')[0]);
    expect(major).toBeGreaterThanOrEqual(20);
  });

  test('should have npm installed', async () => {
    const { spawn } = await import('child_process');
    const npm = spawn('npm', ['--version']);

    const version = await new Promise<string>((resolve, reject) => {
      let output = '';
      npm.stdout.on('data', (data) => {
        output += data.toString();
      });
      npm.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(`npm check failed with code ${code}`));
        }
      });
    });

    expect(version).toBeTruthy();
  });

  test('should have Playwright installed', async () => {
    const playwrightPath = path.join(
      __dirname,
      '../../node_modules/@playwright/test'
    );
    expect(existsSync(playwrightPath)).toBe(true);
  });

  test('should have ethers.js installed', async () => {
    const ethersPath = path.join(__dirname, '../../node_modules/ethers');
    expect(existsSync(ethersPath)).toBe(true);
  });

  test('should have all test directories', async () => {
    const testDirs = [
      '01-infrastructure',
      '02-contracts',
      '03-dapps',
      '04-integration'
    ];

    for (const dir of testDirs) {
      const dirPath = path.join(__dirname, '..', dir);
      expect(existsSync(dirPath)).toBe(true);
    }
  });

  test('should have all fixtures', async () => {
    const fixtures = ['blockchain.ts', 'contracts.ts', 'wallets.ts', 'apps.ts'];

    for (const fixture of fixtures) {
      const fixturePath = path.join(__dirname, '../../fixtures', fixture);
      expect(existsSync(fixturePath)).toBe(true);
    }
  });

  test('should have helper utilities', async () => {
    const helpers = ['assertions.ts', 'selectors.ts'];

    for (const helper of helpers) {
      const helperPath = path.join(__dirname, '../../helpers', helper);
      expect(existsSync(helperPath)).toBe(true);
    }
  });

  test('should have Hardhat contracts directory', async () => {
    const contractsPath = path.join(__dirname, '../../../contracts');
    expect(existsSync(contractsPath)).toBe(true);
  });

  test('should have Zoo dApp directories', async () => {
    const dappDirs = [
      'app',
      'foundation',
      'network',
      'dao-governance/app',
      'fund',
      'computer'
    ];

    for (const dir of dappDirs) {
      const dappPath = path.join(__dirname, '../../../', dir);
      expect(existsSync(dappPath)).toBe(true);
    }
  });

  test('should be able to import test fixtures', async () => {
    // This will throw if imports fail
    const { setupBlockchain, teardownBlockchain } = await import(
      '../../fixtures/blockchain'
    );
    const { deployContracts } = await import('../../fixtures/contracts');
    const { setupWallets } = await import('../../fixtures/wallets');
    const { startApps, stopApps } = await import('../../fixtures/apps');

    expect(setupBlockchain).toBeInstanceOf(Function);
    expect(teardownBlockchain).toBeInstanceOf(Function);
    expect(deployContracts).toBeInstanceOf(Function);
    expect(setupWallets).toBeInstanceOf(Function);
    expect(startApps).toBeInstanceOf(Function);
    expect(stopApps).toBeInstanceOf(Function);
  });

  test('should be able to import helper utilities', async () => {
    const assertions = await import('../../helpers/assertions');
    const selectors = await import('../../helpers/selectors');

    expect(assertions.assertTransactionSuccess).toBeInstanceOf(Function);
    expect(assertions.assertTokenBalance).toBeInstanceOf(Function);
    expect(selectors.COMMON).toBeDefined();
    expect(selectors.ZOO_AI).toBeDefined();
    expect(selectors.VOTE).toBeDefined();
  });

  test('should be able to import ethers.js', async () => {
    const ethers = await import('ethers');
    expect(ethers.utils).toBeDefined();
    expect(ethers.Contract).toBeDefined();
    expect(ethers.Wallet).toBeDefined();
  });
});
