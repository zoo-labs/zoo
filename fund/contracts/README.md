# Zoo Fund DAO Governance Contracts

## Overview

This directory contains smart contracts for Zoo Fund's decentralized autonomous organization (DAO) governance system.

## Contracts

- **ZooToken.sol** - ERC-20 governance token with voting capabilities (ERC20Votes)
  - Token Name: "ZooKeeper Token"
  - Symbol: KEEPER
  - 1 billion KEEPER total supply
  - 1 KEEPER minimum to create proposals
  - Delegated voting power

- **ZooGovernor.sol** - OpenZeppelin Governor contract
  - 1 block voting delay
  - 50400 blocks voting period (~3 days)
  - 4% quorum requirement
  - Integrated with Timelock for security

## Setup & Testing Locally

### 1. Install Dependencies

```bash
cd ~/work/zoo/zoo/fund/contracts
npm install
```

### 2. Start Local Blockchain

Terminal 1:
```bash
npx hardhat node
```

This starts a local Ethereum node on `http://127.0.0.1:8545` (chain ID 31337) with 20 test accounts.

### 3. Deploy Contracts

Terminal 2:
```bash
npx hardhat run scripts/deploy-governance.js --network localhost
```

This will:
- Deploy KEEPER Token, Timelock, and Governor contracts
- Configure roles and permissions
- Distribute 1M KEEPER tokens to first 9 test accounts
- Auto-delegate voting power
- Save deployment addresses to `deployments/localhost-governance.json`

### 4. Connect MetaMask

Add custom network:
- **Network Name**: Zoo Local
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 31337
- **Currency Symbol**: ETH

Import a test account using the private key from the Hardhat node output.

### 5. Test Frontend

Start the Fund app:
```bash
cd ~/work/zoo/zoo/fund
npm run dev
```

Visit http://localhost:3005 and connect your MetaMask wallet.

## Current Deployment (Localhost)

After deployment, contract addresses are saved to:
```
deployments/localhost-governance.json
```

**Latest Deployment:**
- **KEEPER Token**: `0xa513E6E4b8f2a923D98304ec87F64353C4D5C853`
- **Timelock**: `0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6`
- **Governor**: `0x8A791620dd6260079BF849Dc5567aDC3F2FdC318`
- **Deployer**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (991M KEEPER)

**Test Accounts with 1M KEEPER each:**
1. `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
2. `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
3. `0x90F79bf6EB2c4f870365E785982E1f101E93b906`
4. `0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65`
5. `0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc`
6. `0x976EA74026E726554dB657fA54763abd0C3a0aa9`
7. `0x14dC79964da2C08b23698B3D3cc7Ca32193d9955`
8. `0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f`
9. `0xa0Ee7A142d267C1f36714E4a8F75612F20a79720`

The frontend will automatically load these for contract interactions.

## Governance Flow

1. **Create Proposal** - Any wallet with 1+ KEEPER can create a proposal
2. **Vote** - Token holders vote For/Against/Abstain during the 3-day voting period
3. **Queue** - After voting passes, proposal is queued in Timelock
4. **Execute** - After 2-day delay, anyone can execute the passed proposal

## Development Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to localhost
npx hardhat run scripts/deploy-governance.js --network localhost

# Start local node
npx hardhat node

# Clean artifacts
npx hardhat clean
```

## Troubleshooting

### "Nonce too high" Error
Reset MetaMask account:
1. Settings → Advanced → Reset Account
2. Refresh page

### Voting Not Working
Ensure you've delegated voting power:
```javascript
await keeperToken.delegate(yourAddress)
```

## Architecture

```
ZooToken (ERC20Votes) - KEEPER Token
    ↓
ZooGovernor ←→ TimelockController
    ↓
Proposal Execution
```

The Timelock adds a 2-day security delay between proposal passage and execution, allowing time to detect malicious proposals.

## Security Considerations

- Timelock prevents instant malicious proposals
- Only Governor can propose to Timelock
- Anyone can execute passed proposals
- Admin role kept for local testing (revoked in production)
- 4% quorum prevents minority attacks
- 1 KEEPER threshold prevents spam proposals

## Next Steps

1. ✅ Contracts written (KEEPER Token, Governor)
2. ✅ Deployed to local chain
3. 🔄 Connect frontend via wagmi
4. 🔄 Implement create proposal UI
5. 🔄 Implement voting UI
6. 🔄 Test full governance flow

Happy testing! 🚀
