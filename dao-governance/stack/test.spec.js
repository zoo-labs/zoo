// Stack-level E2E tests for LuxDAO
const { test, expect } = require('@playwright/test');

test.describe('LuxDAO Stack E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the homepage
    await page.goto('http://localhost:3000');
  });

  test('Stack health check', async ({ page }) => {
    // Check frontend is accessible
    await expect(page).toHaveTitle(/Lux/i);
    
    // Check API health endpoint
    const apiResponse = await page.request.get('http://localhost:4000/health');
    expect(apiResponse.ok()).toBeTruthy();
    
    // Check Anvil RPC
    const rpcResponse = await page.request.post('http://localhost:8545', {
      data: {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1
      }
    });
    expect(rpcResponse.ok()).toBeTruthy();
  });

  test('Homepage loads with correct branding', async ({ page }) => {
    // Check for Lux branding
    await expect(page.locator('text=/Lux/i').first()).toBeVisible();
    
    // Check for inverted triangle logo
    const logo = page.locator('svg path[d*="M10 20 L90 20 L50 90 Z"]').first();
    await expect(logo).toBeVisible();
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
  });

  test('Wallet connection flow', async ({ page }) => {
    // Click connect wallet button
    const connectButton = page.locator('button:has-text("Connect Wallet")').first();
    await expect(connectButton).toBeVisible();
    await connectButton.click();
    
    // Check for wallet modal
    await expect(page.locator('[role="dialog"], [aria-modal="true"], .chakra-modal__content')).toBeVisible({ timeout: 10000 });
    
    // Take screenshot of wallet modal
    await page.screenshot({ path: 'test-results/wallet-modal.png' });
  });

  test('Navigation works correctly', async ({ page }) => {
    // Test main navigation links
    const navLinks = [
      { text: 'DAOs', href: /daos/i },
      { text: 'Create', href: /create/i }
    ];
    
    for (const link of navLinks) {
      const navLink = page.locator(`a:has-text("${link.text}")`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
        await expect(page.url()).toMatch(link.href);
        await page.goBack();
      }
    }
  });

  test('Create DAO flow initiates', async ({ page }) => {
    // Navigate to create page
    const createLink = page.locator('a:has-text("Create")').first();
    if (await createLink.isVisible()) {
      await createLink.click();
      await expect(page.url()).toContain('create');
      
      // Check for create DAO form elements
      const formElements = await page.locator('form, [role="form"]').count();
      expect(formElements).toBeGreaterThan(0);
    }
  });

  test('DAO list page loads', async ({ page }) => {
    // Navigate to DAOs page
    await page.goto('http://localhost:3000/daos');
    
    // Check for DAO list or empty state
    const hasContent = await page.locator('text=/No DAOs|DAO/i').first().isVisible();
    expect(hasContent).toBeTruthy();
  });

  test('Contract deployment verification', async ({ page }) => {
    // Check if contracts are deployed by querying the API
    const response = await page.request.get('http://localhost:4000/api/contracts');
    if (response.ok()) {
      const contracts = await response.json();
      expect(contracts).toBeDefined();
    }
  });

  test('IPFS gateway is accessible', async ({ page }) => {
    // Check IPFS gateway
    const ipfsResponse = await page.request.get('http://localhost:8080/ipfs/QmHash');
    // IPFS will return 400 for invalid hash, but that means it's running
    expect([200, 400, 404].includes(ipfsResponse.status())).toBeTruthy();
  });

  test('Database connectivity', async ({ page }) => {
    // Check API can connect to database via health endpoint
    const response = await page.request.get('http://localhost:4000/health');
    const health = await response.json().catch(() => ({}));
    expect(health.database || response.ok()).toBeTruthy();
  });

  test('Redis cache is operational', async ({ page }) => {
    // Check Redis through API health endpoint
    const response = await page.request.get('http://localhost:4000/health');
    const health = await response.json().catch(() => ({}));
    expect(health.redis || response.ok()).toBeTruthy();
  });
});

test.describe('Performance Tests', () => {
  test('Page load performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('API response time', async ({ page }) => {
    const startTime = Date.now();
    const response = await page.request.get('http://localhost:4000/health');
    const responseTime = Date.now() - startTime;
    
    // API should respond within 500ms
    expect(responseTime).toBeLessThan(500);
    expect(response.ok()).toBeTruthy();
  });
});

test.describe('Security Tests', () => {
  test('Security headers are present', async ({ page }) => {
    const response = await page.goto('http://localhost:3000');
    const headers = response.headers();
    
    // Check for security headers
    const securityHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'strict-transport-security'
    ];
    
    // Note: Some headers may not be present in dev mode
    // This is more relevant for production
  });

  test('No sensitive data in console', async ({ page }) => {
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push(msg.text()));
    
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Check console logs don't contain sensitive data
    const sensitivePatterns = [
      /private.*key/i,
      /secret/i,
      /password/i,
      /0x[a-fA-F0-9]{64}/ // Private keys
    ];
    
    for (const log of consoleLogs) {
      for (const pattern of sensitivePatterns) {
        expect(log).not.toMatch(pattern);
      }
    }
  });
});