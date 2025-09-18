# HIPS - Habitat Improvement Proposals Service

Habitat-specific governance and improvement system for Zoo ecosystem environments.

## Overview

HIPS (Habitat Improvement Proposals) manages proposals for habitat mechanics, environmental systems, and resource generation within the Zoo gaming ecosystem.

## Proposal Categories

### Environment (HIP-E)
- Climate system updates
- Weather mechanics
- Day/night cycles
- Seasonal events

### Resources (HIP-R)
- BAMBOO generation rates
- Resource distribution
- Harvesting mechanics
- Storage capacities

### Capacity (HIP-C)
- Animal capacity limits
- Habitat expansion rules
- Population density effects
- Migration mechanics

### Features (HIP-F)
- Special habitat abilities
- Unique habitat events
- Cross-habitat interactions
- Habitat-specific items

## Habitat Types

### Jungle 🌴
- **Capacity**: 30 animals
- **Resources**: 150 BAMBOO/day
- **Special**: 10% breeding speed bonus
- **Climate**: Tropical, high humidity

### Arctic ❄️
- **Capacity**: 20 animals
- **Resources**: 100 BAMBOO/day
- **Special**: 15% defense bonus in battles
- **Climate**: Cold, seasonal aurora events

### Desert 🏜️
- **Capacity**: 25 animals
- **Resources**: 120 BAMBOO/day
- **Special**: 20% speed bonus
- **Climate**: Hot days, cold nights

### Ocean 🌊
- **Capacity**: 35 animals
- **Resources**: 130 BAMBOO/day
- **Special**: Healing boost 25%
- **Climate**: Tidal changes, storms

### Sky ☁️
- **Capacity**: 15 animals
- **Resources**: 200 BAMBOO/day
- **Special**: 30% rare item drop rate
- **Climate**: Wind currents, altitude effects

## API Endpoints

### Habitat Management
```typescript
GET /api/v1/habitats                    // List all habitats
GET /api/v1/habitats/:id               // Get habitat details
GET /api/v1/habitats/:id/animals       // List animals in habitat
POST /api/v1/habitats/:id/upgrade      // Upgrade habitat
GET /api/v1/habitats/:id/resources     // Check resource generation
```

### Proposal System
```typescript
GET /api/v1/hips                       // List all HIPS
GET /api/v1/hips/:id                   // Get specific HIP
POST /api/v1/hips                      // Create new HIP
POST /api/v1/hips/:id/vote            // Vote on HIP
GET /api/v1/hips/active               // Active proposals
```

## Smart Contract Interface

```solidity
interface IHabitatGovernance {
    struct Habitat {
        uint256 id;
        HabitatType habitatType;
        uint256 capacity;
        uint256 currentPopulation;
        uint256 resourceRate;
        uint256 level;
        address owner;
    }

    function proposeUpgrade(
        uint256 habitatId,
        bytes memory upgradeData
    ) external returns (uint256 proposalId);

    function voteOnUpgrade(
        uint256 proposalId,
        bool support
    ) external;

    function executeUpgrade(uint256 proposalId) external;

    function claimResources(uint256 habitatId) external;
}
```

## Resource Generation Formula

```javascript
dailyResources = baseRate * (1 + levelBonus) * weatherMultiplier * populationEfficiency

where:
- baseRate: Habitat type base (100-200 BAMBOO)
- levelBonus: 0.1 * habitatLevel
- weatherMultiplier: 0.8 - 1.2 based on conditions
- populationEfficiency:
    - 100% at optimal capacity (50-75%)
    - Decreases if over/under populated
```

## Upgrade System

### Level Requirements
```yaml
Level 1 → 2:
  - Cost: 10,000 BAMBOO
  - Time: 24 hours
  - Benefit: +10% capacity, +15% resources

Level 2 → 3:
  - Cost: 25,000 BAMBOO + 100 ZOO
  - Time: 48 hours
  - Benefit: +20% capacity, +30% resources

Level 3 → 4:
  - Cost: 50,000 BAMBOO + 500 ZOO
  - Time: 72 hours
  - Benefit: +30% capacity, +50% resources

Level 4 → 5 (Max):
  - Cost: 100,000 BAMBOO + 2000 ZOO
  - Time: 7 days
  - Benefit: +50% capacity, +100% resources, special ability
```

## Environmental Events

### Random Events
```javascript
const events = [
    {
        name: "Bamboo Bloom",
        effect: "+50% resources for 24h",
        probability: 0.05,
        habitats: ["jungle", "ocean"]
    },
    {
        name: "Migration Wave",
        effect: "+5 temporary capacity",
        probability: 0.03,
        habitats: ["arctic", "sky"]
    },
    {
        name: "Drought",
        effect: "-30% resources for 12h",
        probability: 0.02,
        habitats: ["desert", "jungle"]
    }
];
```

## Database Schema

```sql
CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    token_id INTEGER UNIQUE,
    habitat_type VARCHAR(20) NOT NULL,
    owner_address VARCHAR(42) NOT NULL,
    level INTEGER DEFAULT 1,
    capacity INTEGER NOT NULL,
    current_population INTEGER DEFAULT 0,
    resource_rate INTEGER NOT NULL,
    last_claim_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE habitat_animals (
    id SERIAL PRIMARY KEY,
    habitat_id INTEGER REFERENCES habitats(id),
    animal_token_id INTEGER NOT NULL,
    placed_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(animal_token_id)
);

CREATE TABLE habitat_proposals (
    id SERIAL PRIMARY KEY,
    hip_number VARCHAR(20) UNIQUE,
    habitat_type VARCHAR(20),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    proposed_changes JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Integration Example

```javascript
import { HIPSClient } from '@zoo-labs/hips-sdk';

const client = new HIPSClient({
    apiUrl: 'https://hips.zoo.game',
    web3Provider: window.ethereum
});

// Get habitat details
const habitat = await client.getHabitat(tokenId);

// Claim resources
const resources = await client.claimResources(tokenId);
console.log(`Claimed ${resources.amount} BAMBOO`);

// Propose habitat improvement
const proposal = await client.createProposal({
    habitatType: 'jungle',
    title: 'Increase Jungle capacity',
    description: 'Jungles should hold 40 animals',
    changes: {
        capacity: { from: 30, to: 40 }
    }
});
```

## License

Proprietary - Zoo Labs, Inc.