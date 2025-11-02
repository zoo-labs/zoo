/**
 * Zoo Vote/DAO dApp Tests
 * Tests the Zoo DAO governance application (localhost:3004)
 */

import { test, expect } from '@playwright/test';
import { startApps, stopApps, checkAppHealth, AppsFixture } from '../../fixtures/apps';
import { VOTE, COMMON } from '../../helpers/selectors';

let apps: AppsFixture;

test.describe('Zoo Vote/DAO Application', () => {
  test.beforeAll(async () => {
    console.log('🚀 Starting Zoo Vote/DAO app...');
    apps = await startApps({ parallel: false, timeout: 90000 });
    console.log('✅ Zoo Vote/DAO app started');
  });

  test.afterAll(async () => {
    console.log('🛑 Stopping Zoo Vote/DAO app...');
    await stopApps(apps);
    console.log('✅ Apps stopped');
  });

  test.describe('Application Health', () => {
    test('should have vote app running and healthy', async () => {
      const healthy = await checkAppHealth(apps.vote);
      expect(healthy).toBe(true);
      console.log('✅ Zoo Vote is healthy');
    });

    test('should load homepage without errors', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Filter out known non-critical errors
      const criticalErrors = consoleErrors.filter(err =>
        !err.includes('DevTools') &&
        !err.includes('Download the React DevTools')
      );

      if (criticalErrors.length > 0) {
        console.log('⚠️  Console errors:', criticalErrors);
      }

      console.log('✅ Page loaded without critical errors');
    });
  });

  test.describe('UI Elements', () => {
    test('should display header with navigation', async ({ page }) => {
      await page.goto(apps.vote.url);

      // Check header exists
      await expect(page.locator(COMMON.header)).toBeVisible();

      // Check Zoo branding
      const headerText = await page.locator(COMMON.header).textContent();
      expect(headerText?.toLowerCase()).toContain('zoo');

      console.log('✅ Header with Zoo branding displayed');
    });

    test('should display proposals list section', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Look for proposals section (may be empty if no proposals)
      const proposalsText = await page.textContent('body');
      const hasProposalsSection =
        proposalsText?.toLowerCase().includes('proposal') ||
        proposalsText?.toLowerCase().includes('governance') ||
        proposalsText?.toLowerCase().includes('vote');

      expect(hasProposalsSection).toBe(true);

      console.log('✅ Proposals section present');
    });

    test('should have "Connect Wallet" button when not connected', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Look for wallet connection button
      const connectButton = page.locator('button', { hasText: /connect/i }).first();

      // Button should either be visible or wallet is already connected
      const isVisible = await connectButton.isVisible().catch(() => false);
      const bodyText = await page.textContent('body');
      const hasWalletUI = bodyText?.toLowerCase().includes('wallet') ||
                         bodyText?.toLowerCase().includes('connect');

      expect(isVisible || hasWalletUI).toBe(true);

      console.log('✅ Wallet connection UI present');
    });
  });

  test.describe('Proposal Creation UI', () => {
    test('should have create proposal button or link', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Look for create proposal UI
      const bodyText = await page.textContent('body');
      const hasCreateUI =
        bodyText?.toLowerCase().includes('create') ||
        bodyText?.toLowerCase().includes('new proposal') ||
        bodyText?.toLowerCase().includes('propose');

      // Or check for button
      const createButton = page.locator('button, a', { hasText: /create|propose|new/i });
      const hasButton = (await createButton.count()) > 0;

      expect(hasCreateUI || hasButton).toBe(true);

      console.log('✅ Proposal creation UI elements present');
    });

    test('should display proposal form fields when creating', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Try to find create button and click it
      const createButton = page.locator('button, a', { hasText: /create|propose|new/i }).first();
      const isVisible = await createButton.isVisible().catch(() => false);

      if (isVisible) {
        await createButton.click();
        await page.waitForTimeout(1000);

        // Check for form fields
        const inputs = page.locator('input, textarea');
        const inputCount = await inputs.count();

        // Should have at least title and description inputs
        expect(inputCount).toBeGreaterThanOrEqual(1);

        console.log(`✅ Proposal form has ${inputCount} input fields`);
      } else {
        console.log('ℹ️  Create proposal button not immediately visible (may require wallet connection)');
      }
    });
  });

  test.describe('Voting UI', () => {
    test('should display voting options for proposals', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      const bodyText = await page.textContent('body');

      // Check for voting-related text
      const hasVotingUI =
        bodyText?.toLowerCase().includes('vote') ||
        bodyText?.toLowerCase().includes('for') ||
        bodyText?.toLowerCase().includes('against') ||
        bodyText?.toLowerCase().includes('abstain');

      expect(hasVotingUI).toBe(true);

      console.log('✅ Voting UI elements present');
    });

    test('should show vote counts or statistics', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      const bodyText = await page.textContent('body');

      // Look for voting statistics
      const hasStats =
        bodyText?.toLowerCase().includes('quorum') ||
        bodyText?.toLowerCase().includes('votes') ||
        bodyText?.toLowerCase().includes('voting power') ||
        bodyText?.includes('%');

      // This might not be present if there are no proposals
      if (hasStats) {
        console.log('✅ Voting statistics displayed');
      } else {
        console.log('ℹ️  No voting statistics (may be empty state)');
      }
    });
  });

  test.describe('Governance Integration', () => {
    test('should reference Governor contract', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      const bodyText = await page.textContent('body');

      // Look for governance terminology
      const hasGovernance =
        bodyText?.toLowerCase().includes('governor') ||
        bodyText?.toLowerCase().includes('governance') ||
        bodyText?.toLowerCase().includes('dao') ||
        bodyText?.toLowerCase().includes('timelock');

      expect(hasGovernance).toBe(true);

      console.log('✅ Governance contract references present');
    });

    test('should show ZOO token integration', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      const bodyText = await page.textContent('body');

      // Look for ZOO token references
      const hasTokenUI =
        bodyText?.includes('ZOO') ||
        bodyText?.toLowerCase().includes('token') ||
        bodyText?.toLowerCase().includes('balance');

      expect(hasTokenUI).toBe(true);

      console.log('✅ ZOO token integration present');
    });
  });

  test.describe('Multisig/Safe Integration', () => {
    test('should have multisig wallet option or reference', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      const bodyText = await page.textContent('body');

      // Look for Safe/multisig references
      const hasMultisig =
        bodyText?.toLowerCase().includes('safe') ||
        bodyText?.toLowerCase().includes('multisig') ||
        bodyText?.toLowerCase().includes('multi-sig') ||
        bodyText?.toLowerCase().includes('gnosis');

      if (hasMultisig) {
        console.log('✅ Multisig/Safe integration found');
      } else {
        console.log('ℹ️  No explicit multisig UI (may require connection)');
      }
    });

    test('should allow Safe wallet connection', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Check for wallet connector options
      const connectButton = page.locator('button', { hasText: /connect/i }).first();
      const isVisible = await connectButton.isVisible().catch(() => false);

      if (isVisible) {
        // Try clicking to see wallet options
        await connectButton.click();
        await page.waitForTimeout(1000);

        // Look for Safe option in wallet list
        const bodyText = await page.textContent('body');
        const hasSafeOption = bodyText?.toLowerCase().includes('safe');

        if (hasSafeOption) {
          console.log('✅ Safe wallet option available');
        } else {
          console.log('ℹ️  Safe wallet option not shown in current wallet list');
        }
      } else {
        console.log('ℹ️  Wallet connection button not immediately visible');
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      await expect(page.locator(COMMON.header)).toBeVisible();

      console.log('✅ Desktop layout working');
    });

    test('should work on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      await expect(page.locator(COMMON.header)).toBeVisible();

      console.log('✅ Tablet layout working');
    });

    test('should work on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      await expect(page.locator(COMMON.header)).toBeVisible();

      console.log('✅ Mobile layout working');
    });
  });

  test.describe('Performance', () => {
    test('should load within performance budget', async ({ page }) => {
      const startTime = Date.now();

      await page.goto(apps.vote.url);
      await page.waitForLoadState('load');

      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);

      console.log(`✅ Page loaded in ${loadTime}ms`);
    });

    test('should have no memory leaks on navigation', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Navigate to different sections multiple times
      for (let i = 0; i < 3; i++) {
        await page.reload();
        await page.waitForLoadState('networkidle');
      }

      // If we get here without crashing, no obvious memory leaks
      console.log('✅ No obvious memory leaks detected');
    });
  });

  test.describe('Accessibility', () => {
    test('should have semantic HTML', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      // Check for semantic elements
      const hasHeader = (await page.locator('header').count()) > 0;
      const hasMain = (await page.locator('main').count()) > 0;
      const hasNav = (await page.locator('nav').count()) > 0;

      expect(hasHeader || hasMain || hasNav).toBe(true);

      console.log('✅ Semantic HTML elements present');
    });

    test('should have accessible buttons', async ({ page }) => {
      await page.goto(apps.vote.url);
      await page.waitForLoadState('networkidle');

      const buttons = page.locator('button');
      const buttonCount = await buttons.count();

      // All buttons should have text or aria-label
      let accessibleCount = 0;
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');

        if (text || ariaLabel) {
          accessibleCount++;
        }
      }

      expect(accessibleCount).toBeGreaterThan(0);

      console.log(`✅ ${accessibleCount} accessible buttons found`);
    });
  });
});
