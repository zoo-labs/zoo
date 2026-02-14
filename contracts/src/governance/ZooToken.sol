// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title ZooToken
 * @notice Governance-enabled ZOO token with voting support
 * @dev Extends the original ZOO token with ERC20Votes for governance
 *
 * Features:
 * - ERC20Votes: Snapshot-based voting power (prevents flash loan attacks)
 * - ERC20Permit: Gasless approvals via signatures
 * - Pausable: Emergency circuit breaker
 * - Delegation: Users must delegate to activate voting power
 *
 * Invariant: Voting power requires explicit delegation (including self-delegation)
 */
contract ZooToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Votes, Pausable, Ownable {
    /// @notice Bridge address for cross-chain minting
    address public bridge;

    /// @notice Timestamp when airdrop was completed
    uint256 public airdropEnd;

    /// @notice Blacklisted addresses
    mapping(address => bool) public blacklisted;

    // ============ Events ============

    event BridgeUpdated(address indexed oldBridge, address indexed newBridge);
    event Blacklisted(address indexed account, bool status);
    event AirdropCompleted(uint256 timestamp);

    // ============ Errors ============

    error AddressBlacklisted(address account);
    error AirdropAlreadyCompleted();
    error InvalidBridgeAddress();
    error OnlyBridge();
    error ArrayLengthMismatch();
    error ZeroAddress();
    error ZeroAmount();

    // ============ Constructor ============

    constructor() ERC20("ZOO", "ZOO") ERC20Permit("ZOO") {}

    // ============ Admin Functions ============

    /**
     * @notice Set bridge address for cross-chain operations
     * @param _bridge New bridge address
     */
    function setBridge(address _bridge) external onlyOwner {
        if (_bridge == address(0)) revert InvalidBridgeAddress();
        emit BridgeUpdated(bridge, _bridge);
        bridge = _bridge;
    }

    /**
     * @notice Add or remove address from blacklist
     * @param account Address to modify
     * @param status True to blacklist, false to remove
     */
    function setBlacklist(address account, bool status) external onlyOwner {
        blacklisted[account] = status;
        emit Blacklisted(account, status);
    }

    /**
     * @notice Pause all transfers
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Mint tokens (only before airdrop completion)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        if (airdropEnd != 0) revert AirdropAlreadyCompleted();
        _mint(to, amount);
    }

    /**
     * @notice Batch airdrop tokens
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to mint
     * @return Number of recipients processed
     */
    function airdrop(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner returns (uint256) {
        if (airdropEnd != 0) revert AirdropAlreadyCompleted();
        if (recipients.length != amounts.length) revert ArrayLengthMismatch();

        for (uint256 i = 0; i < recipients.length; i++) {
            if (recipients[i] == address(0)) revert ZeroAddress();
            if (amounts[i] == 0) revert ZeroAmount();
            _mint(recipients[i], amounts[i]);
        }

        return recipients.length;
    }

    /**
     * @notice Mark airdrop as complete (disables future minting)
     */
    function completeAirdrop() external onlyOwner {
        if (airdropEnd != 0) revert AirdropAlreadyCompleted();
        airdropEnd = block.timestamp;
        emit AirdropCompleted(block.timestamp);
    }

    // ============ Bridge Functions ============

    modifier onlyBridge() {
        if (msg.sender != bridge) revert OnlyBridge();
        _;
    }

    /**
     * @notice Mint tokens via bridge
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function bridgeMint(address to, uint256 amount) external onlyBridge whenNotPaused {
        _mint(to, amount);
    }

    /**
     * @notice Burn tokens via bridge
     * @param account Account to burn from
     * @param amount Amount to burn
     */
    function bridgeBurn(address account, uint256 amount) external onlyBridge whenNotPaused {
        _burn(account, amount);
    }

    // ============ Transfer Overrides ============

    /**
     * @notice Hook called before token transfers
     * @dev Checks blacklist and pause status
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        // Check blacklist
        if (from != address(0) && blacklisted[from]) revert AddressBlacklisted(from);
        if (to != address(0) && blacklisted[to]) revert AddressBlacklisted(to);

        // Check pause only for transfers (not mint/burn)
        if (from != address(0) && to != address(0)) {
            require(!paused(), "Pausable: paused");
        }

        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * @notice Hook called after token transfers
     * @dev Updates voting checkpoints
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * @notice Internal mint implementation
     */
    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    /**
     * @notice Internal burn implementation
     */
    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    // ============ View Functions ============

    /**
     * @notice Check if address is blacklisted
     * @param account Address to check
     */
    function isBlacklisted(address account) external view returns (bool) {
        return blacklisted[account];
    }

    /**
     * @notice Get current voting power
     * @param account Address to check
     * @dev Returns 0 if account hasn't delegated
     */
    function getVotingPower(address account) external view returns (uint256) {
        return getVotes(account);
    }
}
