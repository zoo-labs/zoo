// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/**
 * @title KeeperToken
 * @notice KEEPER governance token for zoo.fund platform
 * @dev ERC20 token with voting capabilities for DAO governance
 * Note: This is separate from the original ZOO token which was airdropped in 2021 and bridged to its own chain in 2024
 */
contract KeeperToken is 
    ERC20, 
    ERC20Burnable, 
    ERC20Snapshot, 
    Ownable, 
    ERC20Permit, 
    ERC20Votes 
{
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    
    // Token distribution for KEEPER
    uint256 public constant COMMUNITY_ALLOCATION = 400_000_000 * 10**18; // 40%
    uint256 public constant TREASURY_ALLOCATION = 250_000_000 * 10**18; // 25%
    uint256 public constant TEAM_ALLOCATION = 150_000_000 * 10**18; // 15%
    uint256 public constant INVESTORS_ALLOCATION = 100_000_000 * 10**18; // 10%
    uint256 public constant LIQUIDITY_ALLOCATION = 100_000_000 * 10**18; // 10%
    
    // Vesting schedules
    mapping(address => VestingSchedule) public vestingSchedules;
    
    // Track ZOO token holders who claimed their KEEPER airdrop
    mapping(address => bool) public hasClaimedAirdrop;
    address public zooToken; // Original ZOO token address for airdrop verification
    
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 startTime;
        uint256 cliffDuration;
        uint256 vestingDuration;
        uint256 releasedAmount;
        bool revocable;
        bool revoked;
    }
    
    event VestingScheduleCreated(
        address indexed beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration
    );
    
    event TokensReleased(address indexed beneficiary, uint256 amount);
    event VestingRevoked(address indexed beneficiary);
    event AirdropClaimed(address indexed claimer, uint256 amount);
    
    constructor(
        address _treasury,
        address _team,
        address _liquidity,
        address _zooToken
    ) 
        ERC20("KEEPER", "KEEPER") 
        ERC20Permit("KEEPER")
    {
        zooToken = _zooToken;
        
        // Mint initial allocations
        _mint(address(this), COMMUNITY_ALLOCATION); // For airdrops and rewards
        _mint(_treasury, TREASURY_ALLOCATION);
        _mint(_liquidity, LIQUIDITY_ALLOCATION);
        
        // Create vesting schedule for team
        _createVestingSchedule(
            _team,
            TEAM_ALLOCATION,
            block.timestamp,
            365 days, // 1 year cliff
            3 * 365 days, // 3 year vesting
            true
        );
    }
    
    /**
     * @notice Claim KEEPER tokens based on ZOO holdings
     * @dev Users who held ZOO tokens can claim KEEPER at 1:1 ratio
     */
    function claimAirdrop() external {
        require(!hasClaimedAirdrop[msg.sender], "Already claimed");
        require(zooToken != address(0), "ZOO token not set");
        
        uint256 zooBalance = IERC20(zooToken).balanceOf(msg.sender);
        require(zooBalance > 0, "No ZOO tokens");
        
        hasClaimedAirdrop[msg.sender] = true;
        
        // Transfer KEEPER at 1:1 ratio with ZOO holdings
        _transfer(address(this), msg.sender, zooBalance);
        
        emit AirdropClaimed(msg.sender, zooBalance);
    }
    
    /**
     * @notice Create a vesting schedule for a beneficiary
     */
    function _createVestingSchedule(
        address _beneficiary,
        uint256 _amount,
        uint256 _startTime,
        uint256 _cliffDuration,
        uint256 _vestingDuration,
        bool _revocable
    ) internal {
        require(_beneficiary != address(0), "Invalid beneficiary");
        require(_amount > 0, "Invalid amount");
        require(vestingSchedules[_beneficiary].totalAmount == 0, "Schedule exists");
        
        vestingSchedules[_beneficiary] = VestingSchedule({
            totalAmount: _amount,
            startTime: _startTime,
            cliffDuration: _cliffDuration,
            vestingDuration: _vestingDuration,
            releasedAmount: 0,
            revocable: _revocable,
            revoked: false
        });
        
        _mint(address(this), _amount);
        
        emit VestingScheduleCreated(
            _beneficiary,
            _amount,
            _startTime,
            _cliffDuration,
            _vestingDuration
        );
    }
    
    /**
     * @notice Create vesting schedule for investors
     */
    function createInvestorVesting(
        address _investor,
        uint256 _amount
    ) external onlyOwner {
        require(_amount <= INVESTORS_ALLOCATION, "Exceeds allocation");
        
        _createVestingSchedule(
            _investor,
            _amount,
            block.timestamp,
            180 days, // 6 month cliff
            2 * 365 days, // 2 year vesting
            true
        );
    }
    
    /**
     * @notice Calculate vested amount for a beneficiary
     */
    function vestedAmount(address _beneficiary) public view returns (uint256) {
        VestingSchedule memory schedule = vestingSchedules[_beneficiary];
        
        if (schedule.revoked) {
            return schedule.releasedAmount;
        }
        
        if (block.timestamp < schedule.startTime + schedule.cliffDuration) {
            return 0;
        }
        
        if (block.timestamp >= schedule.startTime + schedule.vestingDuration) {
            return schedule.totalAmount;
        }
        
        uint256 timeFromStart = block.timestamp - schedule.startTime;
        uint256 vestedAmount = (schedule.totalAmount * timeFromStart) / schedule.vestingDuration;
        
        return vestedAmount;
    }
    
    /**
     * @notice Release vested tokens
     */
    function releaseVestedTokens() external {
        address beneficiary = msg.sender;
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        
        require(schedule.totalAmount > 0, "No vesting schedule");
        require(!schedule.revoked, "Vesting revoked");
        
        uint256 vested = vestedAmount(beneficiary);
        uint256 releasable = vested - schedule.releasedAmount;
        
        require(releasable > 0, "No tokens to release");
        
        schedule.releasedAmount += releasable;
        _transfer(address(this), beneficiary, releasable);
        
        emit TokensReleased(beneficiary, releasable);
    }
    
    /**
     * @notice Revoke vesting schedule
     */
    function revokeVesting(address _beneficiary) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[_beneficiary];
        
        require(schedule.revocable, "Not revocable");
        require(!schedule.revoked, "Already revoked");
        
        uint256 vested = vestedAmount(_beneficiary);
        uint256 releasable = vested - schedule.releasedAmount;
        
        if (releasable > 0) {
            schedule.releasedAmount += releasable;
            _transfer(address(this), _beneficiary, releasable);
        }
        
        uint256 refund = schedule.totalAmount - schedule.releasedAmount;
        if (refund > 0) {
            _transfer(address(this), owner(), refund);
        }
        
        schedule.revoked = true;
        emit VestingRevoked(_beneficiary);
    }
    
    /**
     * @notice Airdrop tokens to multiple addresses
     */
    function airdrop(
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) external onlyOwner {
        require(_recipients.length == _amounts.length, "Length mismatch");
        
        for (uint256 i = 0; i < _recipients.length; i++) {
            _transfer(address(this), _recipients[i], _amounts[i]);
        }
    }
    
    /**
     * @notice Snapshot token balances
     */
    function snapshot() external onlyOwner returns (uint256) {
        return _snapshot();
    }
    
    // Required overrides
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Snapshot) {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }
    
    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        super._mint(to, amount);
    }
    
    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}