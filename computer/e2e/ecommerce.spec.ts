import { test, expect } from '@playwright/test';

test.describe('Ecommerce Flow', () => {
  test('should complete full purchase flow for DGX Spark', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await expect(page.getByRole('heading', { name: /AI Supercomputing/i })).toBeVisible();

    // Test DGX Spark highlight section
    await expect(page.getByRole('heading', { name: /DGX Spark/i }).first()).toBeVisible();
    await expect(page.getByText(/Only \$4,000/i)).toBeVisible();

    // Add to cart from highlight section
    await page.getByRole('button', { name: /Add to Cart - \$4,000/i }).click();

    // Should navigate to cart
    await expect(page).toHaveURL('/cart');
    await expect(page.getByRole('heading', { name: /Shopping Cart/i })).toBeVisible();

    // Verify cart shows image
    await expect(page.getByAltText('DGX Spark')).toBeVisible();

    // Verify cart item details
    await expect(page.getByRole('heading', { name: 'DGX Spark' })).toBeVisible();
    await expect(page.getByText(/\$4,000/i)).toBeVisible();

    // Test quantity controls
    const plusButton = page.getByRole('button', { name: '+' });
    const minusButton = page.getByRole('button', { name: '−' });

    // Add more items
    await plusButton.click();
    await plusButton.click();
    await plusButton.click();
    await plusButton.click();

    // Should now have 5 items (initial 1 + 4 clicks)
    await expect(page.locator('text=5').first()).toBeVisible();

    // Plus button should be disabled at 5 items
    await expect(plusButton).toBeDisabled();
    await expect(page.getByText(/Max 5 per order/i)).toBeVisible();

    // Verify total price
    await expect(page.getByText(/\$20,000/i).first()).toBeVisible();

    // Proceed to checkout
    await page.getByRole('link', { name: /Proceed to Checkout/i }).click();

    // Should navigate to checkout
    await expect(page).toHaveURL('/checkout');
    await expect(page.getByRole('heading', { name: /Secure Checkout/i })).toBeVisible();

    // Verify order summary
    await expect(page.getByText('DGX Spark')).toBeVisible();
    await expect(page.getByText('Qty: 5')).toBeVisible();
    await expect(page.getByText('$20,000').first()).toBeVisible();

    // Verify Stripe payment form is loaded
    await expect(page.getByText(/Card Details/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Pay \$20,000/i })).toBeVisible();
  });

  test('should enforce 5-item limit for DGX Spark', async ({ page }) => {
    await page.goto('/');

    // Add to cart from pricing section
    const addButton = page.getByRole('button', { name: /Add to Cart/i }).first();
    await addButton.click();

    await expect(page).toHaveURL('/cart');

    // Try to add more than 5
    const plusButton = page.getByRole('button', { name: '+' });

    // Add up to 5
    for (let i = 0; i < 4; i++) {
      await plusButton.click();
    }

    // Verify at 5 items
    await expect(page.locator('text=5').first()).toBeVisible();

    // Plus button should be disabled
    await expect(plusButton).toBeDisabled();

    // Verify warning message
    await expect(page.getByText(/Max 5 per order/i)).toBeVisible();
  });

  test('should show sales contact for non-Stripe products', async ({ page }) => {
    await page.goto('/');

    // Scroll to pricing section
    await page.locator('#pricing').scrollIntoViewIfNeeded();

    // Verify GPU On-Demand shows "Contact Sales Required"
    await expect(page.getByText(/GPU On-Demand/i)).toBeVisible();
    await expect(page.locator('text=/Contact Sales Required/i').first()).toBeVisible();

    // Verify Enterprise shows "Contact Sales Required"
    await expect(page.getByText(/Enterprise & Resale/i)).toBeVisible();
    await expect(page.locator('text=/Contact Sales Required/i').nth(1)).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate using header links', async ({ page }) => {
    await page.goto('/');

    // Test Features link
    await page.getByRole('link', { name: /Features/i }).click();
    await expect(page.locator('#features')).toBeInViewport();

    // Test Hardware link
    await page.getByRole('link', { name: /Hardware/i }).click();
    await expect(page.locator('#hardware')).toBeInViewport();

    // Test Pricing link
    await page.getByRole('link', { name: /Pricing/i }).nth(0).click();
    await expect(page.locator('#pricing')).toBeInViewport();
  });

  test('should show Products dropdown on hover', async ({ page }) => {
    await page.goto('/');

    // Hover over Products button
    const productsButton = page.getByRole('button', { name: 'Products' });
    await productsButton.hover();

    // Dropdown should appear
    await expect(page.getByText('DGX Spark').first()).toBeVisible();
    await expect(page.getByText('$4,000 - Dedicated DGX Instance')).toBeVisible();
    await expect(page.getByText('GPU On-Demand')).toBeVisible();
    await expect(page.getByText('H100 & H200 GPUs')).toBeVisible();
  });

  test('should navigate to account page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /My Account/i }).click();
    await expect(page).toHaveURL('/account');
    await expect(page.getByRole('heading', { name: /My Account/i })).toBeVisible();
  });
});

test.describe('Search Functionality', () => {
  test('should open search modal with Cmd+K', async ({ page }) => {
    await page.goto('/');

    // Press Cmd+K (or Ctrl+K on Windows/Linux)
    await page.keyboard.press('Meta+k');

    // Search modal should appear
    await expect(page.getByPlaceholder(/Search products, hardware/i)).toBeVisible();
    await expect(page.getByText('DGX Spark')).toBeVisible();
    await expect(page.getByText('NVIDIA DGX H100')).toBeVisible();
  });

  test('should filter search results', async ({ page }) => {
    await page.goto('/');

    // Open search
    await page.keyboard.press('Meta+k');

    // Type search query
    await page.getByPlaceholder(/Search products, hardware/i).fill('dgx');

    // Should filter to DGX items only
    await expect(page.getByText('DGX Spark')).toBeVisible();
    await expect(page.getByText('NVIDIA DGX H100')).toBeVisible();

    // GPU On-Demand should not be visible (filtered out)
    await expect(page.getByText('GPU On-Demand')).not.toBeVisible();
  });

  test('should close search with Escape', async ({ page }) => {
    await page.goto('/');

    // Open search
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder(/Search products, hardware/i)).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Search should close
    await expect(page.getByPlaceholder(/Search products, hardware/i)).not.toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should display mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: /Toggle menu/i });
    await expect(menuButton).toBeVisible();

    // Click to open menu
    await menuButton.click();

    // Menu items should appear
    await expect(page.getByRole('link', { name: /Features/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Hardware/i })).toBeVisible();
  });

  test('should display properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Key elements should be visible
    await expect(page.getByRole('heading', { name: /AI Supercomputing/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /DGX Spark/i }).first()).toBeVisible();

    // Shopping cart icon should be visible
    await expect(page.getByRole('link', { name: /Shopping Cart/i })).toBeVisible();
  });
});

test.describe('Cart Persistence', () => {
  test('should persist cart items across page reloads', async ({ page }) => {
    await page.goto('/');

    // Add item to cart
    await page.getByRole('button', { name: /Add to Cart - \$4,000/i }).click();
    await expect(page).toHaveURL('/cart');

    // Add more items
    const plusButton = page.getByRole('button', { name: '+' });
    await plusButton.click();
    await plusButton.click();

    // Navigate away
    await page.goto('/');

    // Cart badge should show 3 items
    await expect(page.getByText('3').first()).toBeVisible();

    // Go back to cart
    await page.getByRole('link', { name: /Shopping Cart/i }).click();

    // Should still have 3 items
    await expect(page.locator('text=3').first()).toBeVisible();
  });
});
