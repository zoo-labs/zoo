// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/ICrowdfundProject.sol";

/**
 * @title CrowdfundProject
 * @notice Individual crowdfunding project contract
 * @dev Implements funding rounds, milestones, and governance features
 */
contract CrowdfundProject is ReentrancyGuard, ICrowdfundProject {
    using SafeERC20 for IERC20;
    
    // Project details
    string public name;
    string public description;
    string public ipfsHash;
    address public creator;
    uint256 public fundingGoal;
    uint256 public deadline;
    uint256 public totalRaised;
    bool public fundingComplete;
    bool public projectCancelled;
    
    // Platform settings
    address public treasury;
    uint256 public platformFee;
    
    // Contributor tracking
    mapping(address => uint256) public contributions;
    address[] public contributors;
    mapping(address => bool) public hasContributed;
    
    // Milestone tracking
    Milestone[] public milestones;
    mapping(uint256 => mapping(address => bool)) public milestoneVotes;
    mapping(uint256 => uint256) public milestoneVoteCount;
    
    // Events
    event ContributionReceived(address indexed contributor, uint256 amount, uint256 totalRaised);
    event FundingComplete(uint256 totalRaised);
    event RefundIssued(address indexed contributor, uint256 amount);
    event MilestoneAdded(uint256 indexed milestoneId, string description, uint256 releaseAmount);
    event MilestoneCompleted(uint256 indexed milestoneId);
    event MilestoneVote(uint256 indexed milestoneId, address indexed voter);
    event ProjectCancelled();
    event FundsWithdrawn(uint256 amount, uint256 fee);
    
    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator");
        _;
    }
    
    modifier beforeDeadline() {
        require(block.timestamp < deadline, "Deadline passed");
        _;
    }
    
    modifier afterDeadline() {
        require(block.timestamp >= deadline, "Deadline not reached");
        _;
    }
    
    constructor(
        string memory _name,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _deadline,
        address _creator,
        address _treasury,
        uint256 _platformFee,
        string memory _ipfsHash
    ) {
        name = _name;
        description = _description;
        fundingGoal = _fundingGoal;
        deadline = _deadline;
        creator = _creator;
        treasury = _treasury;
        platformFee = _platformFee;
        ipfsHash = _ipfsHash;
    }
    
    /**
     * @notice Contribute ETH to the project
     */
    function contribute() external payable beforeDeadline nonReentrant {
        require(!projectCancelled, "Project cancelled");
        require(msg.value > 0, "Invalid contribution");
        
        if (!hasContributed[msg.sender]) {
            contributors.push(msg.sender);
            hasContributed[msg.sender] = true;
        }
        
        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;
        
        emit ContributionReceived(msg.sender, msg.value, totalRaised);
        
        if (totalRaised >= fundingGoal && !fundingComplete) {
            fundingComplete = true;
            emit FundingComplete(totalRaised);
        }
    }
    
    /**
     * @notice Contribute ERC20 tokens to the project
     */
    function contributeToken(address _token, uint256 _amount) external beforeDeadline nonReentrant {
        require(!projectCancelled, "Project cancelled");
        require(_amount > 0, "Invalid amount");
        
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        
        if (!hasContributed[msg.sender]) {
            contributors.push(msg.sender);
            hasContributed[msg.sender] = true;
        }
        
        // Store token contributions separately if needed
        // For simplicity, we're tracking ETH value equivalent
        contributions[msg.sender] += _amount;
        totalRaised += _amount;
        
        emit ContributionReceived(msg.sender, _amount, totalRaised);
        
        if (totalRaised >= fundingGoal && !fundingComplete) {
            fundingComplete = true;
            emit FundingComplete(totalRaised);
        }
    }
    
    /**
     * @notice Add a milestone to the project
     */
    function addMilestone(
        string memory _description,
        uint256 _releaseAmount,
        uint256 _deadline
    ) external onlyCreator {
        require(_releaseAmount > 0, "Invalid release amount");
        require(_deadline > block.timestamp, "Invalid deadline");
        
        milestones.push(Milestone({
            description: _description,
            releaseAmount: _releaseAmount,
            deadline: _deadline,
            completed: false,
            fundsReleased: false
        }));
        
        emit MilestoneAdded(milestones.length - 1, _description, _releaseAmount);
    }
    
    /**
     * @notice Vote to approve a milestone completion
     */
    function voteMilestone(uint256 _milestoneId) external {
        require(hasContributed[msg.sender], "Not a contributor");
        require(_milestoneId < milestones.length, "Invalid milestone");
        require(!milestones[_milestoneId].completed, "Already completed");
        require(!milestoneVotes[_milestoneId][msg.sender], "Already voted");
        
        milestoneVotes[_milestoneId][msg.sender] = true;
        milestoneVoteCount[_milestoneId]++;
        
        emit MilestoneVote(_milestoneId, msg.sender);
        
        // Auto-complete if majority votes (>50% of contributors)
        if (milestoneVoteCount[_milestoneId] > contributors.length / 2) {
            milestones[_milestoneId].completed = true;
            emit MilestoneCompleted(_milestoneId);
        }
    }
    
    /**
     * @notice Withdraw funds after successful funding
     */
    function withdrawFunds() external onlyCreator afterDeadline nonReentrant {
        require(fundingComplete, "Funding goal not met");
        require(!projectCancelled, "Project cancelled");
        require(totalRaised > 0, "No funds to withdraw");
        
        uint256 fee = (totalRaised * platformFee) / 10000;
        uint256 creatorAmount = totalRaised - fee;
        
        totalRaised = 0;
        
        if (fee > 0) {
            (bool feeSuccess, ) = treasury.call{value: fee}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        (bool success, ) = creator.call{value: creatorAmount}("");
        require(success, "Creator transfer failed");
        
        emit FundsWithdrawn(creatorAmount, fee);
    }
    
    /**
     * @notice Request refund if funding goal not met
     */
    function refund() external afterDeadline nonReentrant {
        require(!fundingComplete || projectCancelled, "Funding successful");
        require(contributions[msg.sender] > 0, "No contribution");
        
        uint256 amount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");
        
        emit RefundIssued(msg.sender, amount);
    }
    
    /**
     * @notice Cancel the project (only before funding complete)
     */
    function cancelProject() external onlyCreator {
        require(!fundingComplete, "Cannot cancel after funding");
        projectCancelled = true;
        emit ProjectCancelled();
    }
    
    /**
     * @notice Get project details
     */
    function getProjectDetails() external view returns (
        string memory,
        string memory,
        address,
        uint256,
        uint256,
        uint256,
        bool,
        bool
    ) {
        return (
            name,
            description,
            creator,
            fundingGoal,
            deadline,
            totalRaised,
            fundingComplete,
            projectCancelled
        );
    }
    
    /**
     * @notice Get contributor count
     */
    function getContributorCount() external view returns (uint256) {
        return contributors.length;
    }
    
    /**
     * @notice Get milestone count
     */
    function getMilestoneCount() external view returns (uint256) {
        return milestones.length;
    }
    
    /**
     * @notice Get all contributors
     */
    function getContributors() external view returns (address[] memory) {
        return contributors;
    }
}