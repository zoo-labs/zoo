# NatSpec Documentation Guidelines

## Key Documentation Conventions

- **Security contact**: All main contracts include `@custom:security-contact security@lux.network`
- **Documentation principle**: Use `@inheritdoc` for interface functions - never duplicate docs

For coding conventions (parameter naming, version suffixes, virtual/override patterns, etc.), see: [Solidity Coding Conventions](./solidity-conventions.md)

## Core Principles

1. **Interface First**: Comprehensive documentation belongs in interfaces
2. **Use @inheritdoc**: Avoid duplicating documentation between interfaces and implementations
3. **Clarity**: Help developers understand contract usage without reading implementation
4. **Consistency**: Follow established patterns for all documentation
5. **No Implementation Details in Interfaces**: Interface documentation should NOT reference implementation specifics
6. **No Usage Assumptions**: Function documentation should not assume how functions are called or what parameter values will be

## Contract Documentation Patterns

### Interfaces

```solidity
 /**
 * @title IContractName
 * @notice High-level one-line description of the interface's purpose
 * @dev Comprehensive explanation of the contract's role in the system.
 *
 * Key features:
 * - Feature 1 with brief explanation
 * - Feature 2 with brief explanation
 *
 * Integration requirements:
 * - Requirement 1 (e.g., "Must be registered as Safe module")
 * - Requirement 2 (e.g., "Requires specific roles for operation")
 *
 * [Additional sections as needed like "Voting mechanics:", "Security model:", etc.]
 */
```

### Implementation Contracts

```solidity
 /**
 * @title ContractNameV1
 * @author Lux Industriesn Inc
 * @notice Implementation of IContractName providing [brief functional description]
 * @dev This contract implements IContractName, providing [what it does].
 *
 * Implementation details:
 * - [Key implementation detail 1]
 * - [Key implementation detail 2]
 * - Integrates with [external contracts/protocols]
 * - [Other technical implementation details]
 *
 * @custom:security-contact security@lux.network
 */
```

### Abstract Contracts

```solidity
 /**
 * @title BaseContract
 * @author Lux Industriesn Inc
 * @notice Abstract base contract for [what it provides]
 * @dev Provides core functionality that concrete implementations extend.
 *
 * Implementation details:
 * - [List key functionality provided]
 * - Must be extended by concrete contracts
 *
 * @custom:security-contact security@lux.network
 */
```

### Standalone Contracts (No Interface)

Include full documentation following the interface pattern since there's no separate interface.

## Function Documentation

### Interface Functions in Implementations

```solidity
/**
 * @inheritdoc IContractName
 */
function someFunction() external;

// With implementation details:
/**
 * @inheritdoc IContractName
 * @dev Implementation uses [specific approach] to achieve [goal].
 * Validates [what] before [action].
 */
```

### New Functions (Not in Interface)

```solidity
 /**
 * @notice [Brief description of what the function does]
 * @dev [Technical details, implementation notes, security considerations]
 * @param paramName_ [Description of parameter and constraints]
 * @return returnName [Description of return value]
 * @custom:throws ErrorName if [condition]
 */
```

## State Variables and Storage

### EIP-7201 Storage Pattern

```solidity
/**
 * @notice Main storage struct for ContractName following EIP-7201
 * @dev Contains all [category] state including [what it stores]
 * @custom:storage-location erc7201:DAO.ContractName.main
 */
struct ContractStorage {
  /** @notice [What this variable tracks/represents] */
  uint256 variable1;
  /** @notice [Purpose of this mapping] */
  mapping(address => uint256) variable2;
}
```

### Storage Getter Functions

```solidity
/**
 * @dev Returns the storage struct for ContractName
 * Following the EIP-7201 namespaced storage pattern to avoid storage collisions
 * @return $ The storage struct for ContractName
 */
function _getContractStorage() internal pure returns (ContractStorage storage $) {
  // implementation
}
```

## Other Documentation Elements

### Events

```solidity
/**
 * @notice Emitted when [action that triggers the event]
 * @param account [Description of what this parameter represents]
 * @param amount [Description including any constraints or special values]
 */
event EventName(address indexed account, uint256 amount);
```

### Errors

```solidity
/** @notice Thrown when [specific condition that causes the error] */
error SimpleError();

/** @notice Thrown when [condition] with [parameter context] */
error ErrorWithContext(address account, uint256 expected, uint256 actual);
```

### Enums

```solidity
/**
 * @notice [What this enum represents]
 * @dev [How the enum is used in the contract]
 *
 * Values:
 * - VALUE1: [What this value means and when it's used]
 * - VALUE2: [What this value means and when it's used]
 */
enum Status {
  VALUE1,
  VALUE2
}
```

For state machine enums, include transition information in the @dev section.

### Modifiers

```solidity
/**
 * @notice [What this modifier ensures/checks]
 * @dev [When this modifier should be used]
 * @custom:throws ErrorName if [condition]
 */
modifier onlyAuthorized() {
    // implementation
}
```

### Constants

```solidity
/** @notice [What this constant represents and how it's used] */
bytes32 public constant CONSTANT_NAME = keccak256("CONSTANT_NAME");
```

## Inline Documentation

For complex functions (>30 lines) or intricate logic, add inline comments:

```solidity
function complexFunction(uint256 param_) external {
  // Step 1: Validate inputs and check preconditions
  require(param_ > 0, 'Invalid param');

  // Calculate weighted average using formula:
  // weightedAvg = (value1 * weight1 + value2 * weight2) / totalWeight
  uint256 weightedAvg = _calculateWeightedAverage();

  // Update state and external interactions
  externalContract.notify(param_);
}
```

## Section Headers

For section headers and code organization patterns, see [Solidity Coding Conventions](./solidity-conventions.md).

## Common Pitfalls to Avoid

1. **Never duplicate interface documentation** - Always use @inheritdoc
2. **Don't use @dev inside enum declarations** - Put it in the header comment
3. **Include @return $** for storage getter functions
4. **Don't document upgradeability in interfaces** - It's an implementation detail
5. **Don't forget IERC165** when documenting supportsInterface
6. **Run tests before documenting** to ensure accuracy
7. **Don't add comments unless asked** - Let NatSpec handle documentation
8. **Never reference implementation in interfaces** - Keep interface docs abstract
9. **Avoid usage assumptions** - Don't assume specific parameter values or calling patterns

## Documentation Workflow

1. **Read interface first** (if exists) to understand the contract's API
2. **Use @inheritdoc** for all interface functions
3. **Document only implementation-specific details** in concrete contracts
4. **Add inline comments** only for complex logic (>30 lines)
5. **Cross-reference with tests** to ensure accuracy

---

[← Back to CLAUDE.md](../../CLAUDE.md) | [Solidity Conventions →](./solidity-conventions.md)
