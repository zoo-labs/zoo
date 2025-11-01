# LuxDAO Stack Architecture

## Overview
The LuxDAO stack is a comprehensive decentralized autonomous organization (DAO) platform built with a microservices architecture. Here's how all the components fit together:

## Current Stack Components

### 🎯 **Currently Active & Working**

#### 1. **Frontend (App)** ✅
- **Location**: `/dao/app`
- **Technology**: React, TypeScript, Vite
- **Port**: 5173 (dev), 3000 (production)
- **Purpose**: Main user interface for the DAO
- **Features**:
  - Wallet connection (WalletConnect, MetaMask, etc.)
  - Proposal creation and voting
  - Treasury management
  - Role-based access control
  - Multi-chain support

#### 2. **Smart Contracts** ✅
- **Location**: `/dao/contracts`
- **Technology**: Solidity, Hardhat, Foundry
- **Deployed Contracts**:
  - `LinearERC20Voting`: Token-based voting
  - `Azorius`: Modular governance framework
  - `DecentAutonomousAdmin`: Autonomous admin functions
  - `DecentHats`: Role management with Hats Protocol
  - `KeyValuePairs`: On-chain key-value storage
  - `ERC6551Registry`: Token-bound accounts

#### 3. **Local Blockchain (Anvil)** ✅
- **Port**: 8545
- **Purpose**: Local Ethereum development network
- **Features**:
  - Fast block times (3s)
  - Pre-funded accounts
  - Zero gas costs for testing

### 📦 **Infrastructure Services (Running but Underutilized)**

#### 4. **PostgreSQL** ⚠️
- **Port**: 5432
- **Intended Purpose**: 
  - Store indexed blockchain events
  - Cache DAO metadata
  - Store proposal history
  - Analytics data
- **Current Status**: Running but not actively used
- **Future Use**: Will be used by indexer service when implemented

#### 5. **Redis** ⚠️
- **Port**: 6379
- **Intended Purpose**:
  - Cache frequently accessed data
  - Session management
  - Rate limiting
  - Job queues for background tasks
- **Current Status**: Running but not actively used
- **Future Use**: Will cache API responses and manage queues

#### 6. **IPFS** ⚠️
- **Ports**: 5001 (API), 8080 (Gateway)
- **Intended Purpose**:
  - Store proposal metadata
  - Store DAO documents
  - Decentralized file storage
- **Current Status**: Running but not integrated
- **Future Use**: Store large proposal content off-chain

### 🚧 **Planned/Incomplete Components**

#### 7. **API Backend** (Placeholder)
- **Location**: `/dao/api/packages/offchain`
- **Intended Purpose**:
  - REST/GraphQL API
  - Database interactions
  - Caching layer
  - WebSocket subscriptions
- **Status**: Dockerfile exists but no implementation

#### 8. **Indexer Service** (Placeholder)
- **Location**: `/dao/api/packages/indexer`
- **Intended Purpose**:
  - Listen to blockchain events
  - Index and store in PostgreSQL
  - Maintain DAO state
- **Status**: Dockerfile exists but no implementation

#### 9. **Subgraph** (Partially Implemented)
- **Location**: `/dao/subgraph`
- **Purpose**: GraphQL API for blockchain data
- **Status**: Schema defined but not deployed locally

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend App (:5173)                      │
│                  React + TypeScript + Vite                   │
└──────────┬───────────────────────────────────┬──────────────┘
           │                                   │
           │ Direct RPC Calls                  │ (Future: API calls)
           │                                   │
           ▼                                   ▼
┌──────────────────────┐            ┌──────────────────────┐
│   Anvil Blockchain   │            │   API Backend (:4000) │
│      (:8545)         │            │    (Not Implemented)  │
│                      │            └──────────┬───────────┘
│  - Smart Contracts   │                       │
│  - Local Test Chain  │                       ▼
└──────────────────────┘            ┌──────────────────────┐
                                    │   PostgreSQL (:5432)  │
                                    │   Redis (:6379)       │
                                    │   (Underutilized)     │
                                    └──────────────────────┘
```

## Current Implementation Status

### ✅ **What's Working:**
1. **Frontend** connects directly to blockchain via RPC
2. **Smart contracts** deployed and functional on Anvil
3. **All infrastructure services** running and healthy
4. **E2E tests** passing (7/7)

### ⚠️ **What's Not Integrated:**
1. **PostgreSQL/Redis**: Running but no services use them
2. **IPFS**: Running but not connected to the app
3. **API Backend**: Not implemented
4. **Indexer**: Not implemented
5. **Subgraph**: Not deployed locally

## Why PostgreSQL and Redis?

These services are part of a **production-ready architecture** that would typically include:

### PostgreSQL Would Store:
- Indexed blockchain events (faster queries than RPC)
- Proposal metadata and history
- User preferences and settings
- DAO analytics and metrics
- Cached on-chain data for performance

### Redis Would Handle:
- API response caching
- Session management
- Rate limiting
- WebSocket pub/sub
- Background job queues
- Real-time notifications

## Current App Behavior

The app currently works in **"direct mode"**:
1. Frontend connects directly to Anvil RPC
2. All data fetched directly from blockchain
3. No caching or indexing layer
4. No backend API (everything client-side)

This works for development but would be slow/expensive in production.

## Missing Pieces for Complete Stack

1. **Indexer Service**: Need to implement blockchain event listening
2. **API Backend**: Need REST/GraphQL API implementation
3. **Database Schema**: Need to design and implement
4. **Caching Strategy**: Need to implement Redis caching
5. **IPFS Integration**: Need to connect for metadata storage
6. **Subgraph Deployment**: Need local Graph node setup

## Recommendation

For a **minimal working DAO**, you have everything you need:
- Frontend ✅
- Smart Contracts ✅
- Local Blockchain ✅

The PostgreSQL/Redis infrastructure is **future-proofing** for when you need:
- Better performance (caching)
- Historical data (indexing)
- Complex queries (database)
- Background jobs (queues)

You could simplify the stack by removing unused services for now, or keep them as placeholders for future development.