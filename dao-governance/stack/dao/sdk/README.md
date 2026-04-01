# DAO SDK [WIP]

A unified SDK for the DAO API that works in both Node.js and React environments.

## Installation

```bash
npm install sdk
```

## Usage

### Core API

```typescript
// Import core functions
import { getDao, getAllDaos } from 'sdk';

// Use core functions
const dao = await getDao({
  chainId: 8453,
  address: '0x1234...',
});

const baseDaos = await getAllDaos({
  chainId: 8453,
});
```

### React Hooks

```typescript
// Import React hooks
import { DAOApiProvider, useFetchDao, useFetchDaos } from 'sdk/react';

// Wrap your app with the provider
<DAOApiProvider>
// <DAOApiProvider apiUrl={"http://localhost:3005"}> // optional apiUrl prop can be passed here
  <DaoComponent />
</DAOApiProvider>

function DaoComponent() {
  // Use the hook with parameters
  const { dao, isLoading, error } = useFetchDao({
    chainId: 8453,
    address: '0x1234...',
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{dao?.name}</h1>
      {/* Rest of your component */}
    </div>
  );
}
```

## Development

```bash
# Install dependencies
bun install

# Build the SDK
bun run build

# Run tests
#  requirement: configure offchain locally.
bun test
```
