# Local DAO Testing Guide

This guide will help you test the Zoo DAO functionality locally.

## Quick Start

### 1. Install Dependencies

```bash
cd ~/work/zoo/zoo/contracts
npm install --legacy-peer-deps
```

### 2. Start Local Blockchain

```bash
# Terminal 1: Start Hardhat node
cd ~/work/zoo/zoo/contracts
npx hardhat node
```

This will:
- Start a local Ethereum node on `http://127.0.0.1:8545`
- Create 20 test accounts with 10,000 ETH each
- Display private keys for testing

### 3. Deploy Governance Contracts

```bash
# Terminal 2: Deploy contracts
cd ~/work/zoo/zoo/contracts
npx hardhat run scripts/deploy-governance.ts --network localhost
```

This will deploy:
- **ZOO Token**: ERC-20 governance token with voting power
- **Timelock**: 2-day execution delay for security
- **Governor**: OpenZeppelin Governor for proposals/voting

### 4. Start Frontend

```bash
# Terminal 3: Start Zoo Fund app
cd ~/work/zoo/zoo/fund
npm run dev
```

Visit: http://localhost:3005

## Smart Contract Details

### ZOO Token
- **Symbol**: ZOO
- **Total Supply**: 1 billion tokens
- **Proposal Threshold**: 1 ZOO (anyone with 1+ ZOO can create proposals)
- **Voting Power**: Delegated (you must delegate to yourself to vote)

### Governor Settings
- **Voting Delay**: 1 day (~6,500 blocks)
- **Voting Period**: 3 days (~19,000 blocks)
- **Quorum**: 4% of total supply
- **Proposal Threshold**: 1 ZOO

### Timelock
- **Minimum Delay**: 2 days (for production security)
- **Proposers**: Only Governor contract
- **Executors**: Anyone can execute passed proposals

## Testing Workflow

### 1. Connect Wallet to Local Chain

1. Open MetaMask
2. Add Custom Network:
   - **Network Name**: Zoo Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

3. Import test account:
   - Copy private key from Hardhat node output
   - Import into MetaMask

### 2. Get ZOO Tokens

The deployment script automatically distributes:
- 1M ZOO to first 10 test accounts
- Voting power is auto-delegated

### 3. Create a Proposal

```solidity
// Proposal structure (from frontend):
targets: [contractAddress]          // What contract to call
values: [0]                          // ETH to send
calldatas: [encodedFunctionCall]    // Function + parameters
description: "Proposal description" // What and why
```

### 4. Vote on Proposal

- **For**: Support the proposal
- **Against**: Oppose the proposal
- **Abstain**: Participate without opinion

### 5. Execute Proposal

After voting period + timelock delay:
- Anyone can execute
- Changes take effect immediately

## Frontend Integration

The Fund app connects to local chain via wagmi:

```typescript
// In fund/lib/wagmi-config.ts
const localChain = {
  id: 31337,
  name: 'Zoo Local',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] }
  },
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
}
```

## Troubleshooting

### "Nonce too high" Error
Reset MetaMask:
1. Settings → Advanced → Reset Account
2. Refresh page

### Proposals Not Appearing
Check console for contract addresses and ensure:
1. Contracts deployed successfully
2. Frontend has correct contract addresses
3. Wallet is connected to localhost:8545

### Voting Not Working
Ensure you've delegated voting power:
```javascript
await zooToken.delegate(yourAddress)
```

## Development Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to localhost
npx hardhat run scripts/deploy-governance.ts --network localhost

# Start node
npx hardhat node

# Clean artifacts
npx hardhat clean
```

## Contract ABIs

After deployment, ABIs are saved to:
- `deployments/localhost-governance.json`
- Frontend will auto-load these for contract interactions

## Next Steps

1. ✅ Local blockchain running
2. ✅ Contracts deployed
3. ✅ Tokens distributed
4. ✅ Frontend connected
5. 🎯 Create your first proposal!
6. 🗳️ Vote on proposals
7. ⚙️ Execute passed proposals

Happy testing! 🚀
