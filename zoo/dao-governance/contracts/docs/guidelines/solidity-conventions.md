# Solidity Coding Conventions

## File Structure

### License and Pragma

- All contracts start with `// SPDX-License-Identifier: AGPL-3.0`
- Use pragma: `pragma solidity ^0.8.30;`

### Import Organization

Imports are grouped by category:

1. Interface imports from `interfaces/dao/`
2. Internal imports from parent directories
3. External imports (e.g., OpenZeppelin)

Use explicit destructuring with multi-line format for single imports:

```solidity
import { InterfaceName } from 'path/to/interface.sol';
```

## Contract Architecture

### Abstract Contracts

- **Never inherit from**: `IVersion`, `DeploymentBlockInitializable`, `DeploymentBlockNonInitializable`, `InitializerEventEmitter`, `ERC165`
- **No version suffix**: Abstract contracts don't use V1/V2 suffixes in their names
- **Initialization function**:
  - Pattern: `__ContractName_init()` (double underscore prefix)
  - Visibility: `internal`
  - Modifier: `onlyInitializing`
  - Not marked as `virtual` or `override`
  - Add comment: `// solhint-disable-previous-line func-name-mixedcase`

### Concrete Contracts

- **Always inherit from**: `ERC165` and implement `supportsInterface`
- **Version suffix**: Always include V1/V2 suffix in contract and file names
- **Supported interfaces**: Must support their own interface, interfaces of abstract base contracts, and all inherited interfaces
- **Constructor**: Always includes `_disableInitializers()`
- **Initialization**: Use `initialize()` function (not `__init`), marked with `initializer` modifier
- **Version**: Implement `IVersion` interface, return `uint16(1)`

### Interfaces

- **Required for all contracts**: Every contract should have its own interface
- **Exceptions**: When the interface would only contain structs/errors/events (no functions)
- **Return variables**: All functions with returns must have named return variables
- **Parameter naming**: All parameters must end with underscore (`amount_`, `user_`, etc.)

## Storage Patterns

### Namespaced Storage (EIP-7201)

- **Always use namespaced storage** for state variables (upgradeability safety)
- **Never use** normal slot-based storage
- **Pattern**: Define storage struct and getter function as shown in NatSpec docs

## Function Patterns

### Virtual/Override Rules

- **Mark as `virtual`**: All functions except:
  - Abstract contract's `__ContractName_init()` functions
  - Storage getter functions (`_get{ContractName}Storage()`)
  - Pure utility functions that should never be overridden
- **Mark as `override`**: All functions that:
  - Override a base contract function
  - Implement an interface function
  - (Except: abstract contract's `__ContractName_init()` and internal helper functions that don't override anything)

### Parameter and Return Conventions

- **Parameters**: Always suffix with underscore in both interfaces and implementations
- **Returns in interfaces**: Must be named (e.g., `returns (uint256 balance)`)
- **Returns in implementations**: Must NOT be named - explicitly instantiate and return in function body

Example:

```solidity
// Interface
function getBalance(address user_) external view virtual returns (uint256 balance);

// Implementation
function getBalance(address user_) external view virtual override returns (uint256) {
  uint256 result = balances[user_];
  return result;
}
```

## Code Organization

### Contract Structure Pattern

Contracts are organized into major sections using 70-character wide block headers:

```solidity

// ======================================================================
// STATE VARIABLES
// ======================================================================

// Contract state variables here

// ======================================================================
// MODIFIERS
// ======================================================================

// Modifier definitions here

// ======================================================================
// CONSTRUCTOR & INITIALIZERS
// ======================================================================

// Constructor and initialize functions

// ======================================================================
// IContractName (Interface Implementation)
// ======================================================================

// Functions implementing IContractName interface

// ======================================================================
// BaseContractName (Overriding base contract functions)
// ======================================================================

// Functions overriding BaseContractName's virtual functions

// ======================================================================
// INTERNAL HELPERS
// ======================================================================

// Internal helper functions
```

### Section Ordering

#### Interface Files

Use single-line section headers (`// --- Section Name ---`) in this order:

1. `// --- Errors ---`
2. `// --- Structs ---`
3. `// --- Enums ---`
4. `// --- Events ---`
5. `// --- Initializer Functions ---`
6. `// --- Pure Functions ---`
7. `// --- View Functions ---`
8. `// --- State-Changing Functions ---`

#### Contract Implementation Files

**Main sections** use 70-character block headers in this order:

1. **STATE VARIABLES** - All contract state, including storage structs
2. **MODIFIERS** - Access control and validation modifiers
3. **CONSTRUCTOR & INITIALIZERS** - Constructor and initialization functions
4. **[Interface/Contract Name]** - One section per implemented interface or inherited contract
5. **INTERNAL HELPERS** - Private/internal utility functions

**Important**: A contract typically has multiple interface/contract implementation sections. For example:

- One section for `IMyContract` (the contract's own interface)
- One section for `BaseContractA` (if overriding functions from an abstract base)
- One section for `BaseContractB` (if inheriting from multiple bases)
- etc.

Each section groups functions based on WHERE they come from, not just what they do.

**Within each interface/contract implementation section**, use single-line headers for function visibility:

- `// --- Pure Functions ---`
- `// --- View Functions ---`
- `// --- State-Changing Functions ---`

Note: In implementation sections, we only organize functions by visibility since we're implementing interface functions, not redefining the interface's structs/errors/events.

## Implementation Patterns

### Storage Getter Functions

- Return variable must be named `$`
- Example: `returns (ContractStorage storage $)`
- Function name pattern: `_get{ContractName}Storage()`
- Assembly usage requires: `// solhint-disable-next-line no-inline-assembly`
- **Never mark as `virtual`**: These functions return storage at fixed locations that must remain consistent
- Always marked as `internal pure`

### Security Patterns

- External calls should be made last to prevent reentrancy
- Follow checks-effects-interactions pattern
- Validation at start of functions
- State changes before external calls
- Early returns for invalid states

### Upgradeability

- Some concrete contracts use UUPS upgradeable pattern with owner-restricted upgrades
- Abstract contracts provide base functionality but don't implement upgradeability

## Inheritance Patterns

### ERC165 Support

All concrete contracts must:

1. Inherit from `ERC165`
2. Override `supportsInterface`
3. Return `true` for:
   - Their own interface ID
   - All abstract base contract interface IDs
   - All other inherited interface IDs
   - `IERC165` interface ID via `super.supportsInterface()`

### Interface Implementation

- Contracts inherit from their interface
- Use `@inheritdoc` for all interface function documentation
- Never duplicate documentation between interface and implementation
- Inheritance order: interfaces first, then abstract contracts, then concrete contracts
- ERC165 typically last in inheritance list

## Naming Conventions

### Constants

- Use UPPER_SNAKE_CASE
- Storage slot constants: `{CONTRACT_NAME}_STORAGE_LOCATION`
- Always specify visibility (`internal` or `public`)

### Events

- Past tense naming (e.g., `ProposalCreated`, `VoteRecorded`)
- Indexed parameters for key fields (addresses, IDs)

### Errors

- PascalCase naming
- No error messages in `require` statements - use custom errors instead
- Define errors at interface level

### Modifiers

- Define after state variables, before constructor
- Access control modifiers check first
- Custom errors thrown in modifiers

## Gas Optimization Patterns

### Loop Optimization

```solidity
unchecked {
    ++i;
}
```

### Storage Access

- Use storage pointers for repeated access
- Minimize storage reads in loops
- Pre-compute constants (e.g., keccak256 hashes)

## Event Patterns

- Emit events at end of state-changing functions
- Include all relevant state changes
- Use indexed parameters for filterable fields

## Error Handling

- Custom errors over require messages
- Errors defined in interfaces
- Specific error names that describe the condition

---

[← NatSpec Documentation](./natspec-documentation.md) | [Back to CLAUDE.md](../../CLAUDE.md)
