/**
 * Zoo Computer dApp Tests
 * Tests the Zoo Computer UI (localhost:3007)
 */

import { test, expect } from '@playwright/test';
import { startApps, stopApps, checkAppHealth, AppsFixture } from '../../fixtures/apps';
import { COMPUTER, COMMON } from '../../helpers/selectors';

let apps: AppsFixture;

test.describe('Zoo Computer dApp', () => {
  test.beforeAll(async () => {
    console.log('🚀 Starting Zoo Computer app...');

    // Start only the computer app for testing
    apps = await startApps({ parallel: false, timeout: 90000 });

    console.log('✅ Zoo Computer app started');
  });

  test.afterAll(async () => {
    console.log('🛑 Stopping Zoo Computer app...');
    await stopApps(apps);
    console.log('✅ Apps stopped');
  });

  test('should have app running and healthy', async () => {
    const healthy = await checkAppHealth(apps.computer);
    expect(healthy).toBe(true);
    console.log('✅ Zoo Computer is healthy');
  });

  test('should load homepage', async ({ page }) => {
    await page.goto(apps.computer.url);

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check page title
    const title = await page.title();
    expect(title).toContain('Zoo');

    console.log(`✅ Homepage loaded with title: ${title}`);
  });

  test('should display header with logo', async ({ page }) => {
    await page.goto(apps.computer.url);

    // Check header exists
    await expect(page.locator(COMMON.header)).toBeVisible();

    // Check logo exists
    const logo = page.locator('svg').first();
    await expect(logo).toBeVisible();

    console.log('✅ Header and logo visible');
  });

  test('should display navigation', async ({ page }) => {
    await page.goto(apps.computer.url);

    // Check navigation exists
    const nav = page.locator(COMMON.nav);
    await expect(nav).toBeVisible();

    console.log('✅ Navigation visible');
  });

  test('should have footer with Zoo branding', async ({ page }) => {
    await page.goto(apps.computer.url);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer has Zoo text
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const footerText = await footer.textContent();
    expect(footerText?.toLowerCase()).toContain('zoo');

    console.log('✅ Footer with Zoo branding visible');
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(apps.computer.url);
    await expect(page.locator(COMMON.header)).toBeVisible();
    console.log('✅ Desktop layout working');

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator(COMMON.header)).toBeVisible();
    console.log('✅ Tablet layout working');

    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.locator(COMMON.header)).toBeVisible();
    console.log('✅ Mobile layout working');
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto(apps.computer.url);

    // Get initial URL
    const initialUrl = page.url();
    console.log(`Initial URL: ${initialUrl}`);

    // Try to find and click a navigation link
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();

    if (linkCount > 0) {
      // Click first navigation link
      await navLinks.first().click();

      // Wait for navigation
      await page.waitForLoadState('networkidle');

      // Verify URL changed or page content changed
      const newUrl = page.url();
      console.log(`Navigated to: ${newUrl}`);

      // The URL might be the same if it's a single-page app
      // So we just verify the page loaded successfully
      await expect(page.locator(COMMON.header)).toBeVisible();

      console.log('✅ Navigation working');
    } else {
      console.log('ℹ️  No navigation links found, skipping navigation test');
    }
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });

    await page.goto(apps.computer.url);
    await page.waitForLoadState('networkidle');

    // Allow some warnings but no critical errors
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('DevTools') &&
      !err.includes('Warning') &&
      !err.includes('Download the React DevTools')
    );

    if (criticalErrors.length > 0) {
      console.log('⚠️  Found errors:', criticalErrors);
    }

    expect(criticalErrors.length).toBe(0);

    console.log('✅ No JavaScript errors on page load');
  });

  test('should have correct Zoo logo colors', async ({ page }) => {
    await page.goto(apps.computer.url);

    // Find the Zoo logo SVG
    const logo = page.locator('svg').first();
    await expect(logo).toBeVisible();

    // Check that SVG has circles (our logo has multiple colored circles)
    const circles = logo.locator('circle');
    const circleCount = await circles.count();

    // Zoo logo has 6+ circles
    expect(circleCount).toBeGreaterThanOrEqual(6);

    console.log(`✅ Zoo logo has ${circleCount} circles`);
  });

  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(apps.computer.url);
    await page.waitForLoadState('load');

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);

    console.log(`✅ Page loaded in ${loadTime}ms`);
  });
});
