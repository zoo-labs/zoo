// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ZKStaking
 * @dev Stake ZOO + KEEPER (1:1) to receive ZK governance tokens
 * Longer lock periods = more ZK tokens (governance power multiplier up to 10x)
 * ZK tokens are burned when unstaking, making total supply deflationary
 * Rewards from DAO treasury (not implemented here - separate system)
 */
contract ZKStaking is ERC20, ERC20Votes, ReentrancyGuard, Ownable {
    IERC20 public immutable zooToken;
    IERC20 public immutable keeperToken;

    uint256 public constant MIN_STAKE_AMOUNT = 1 ether; // 1 ZOO + 1 KEEPER minimum
    uint256 public constant MAX_LOCK_DURATION = 10 * 365 days; // 10 years max

    struct StakeInfo {
        uint256 amount;          // Amount of ZOO + KEEPER staked (1:1)
        uint256 zkAmount;        // Amount of ZK tokens minted (with time bonus)
        uint256 lockDuration;    // Lock duration in seconds
        uint256 unlockTime;      // When tokens can be unstaked
        uint256 stakedAt;        // When stake was created
    }

    mapping(address => StakeInfo[]) public stakes;
    mapping(address => uint256) public totalStaked;

    event Staked(
        address indexed user,
        uint256 stakeId,
        uint256 amount,
        uint256 zkAmount,
        uint256 lockDuration,
        uint256 unlockTime
    );

    event Unstaked(
        address indexed user,
        uint256 stakeId,
        uint256 amount
    );

    constructor(
        address _zooToken,
        address _keeperToken
    ) ERC20("Zoo Keeper Governance", "ZK") ERC20Permit("Zoo Keeper Governance") {
        zooToken = IERC20(_zooToken);
        keeperToken = IERC20(_keeperToken);
    }

    /**
     * @dev Calculate time bonus multiplier (1x to 10x based on lock duration)
     * - 0 days: 1x multiplier (no bonus)
     * - 1 year: 1.9x multiplier
     * - 2 years: 2.8x multiplier
     * - 5 years: 5.5x multiplier
     * - 10 years: 10x multiplier (MAXIMUM!)
     */
    function calculateTimeBonus(uint256 lockDuration) public pure returns (uint256) {
        if (lockDuration == 0) return 100; // 1x (100%)
        if (lockDuration >= MAX_LOCK_DURATION) return 1000; // 10x (1000%)

        // Linear interpolation: 100% + (900% * lockDuration / MAX_LOCK_DURATION)
        uint256 bonus = 100 + (900 * lockDuration / MAX_LOCK_DURATION);
        return bonus;
    }

    /**
     * @dev Stake ZOO + KEEPER tokens to receive ZK governance tokens
     * @param amount Amount of ZOO + KEEPER to stake (1:1 ratio)
     * @param lockDuration Duration to lock tokens (0 to 10 years)
     */
    function stake(uint256 amount, uint256 lockDuration) external nonReentrant {
        require(amount >= MIN_STAKE_AMOUNT, "Amount below minimum");
        require(lockDuration <= MAX_LOCK_DURATION, "Lock duration too long");

        // Transfer ZOO and KEEPER tokens
        require(zooToken.transferFrom(msg.sender, address(this), amount), "ZOO transfer failed");
        require(keeperToken.transferFrom(msg.sender, address(this), amount), "KEEPER transfer failed");

        // Calculate ZK amount with time bonus
        uint256 timeBonus = calculateTimeBonus(lockDuration);
        uint256 zkAmount = (amount * timeBonus) / 100;

        // Create stake record
        uint256 unlockTime = lockDuration > 0 ? block.timestamp + lockDuration : 0;

        stakes[msg.sender].push(StakeInfo({
            amount: amount,
            zkAmount: zkAmount,
            lockDuration: lockDuration,
            unlockTime: unlockTime,
            stakedAt: block.timestamp
        }));

        totalStaked[msg.sender] += amount;

        // Mint ZK tokens (voting power)
        _mint(msg.sender, zkAmount);

        // Auto-delegate to self
        delegate(msg.sender);

        emit Staked(msg.sender, stakes[msg.sender].length - 1, amount, zkAmount, lockDuration, unlockTime);
    }

    /**
     * @dev Unstake tokens (only after lock period)
     */
    function unstake(uint256 stakeId) external nonReentrant {
        require(stakeId < stakes[msg.sender].length, "Invalid stake ID");

        StakeInfo memory stakeInfo = stakes[msg.sender][stakeId];

        // Check if lock period has passed
        if (stakeInfo.unlockTime > 0) {
            require(block.timestamp >= stakeInfo.unlockTime, "Tokens still locked");
        }

        // Burn ZK tokens (remove voting power) - this makes ZK supply deflationary
        _burn(msg.sender, stakeInfo.zkAmount);

        // Return ZOO and KEEPER tokens
        require(zooToken.transfer(msg.sender, stakeInfo.amount), "ZOO transfer failed");
        require(keeperToken.transfer(msg.sender, stakeInfo.amount), "KEEPER transfer failed");

        totalStaked[msg.sender] -= stakeInfo.amount;

        // Remove stake (swap with last and pop)
        uint256 lastIndex = stakes[msg.sender].length - 1;
        if (stakeId != lastIndex) {
            stakes[msg.sender][stakeId] = stakes[msg.sender][lastIndex];
        }
        stakes[msg.sender].pop();

        emit Unstaked(msg.sender, stakeId, stakeInfo.amount);
    }

    /**
     * @dev Get all stakes for a user
     */
    function getUserStakes(address user) external view returns (StakeInfo[] memory) {
        return stakes[user];
    }

    /**
     * @dev Get total voting power (ZK balance) for a user
     */
    function getVotingPower(address user) external view returns (uint256) {
        return balanceOf(user);
    }

    /**
     * @dev Check if user can create proposals (minimum 1 ZK)
     */
    function canCreateProposal(address user) external view returns (bool) {
        return balanceOf(user) >= 1 ether;
    }

    // Required overrides for ERC20Votes
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
