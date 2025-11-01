# 🚀 Zoo Network - Quick Start Guide

## One-Command Setup

```bash
make dev
```

This will:
1. ✅ Start local blockchain (port 8545)
2. ✅ Deploy ZK governance contracts
3. ✅ Launch all 7 web applications
4. ✅ Display wallet info and URLs

## 🔑 Test Wallet (Ready to Use!)

**Import this wallet into MetaMask for testing:**

```
Address:     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Balance:     10,000 ETH
```

**MetaMask Network Settings:**
- Network Name: `Zoo Localhost`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency: `ETH`

Get wallet anytime: `make wallet`

## 🌐 Your Zoo Ecosystem

Once `make dev` is running, visit:

| Service | URL | What It Does |
|---------|-----|--------------|
| 🔬 **zoolabs.io** | http://localhost:3000 | AI Research + Desktop App Downloads |
| 🦁 **zoo.ngo** | http://localhost:3002 | 501(c)(3) Foundation Homepage |
| 🌐 **zoo.network** | http://localhost:3003 | Blockchain Explorer |
| 🗳️ **zoo.vote** | http://localhost:3004 | DAO Governance + ZK Staking |
| 💰 **zoo.fund** | http://localhost:3005 | Conservation DAO Fundraising |
| 🖥️ **zoo.computer** | http://localhost:3007 | AI Hardware Sales (NVIDIA DGX) |
| 💱 **zoo.exchange** | http://localhost:3008 | Decentralized Exchange (DEX) |

## 🎮 Quick Testing Flow

1. **Connect Wallet** (any app):
   - Click "Connect Wallet"
   - Import test wallet above into MetaMask
   - Connect to Zoo Localhost network

2. **Stake ZOO + KEEPER → Get ZK** (zoo.vote):
   - Visit http://localhost:3004
   - Connect wallet
   - Stake tokens to receive ZK voting power
   - Lock for up to 10 years = 10x bonus!

3. **Create/Vote on Proposals** (zoo.vote):
   - Requires 1 ZK minimum
   - Vote on governance decisions
   - View DAO treasury

4. **Explore Blockchain** (zoo.network):
   - View blocks and transactions
   - Track your staking activity
   - Monitor network stats

5. **Browse Conservation DAOs** (zoo.fund):
   - Discover fundraising projects
   - Support conservation initiatives
   - Track DAO funding progress

## 📋 Essential Commands

```bash
make help              # Show all commands
make dev               # Start everything
make stop              # Stop all services
make status            # Check what's running
make wallet            # Show test wallet info
make wallets           # Show all 20 test wallets

# Individual apps
make dev-app           # Start only zoolabs.io
make dev-fund          # Start only zoo.fund
make dev-vote          # Start only zoo.vote
make dev-chain         # Start only blockchain

# Logs (troubleshooting)
make logs              # Tail all logs
make logs-blockchain   # Blockchain logs
make logs-fund         # Fund app logs

# Contracts
make contracts-info    # Show deployed addresses

# Maintenance
make install           # Install dependencies
make clean             # Clean build artifacts
make doctor            # Check system requirements
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
make stop              # Kill all Zoo services
make dev               # Restart
```

### Apps Not Starting
```bash
make clean             # Clean artifacts
make install           # Reinstall dependencies
make dev               # Start fresh
```

### Blockchain Connection Issues
```bash
# Check blockchain is running
make status

# Restart just the blockchain
make dev-chain

# View blockchain logs
make logs-blockchain
```

### Check System Requirements
```bash
make doctor
```

Should show:
- ✅ Node.js v20+
- ✅ pnpm v8.15+
- ✅ npm installed
- ✅ Dependencies installed

## 🎯 Quick Token Economics

### Three-Token System

1. **ZOO Token** - Base governance token (1B supply)
2. **KEEPER Token** - Governance enabler (1B supply)
3. **ZK Token** - Voting power (deflationary)

### Staking Formula

```
ZK = (ZOO + KEEPER) × Time Bonus
```

| Lock Period | Multiplier |
|-------------|------------|
| 0 days      | 1.0x       |
| 1 year      | 1.9x       |
| 2 years     | 2.8x       |
| 5 years     | 5.5x       |
| **10 years**| **10.0x**  |

**Example:**
- Stake 100 ZOO + 100 KEEPER (200 total)
- Lock for 10 years
- Receive **2,000 ZK** voting power! (10x multiplier)

### Deflationary Economics

- ZK is **minted** when you stake
- ZK is **burned** when you unstake
- Total ZK supply decreases over time
- Scarcity increases voting power value

## 📚 Learn More

- **STAKING.md** - Complete staking guide
- **ZOO_ECOSYSTEM_ARCHITECTURE.md** - Full technical docs
- **ECOSYSTEM_STATUS.md** - Current deployment status
- **Makefile** - All available commands
- **README.md** - Main documentation

## 🆘 Need Help?

1. Check `make status` to see what's running
2. View logs: `make logs`
3. Full reset: `make reset` (clean + reinstall)
4. System check: `make doctor`

---

**Ready? Let's go!**

```bash
make dev
```

Then visit http://localhost:3004 to start staking! 🚀
