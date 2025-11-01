# @luxdao/ui

Lux DAO UI Component Library - A collection of reusable React components built with Chakra UI for the Lux DAO ecosystem.

## Installation

```bash
npm install @luxdao/ui
# or
pnpm add @luxdao/ui
# or
yarn add @luxdao/ui
```

## Prerequisites

This library requires the following peer dependencies:

```json
{
  "@chakra-ui/react": "^2.8.2",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## Usage

First, wrap your application with the Lux theme provider:

```tsx
import { ChakraProvider } from '@chakra-ui/react';
import { luxTheme } from '@luxdao/ui';

function App() {
  return (
    <ChakraProvider theme={luxTheme}>
      {/* Your app */}
    </ChakraProvider>
  );
}
```

Then use the components:

```tsx
import { Badge, Card, LuxTooltip } from '@luxdao/ui';

function MyComponent() {
  return (
    <Card>
      <LuxTooltip label="This is a tooltip">
        <Badge labelKey="active" size="base" />
      </LuxTooltip>
    </Card>
  );
}
```

## Components

### Layout
- `Card` - Basic card container
- `ContentBox` - Content container with title
- `InfoBox` - Information display box

### Badges & Status
- `Badge` - Status badge with various states
- `QuorumBadge` - Quorum status indicator
- `StatusBox` - Status display component

### Forms
- `AddressInput` - Ethereum address input
- `BigIntInput` - Big integer input field
- `DatePicker` - Date selection component
- `LabelWrapper` - Form label wrapper

### Navigation
- `Breadcrumbs` - Navigation breadcrumbs
- `NavigationLink` - Navigation link component

### Feedback
- `LuxTooltip` - Custom tooltip component
- `BarLoader` - Loading bar indicator
- `CircleLoader` - Circular loading indicator

### Utils
- `AddressCopier` - Copy address to clipboard
- `DisplayAddress` - Format and display addresses
- `ExternalLink` - External link component

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test

# Start Storybook
pnpm storybook
```

## Theme Customization

The library exports a default theme that can be extended:

```tsx
import { extendTheme } from '@chakra-ui/react';
import { luxTheme } from '@luxdao/ui';

const customTheme = extendTheme({
  colors: {
    brand: {
      500: '#custom-color',
    },
  },
}, luxTheme);
```

## License

MIT