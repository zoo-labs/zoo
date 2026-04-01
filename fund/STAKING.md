# 🎮 Zoo DAO - Gamified Staking & Governance System

## 🌟 Overview

Welcome to Zoo DAO's **ZK Staking System** - a Web3 game where staking = power!

### The Game Loop

```
ZOO + KEEPER (1:1) → Stake → Earn ZK → Vote → Govern → Earn Rewards → Repeat
```

## 🪙 Token System

### Three Tokens

1. **ZOO** - Base token (1B supply)
2. **KEEPER** - Governance enabler (1B supply)
3. **ZK (Zoo Keeper)** - Voting power token (minted via staking)

### How It Works

- **Requirement**: 1 ZOO + 1 KEEPER minimum to stake
- **Result**: Mint ZK tokens based on amount + time lock
- **Power**: ZK tokens = voting power in DAO

## ⏰ Time Bonus Multiplier

The longer you lock, the more power you get!

| Lock Duration | Multiplier | Example (100K stake) |
|---------------|------------|----------------------|
| No lock       | 1.0x       | 100K ZK              |
| 1 year        | 1.9x       | 190K ZK              |
| 2 years       | 2.8x       | 280K ZK              |
| 5 years       | 5.5x       | 550K ZK              |
| 10 years      | **10.0x**  | **1M ZK (MAX!)** 🚀  |

**Formula**: `ZK = (ZOO + KEEPER) × Time Bonus`

💡 **Pro Tip**: 10-year lock gives you **10x voting power** - that's insane!

## 💰 Staking Rewards

- **Rewards Source**: DAO Treasury (not from ZK minting)
- **Distribution**: To be implemented via DAO governance
- **Economics**: ZK supply is **deflationary**
- **Burning**: When you unstake, your ZK tokens are burned
- **Result**: Over time, total ZK supply decreases as users unstake

### Why Deflationary?

When you unstake:
1. Your ZK tokens are **burned** (removed from supply)
2. You get back your original ZOO + KEEPER tokens
3. Total ZK supply goes **down**, not up
4. This makes remaining ZK more valuable over time

## 🗳️ Governance Power

### Voting Requirements

- **Create Proposal**: 1 ZK minimum
- **Vote**: Any amount of ZK
- **Quorum**: 4% of total ZK supply

### Proposal Flow

1. **Create** - Describe your idea
2. **Vote** - Community votes (3 days)
3. **Queue** - Passed proposals wait 2 days (security)
4. **Execute** - Anyone can execute

## 🎲 Game Mechanics

### Staking Strategy

**Short-term Player** (0-1 year lock)
- ✅ Flexibility to unstake
- ❌ Lower voting power
- 💡 Best for: Active trading

**Mid-term Player** (1-5 years lock)
- ✅ Solid 1.2x - 2x multiplier
- ✅ Good rewards accumulation
- 💡 Best for: Balanced governance

**Long-term Player** (5-10 years lock)
- ✅ Maximum 5.5x - 10x power 🔥
- ✅ Maximum deflationary benefits
- ✅ DAO leadership status
- 💡 Best for: True believers and governance leaders

### Power Ranking

Check your rank in the DAO:

| ZK Balance | Rank | Influence |
|------------|------|-----------|
| 1 - 10K    | 🌱 Seedling | Voter |
| 10K - 100K | 🌿 Sprout | Active Member |
| 100K - 1M  | 🌳 Tree | Council Member |
| 1M - 10M   | 🌲 Forest | Major Stakeholder |
| 10M+       | 🌍 Ecosystem | Whale |

## 🎨 Dashboard Features

### Your Stats

- **Total ZK Balance**: Voting power
- **Active Stakes**: Number of positions
- **Locked Amount**: ZOO + KEEPER locked
- **Unlock Times**: Countdown timers
- **Pending Rewards**: Unclaimed ZK
- **DAO Rank**: Your influence level

### Actions

1. **Stake More** - Lock ZOO + KEEPER, get ZK
2. **Unstake** - After lock period (burns ZK, returns ZOO + KEEPER)
3. **Create Proposal** - If you have 1+ ZK
4. **Vote** - On active proposals
5. **Claim Rewards** - From DAO treasury (coming soon)

## 📊 Current Deployment (Localhost)

### Contract Addresses

- **ZOO Token**: `0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44`
- **KEEPER Token**: `0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f`
- **ZK Staking**: `0x4A679253410272dd5232B3Ff7cF5dbB88f295319`
- **Governor**: `0x09635F643e140090A9A8Dcd712eD6285858ceBef`
- **Timelock**: `0x7a2088a1bFc9d81c55368AE168C2C02570cB814F`

### Test Accounts

All have 1M ZOO + 1M KEEPER, with 100K staked (1 year):

1. `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` (~120K ZK)
2. `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` (~120K ZK)
3. `0x90F79bf6EB2c4f870365E785982E1f101E93b906` (~120K ZK)
4. `0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65` (~120K ZK)
5. `0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc` (~120K ZK)
6. `0x976EA74026E726554dB657fA54763abd0C3a0aa9` (~120K ZK)
7. `0x14dC79964da2C08b23698B3D3cc7Ca32193d9955` (~120K ZK)
8. `0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f` (~120K ZK)
9. `0xa0Ee7A142d267C1f36714E4a8F75612F20a79720` (~120K ZK)

Deployer: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (~1.4M ZK, 2-year lock)

## 🚀 Quick Start

### 1. Connect Wallet

Add Zoo Local network to MetaMask:
- RPC: `http://127.0.0.1:8545`
- Chain ID: `31337`

### 2. Import Test Account

Use any private key from Hardhat node output.

### 3. Check Your Balance

- Visit dashboard at `http://localhost:3005`
- See ZOO, KEEPER, and ZK balances

### 4. Stake & Earn

- Choose amount and lock duration
- Watch your ZK grow
- Claim rewards anytime
- Vote on proposals

## 🎯 Pro Tips

1. **Maximize Power**: Lock for 10 years = 10x multiplier 🚀
2. **Long-term Holding**: Longer stakes = more influence + deflationary benefits
3. **DAO Strategy**: Hold ZK for voting, stake more for power
4. **Timing**: Stake early for maximum influence
5. **Diversify**: Multiple stakes with different unlock times
6. **Deflationary Advantage**: As others unstake, your ZK becomes more valuable

## 🔐 Security

- **Audited Contracts**: OpenZeppelin standards
- **Timelock**: 2-day delay on governance actions
- **Non-custodial**: You control your keys
- **Transparent**: All actions on-chain

## 📈 Stats to Track

### Personal
- Total ZK balance
- Voting power %
- Rewards earned
- Stakes count
- Average lock duration

### Global
- Total ZK supply
- Total ZOO/KEEPER locked
- Active proposals
- Quorum threshold
- Top stakeholders

## 🎮 Achievement System (Coming Soon)

- 🥉 Bronze Keeper: First stake
- 🥈 Silver Keeper: 100K ZK
- 🥇 Gold Keeper: 1M ZK
- 💎 Diamond Keeper: 10M ZK
- 🏆 Legendary Keeper: 100M ZK

## 🌐 Lux Exchange Integration

The same tokens work on Lux Exchange:
- Trade ZOO/KEEPER pairs
- Provide liquidity
- Earn trading fees
- Cross-chain bridges (coming soon)

## 🤝 DAO Governance

### What Can You Vote On?

- Treasury spending
- Protocol upgrades
- Parameter changes (APR, quorum, etc.)
- Partnerships
- Token emissions
- Community grants

### Example Proposal

```
Title: Increase Staking Rewards to 2% APR
Description: To attract more long-term stakers, increase base APR from 1% to 2%.
Execution: Update ZKStaking.REWARD_RATE from 100 to 200
```

## 📞 Support

- **Discord**: [Join our community]
- **Twitter**: @ZooDAO
- **Docs**: https://docs.zoo.dao
- **GitHub**: Issues & pull requests welcome

---

**Ready to play?** Stake now and become a Zoo Keeper! 🦁🚀
