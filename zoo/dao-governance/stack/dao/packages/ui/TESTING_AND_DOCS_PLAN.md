# UI Package Testing and Documentation Plan

## 🧪 Testing Strategy

### 1. Unit Tests (Vitest)
- Component-level unit tests
- Theme and styling tests
- Hook functionality tests
- Utility function tests

### 2. Integration Tests (from ui-automation)
- Migrate relevant component tests from ui-automation
- Focus on component behavior and interactions
- Remove app-specific test scenarios

### 3. Visual Regression Tests (Storybook + Chromatic)
- Capture visual snapshots of components
- Detect unintended visual changes
- Cross-browser visual testing

### 4. E2E Component Tests (Playwright Component Testing)
- Test components in isolation
- Simulate user interactions
- Test accessibility features

## 📚 Documentation Strategy

### 1. Storybook Documentation
```bash
# Already configured in package.json
pnpm storybook      # Dev server
pnpm build-storybook # Static build
```

**Features to implement:**
- Component stories for all exported components
- Controls for interactive prop exploration
- MDX documentation pages
- Design tokens documentation
- Accessibility notes

### 2. API Documentation (TypeDoc)
```bash
# To be added
pnpm docs:api       # Generate TypeDoc
```

**Will document:**
- Component props and types
- Hook parameters and returns
- Utility function signatures
- Theme structure

### 3. Documentation Site Structure
```
docs/
├── introduction.mdx
├── getting-started.mdx
├── theming/
│   ├── overview.mdx
│   ├── colors.mdx
│   ├── typography.mdx
│   └── customization.mdx
├── components/
│   ├── badges.mdx
│   ├── forms.mdx
│   ├── layout.mdx
│   └── [category].mdx
├── patterns/
│   ├── accessibility.mdx
│   ├── responsive-design.mdx
│   └── best-practices.mdx
└── migration/
    └── from-app.mdx
```

## 🔄 Migration Plan for ui-automation

### Phase 1: Analyze Existing Tests
1. Identify component-specific tests
2. Separate app logic from component behavior
3. List tests suitable for migration

### Phase 2: Create Test Infrastructure
```typescript
// packages/ui/tests/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### Phase 3: Migrate Tests
Transform Selenium tests to component tests:

**Before (Selenium):**
```typescript
await test.waitForElement(By.css('[data-testid="badge"]'));
await test.driver.findElement(By.css('[data-testid="badge"]')).getText();
```

**After (Vitest + Testing Library):**
```typescript
import { render, screen } from '@testing-library/react';
import { Badge } from '@luxdao/ui';

test('Badge displays correct text', () => {
  render(<Badge labelKey="active" size="base" />);
  expect(screen.getByText('active')).toBeInTheDocument();
});
```

### Phase 4: Add Visual Tests
```typescript
// Badge.stories.tsx
export default {
  title: 'Components/Badge',
  component: Badge,
};

export const AllStates = () => (
  <div>
    {Object.keys(BADGE_MAPPING).map(key => (
      <Badge key={key} labelKey={key} size="base" />
    ))}
  </div>
);
```

## 🚀 Implementation Steps

1. **Set up Storybook** ✅ (already in package.json)
   ```bash
   cd packages/ui
   pnpm install
   pnpm storybook
   ```

2. **Create first stories**
   - Badge.stories.tsx
   - Tooltip.stories.tsx

3. **Add testing infrastructure**
   - Configure Vitest
   - Set up Testing Library
   - Add test utilities

4. **Migrate applicable tests**
   - Component behavior tests
   - Accessibility tests
   - Visual regression tests

5. **Set up documentation site**
   - Configure TypeDoc
   - Create MDX documentation
   - Deploy to GitHub Pages or Vercel

6. **CI/CD Integration**
   - Run tests on PR
   - Build and deploy docs
   - Visual regression checks

## 📋 Test Categories to Migrate

### ✅ Good Candidates for Migration
- Badge state displays
- Tooltip interactions
- Form input validations
- Button click behaviors
- Loading states
- Error states

### ❌ Not Suitable for Component Library
- DAO creation flows
- Proposal workflows
- Wallet connections
- Navigation between pages
- App-specific business logic

## 🎯 Success Metrics

1. **Test Coverage**
   - 90%+ unit test coverage
   - Visual tests for all components
   - Accessibility tests passing

2. **Documentation**
   - All components documented in Storybook
   - API docs auto-generated
   - Migration guide complete

3. **Developer Experience**
   - < 5 min to understand and use a component
   - Clear examples for all use cases
   - Smooth migration from app components