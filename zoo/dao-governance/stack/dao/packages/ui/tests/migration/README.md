# UI Automation Test Migration Guide

This guide helps migrate tests from the Selenium-based ui-automation package to component-level tests in the UI library.

## Migration Strategy

### 1. Identify Component-Specific Tests

From ui-automation, we can extract tests that verify:
- Component rendering
- State changes
- User interactions
- Visual appearance

### 2. Test Transformation Examples

#### Badge Component Tests

**Original Selenium Test Pattern:**
```typescript
// ui-automation/tests/general/badges/badge-states.test.ts
await test.waitForElement(By.css('[data-testid="proposal-badge-active"]'));
const badgeText = await test.driver.findElement(By.css('[data-testid="proposal-badge-active"]')).getText();
expect(badgeText).toBe('Active');
```

**Migrated Component Test:**
```typescript
// packages/ui/tests/components/Badge.test.tsx
test('displays active state correctly', () => {
  render(<Badge labelKey="active" size="base" />);
  expect(screen.getByText('active')).toBeInTheDocument();
  expect(screen.getByText('active').parentElement).toHaveStyle({
    backgroundColor: 'color-lilac-100'
  });
});
```

#### Tooltip Interaction Tests

**Original Selenium Test Pattern:**
```typescript
// Hover over element and check tooltip
await test.driver.actions().move({ origin: element }).perform();
await test.waitForElement(By.css('[role="tooltip"]'));
```

**Migrated Component Test:**
```typescript
// packages/ui/tests/components/Tooltip.test.tsx  
test('shows tooltip on hover', async () => {
  const user = userEvent.setup();
  render(
    <Tooltip label="Help text">
      <button>Hover me</button>
    </Tooltip>
  );
  
  await user.hover(screen.getByText('Hover me'));
  expect(await screen.findByText('Help text')).toBeInTheDocument();
});
```

### 3. Visual Regression Tests

For visual tests from ui-automation, we'll use Storybook's visual testing:

```typescript
// Badge.stories.tsx
export const VisualRegressionTest = {
  render: () => (
    <div data-testid="badge-visual-test">
      {/* All badge states for visual comparison */}
    </div>
  ),
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};
```

### 4. Accessibility Tests

Transform accessibility checks:

**Original:**
```typescript
// Check for aria labels
await test.driver.findElement(By.css('[aria-label="Badge status"]'));
```

**Migrated:**
```typescript
test('has proper accessibility attributes', () => {
  render(<Badge labelKey="active" size="base" />);
  expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Badge status: active');
});
```

## Test Categories from UI Automation

### ✅ To Migrate

1. **Component Behavior Tests**
   - Badge state displays
   - Tooltip show/hide
   - Form validation states
   - Loading indicators
   - Error messages

2. **Interaction Tests**
   - Button clicks
   - Form inputs
   - Keyboard navigation
   - Focus management

3. **Visual Tests**
   - Component styling
   - Responsive behavior
   - Theme compliance
   - Animation states

### ❌ Not for UI Library

1. **Application Flow Tests**
   - DAO creation workflows
   - Proposal submission flows
   - Multi-page navigation

2. **Integration Tests**
   - Wallet connections
   - API interactions
   - Smart contract calls

3. **E2E Scenarios**
   - Complete user journeys
   - Business logic verification
   - Cross-feature interactions

## Migration Checklist

For each component:

- [ ] Identify relevant tests in ui-automation
- [ ] Extract test scenarios
- [ ] Write unit tests for component logic
- [ ] Add interaction tests for user behavior
- [ ] Create visual regression tests in Storybook
- [ ] Add accessibility tests
- [ ] Document any app-specific behavior that can't be tested in isolation

## Running Migrated Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test --watch

# Run specific test file
pnpm test Badge.test.tsx
```

## Continuous Integration

The migrated tests will run automatically on:
- Pull requests
- Pre-commit hooks
- Release builds

This ensures component quality without the overhead of full E2E tests.