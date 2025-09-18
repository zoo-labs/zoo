# LIPS - Loot Improvement Proposals Service

Item and loot system governance for the Zoo gaming ecosystem.

## Overview

LIPS (Loot Improvement Proposals) manages proposals for in-game items, loot mechanics, crafting systems, and item economics.

## Proposal Categories

### Items (LIP-I)
- New item types
- Item stats and abilities
- Visual updates
- Item set bonuses

### Mechanics (LIP-M)
- Drop rate algorithms
- Loot box systems
- Crafting recipes
- Item durability

### Economy (LIP-E)
- Item pricing
- Trading fees
- Crafting costs
- Item sinks

### Rarity (LIP-R)
- Rarity tier adjustments
- Drop rate changes
- Pity systems
- Lucky mechanics

## Item Rarity Tiers

### Common (Gray) ⚪
- **Drop Rate**: 60%
- **Crafting Cost**: 100 BAMBOO
- **Stats**: Base level
- **Trading Fee**: 2.5%

### Uncommon (Green) 🟢
- **Drop Rate**: 25%
- **Crafting Cost**: 500 BAMBOO
- **Stats**: +20% bonus
- **Trading Fee**: 3%

### Rare (Blue) 🔵
- **Drop Rate**: 10%
- **Crafting Cost**: 2,000 BAMBOO
- **Stats**: +50% bonus
- **Trading Fee**: 3.5%

### Epic (Purple) 🟣
- **Drop Rate**: 4%
- **Crafting Cost**: 10,000 BAMBOO + 10 ZOO
- **Stats**: +100% bonus
- **Trading Fee**: 4%

### Legendary (Orange) 🟠
- **Drop Rate**: 0.9%
- **Crafting Cost**: 50,000 BAMBOO + 100 ZOO
- **Stats**: +200% bonus
- **Trading Fee**: 4.5%

### Mythic (Red) 🔴
- **Drop Rate**: 0.1%
- **Crafting Cost**: Cannot be crafted
- **Stats**: +500% bonus + unique ability
- **Trading Fee**: 5%

## Item Categories

### Equipment
```typescript
interface Equipment {
    slot: 'head' | 'body' | 'feet' | 'accessory';
    stats: {
        attack?: number;
        defense?: number;
        speed?: number;
        luck?: number;
    };
    durability: number;
    repairCost: number;
}
```

### Consumables
```typescript
interface Consumable {
    effect: 'heal' | 'buff' | 'exp' | 'resource';
    value: number;
    duration?: number;
    stackSize: number;
}
```

### Materials
```typescript
interface Material {
    tier: 1 | 2 | 3 | 4 | 5;
    uses: string[];
    stackSize: number;
    tradeable: boolean;
}
```

### Special
```typescript
interface SpecialItem {
    ability: string;
    cooldown: number;
    charges?: number;
    soulbound: boolean;
}
```

## Drop Rate System

```javascript
// Base drop rates by activity
const dropRates = {
    battle: {
        win: { common: 0.8, uncommon: 0.15, rare: 0.04, epic: 0.009, legendary: 0.001 },
        loss: { common: 0.5, uncommon: 0.05, rare: 0.01, epic: 0, legendary: 0 }
    },
    breeding: {
        success: { common: 0.3, uncommon: 0.2, rare: 0.05, epic: 0.01, legendary: 0.001 }
    },
    daily: {
        login: { common: 1, uncommon: 0.1, rare: 0.01, epic: 0.001, legendary: 0.0001 }
    },
    lootBox: {
        bronze: { common: 0.7, uncommon: 0.25, rare: 0.05, epic: 0, legendary: 0 },
        silver: { common: 0.4, uncommon: 0.4, rare: 0.15, epic: 0.05, legendary: 0 },
        gold: { common: 0, uncommon: 0.5, rare: 0.3, epic: 0.15, legendary: 0.05 },
        diamond: { common: 0, uncommon: 0, rare: 0.5, epic: 0.35, legendary: 0.15 }
    }
};

// Apply luck modifier
function calculateDrop(baseRate, luckStat) {
    const luckModifier = 1 + (luckStat / 1000);
    return Math.min(baseRate * luckModifier, 1);
}
```

## Crafting System

```javascript
const recipes = {
    "Speed Boots": {
        materials: [
            { item: "Leather", quantity: 5 },
            { item: "Feather", quantity: 3 },
            { item: "Thread", quantity: 10 }
        ],
        cost: {
            BAMBOO: 500,
            craftingTime: 3600 // seconds
        },
        output: {
            item: "Speed Boots",
            rarity: "uncommon",
            successRate: 0.8
        }
    },
    "Dragon Sword": {
        materials: [
            { item: "Dragon Scale", quantity: 1 },
            { item: "Mythril Ore", quantity: 10 },
            { item: "Ancient Rune", quantity: 3 }
        ],
        cost: {
            BAMBOO: 50000,
            ZOO: 100,
            craftingTime: 86400 // 24 hours
        },
        output: {
            item: "Dragon Sword",
            rarity: "legendary",
            successRate: 0.3
        }
    }
};
```

## API Endpoints

```typescript
// Item management
GET /api/v1/items                      // List all items
GET /api/v1/items/:id                  // Get item details
GET /api/v1/inventory/:address         // Get user inventory
POST /api/v1/items/craft              // Craft item
POST /api/v1/items/repair             // Repair item
POST /api/v1/items/upgrade            // Upgrade item

// Loot system
POST /api/v1/loot/open                // Open loot box
GET /api/v1/loot/rates               // Get current drop rates
GET /api/v1/loot/history             // User loot history

// Trading
POST /api/v1/marketplace/list        // List item for sale
POST /api/v1/marketplace/buy         // Buy item
POST /api/v1/marketplace/cancel      // Cancel listing
GET /api/v1/marketplace/listings     // View listings

// Proposals
GET /api/v1/lips                     // List all LIPS
POST /api/v1/lips                    // Create new LIP
POST /api/v1/lips/:id/vote          // Vote on LIP
```

## Smart Contract Interface

```solidity
interface IItemSystem {
    struct Item {
        uint256 id;
        string name;
        ItemCategory category;
        Rarity rarity;
        uint256 stats;
        uint256 durability;
        bool tradeable;
        bool equipped;
    }

    enum ItemCategory { Equipment, Consumable, Material, Special }
    enum Rarity { Common, Uncommon, Rare, Epic, Legendary, Mythic }

    function mintItem(address to, uint256 itemType) external returns (uint256);
    function craftItem(uint256[] memory materials, uint256 recipeId) external;
    function repairItem(uint256 itemId) external payable;
    function upgradeItem(uint256 itemId, uint256[] memory materials) external;
    function equipItem(uint256 animalId, uint256 itemId) external;
    function useConsumable(uint256 itemId, uint256 targetId) external;
}
```

## Database Schema

```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    token_id INTEGER UNIQUE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(20) NOT NULL,
    rarity VARCHAR(20) NOT NULL,
    stats JSONB,
    durability INTEGER,
    max_durability INTEGER,
    owner_address VARCHAR(42),
    equipped_to INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE loot_history (
    id SERIAL PRIMARY KEY,
    user_address VARCHAR(42) NOT NULL,
    source VARCHAR(50) NOT NULL,
    items_received JSONB NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE crafting_queue (
    id SERIAL PRIMARY KEY,
    user_address VARCHAR(42) NOT NULL,
    recipe_id INTEGER NOT NULL,
    materials_consumed JSONB NOT NULL,
    completion_time TIMESTAMP NOT NULL,
    claimed BOOLEAN DEFAULT FALSE
);

CREATE TABLE marketplace_listings (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id),
    seller_address VARCHAR(42) NOT NULL,
    price_bamboo INTEGER,
    price_zoo INTEGER,
    listed_at TIMESTAMP DEFAULT NOW(),
    sold_at TIMESTAMP,
    buyer_address VARCHAR(42),
    status VARCHAR(20) DEFAULT 'active'
);
```

## Integration Example

```javascript
import { LIPSClient } from '@zoo-labs/lips-sdk';
import { ethers } from 'ethers';

const client = new LIPSClient({
    apiUrl: 'https://lips.zoo.game',
    web3Provider: window.ethereum
});

// Open loot box
const loot = await client.openLootBox('gold');
console.log(`Received: ${loot.items.map(i => i.name).join(', ')}`);

// Craft item
const recipe = await client.getRecipe('Speed Boots');
if (await client.hasMaterials(recipe)) {
    const result = await client.craft('Speed Boots');
    if (result.success) {
        console.log('Crafted Speed Boots!');
    }
}

// List item on marketplace
await client.listItem(itemId, {
    priceBamboo: 1000,
    priceZoo: 0
});

// Create proposal for new item
const proposal = await client.createProposal({
    category: 'ITEM',
    title: 'Add Phoenix Feather consumable',
    description: 'Revives animal with full HP',
    itemData: {
        name: 'Phoenix Feather',
        category: 'consumable',
        rarity: 'legendary',
        effect: 'revive',
        value: 1
    }
});
```

## License

Proprietary - Zoo Labs, Inc.