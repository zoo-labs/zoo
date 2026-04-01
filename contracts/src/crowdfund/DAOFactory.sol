// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./CrowdfundProject.sol";
import "./interfaces/IDAOFactory.sol";

/**
 * @title DAOFactory
 * @notice Factory contract for creating and managing DAOs and crowdfunding projects on zoo.fund
 * @dev Implements decentralized community funding and governance mechanisms
 */
contract DAOFactory is Ownable, ReentrancyGuard, IDAOFactory {
    // State variables
    address[] public projects;
    mapping(address => bool) public isProject;
    mapping(address => address[]) public userProjects;
    mapping(string => address) public projectBySlug;
    
    uint256 public platformFee = 250; // 2.5% in basis points
    uint256 public constant MAX_FEE = 1000; // 10% max fee
    address public treasury;
    
    // Events
    event ProjectCreated(
        address indexed projectAddress,
        address indexed creator,
        string name,
        string slug,
        uint256 fundingGoal,
        uint256 deadline
    );
    
    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event TreasuryUpdated(address oldTreasury, address newTreasury);
    
    constructor(address _treasury) {
        require(_treasury != address(0), "Invalid treasury address");
        treasury = _treasury;
    }
    
    /**
     * @notice Create a new crowdfunding project
     * @param _name Project name
     * @param _slug Unique project identifier
     * @param _description Project description
     * @param _fundingGoal Funding goal in wei
     * @param _deadline Funding deadline timestamp
     * @param _ipfsHash IPFS hash for project metadata
     */
    function createProject(
        string memory _name,
        string memory _slug,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _deadline,
        string memory _ipfsHash
    ) external nonReentrant returns (address) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_slug).length > 0, "Slug required");
        require(projectBySlug[_slug] == address(0), "Slug already exists");
        require(_fundingGoal > 0, "Invalid funding goal");
        require(_deadline > block.timestamp, "Invalid deadline");
        
        CrowdfundProject newProject = new CrowdfundProject(
            _name,
            _description,
            _fundingGoal,
            _deadline,
            msg.sender,
            treasury,
            platformFee,
            _ipfsHash
        );
        
        address projectAddress = address(newProject);
        projects.push(projectAddress);
        isProject[projectAddress] = true;
        userProjects[msg.sender].push(projectAddress);
        projectBySlug[_slug] = projectAddress;
        
        emit ProjectCreated(
            projectAddress,
            msg.sender,
            _name,
            _slug,
            _fundingGoal,
            _deadline
        );
        
        return projectAddress;
    }
    
    /**
     * @notice Get all projects
     */
    function getAllProjects() external view returns (address[] memory) {
        return projects;
    }
    
    /**
     * @notice Get projects by creator
     */
    function getProjectsByCreator(address _creator) external view returns (address[] memory) {
        return userProjects[_creator];
    }
    
    /**
     * @notice Get total number of projects
     */
    function getProjectCount() external view returns (uint256) {
        return projects.length;
    }
    
    /**
     * @notice Update platform fee
     * @param _newFee New fee in basis points
     */
    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_FEE, "Fee too high");
        uint256 oldFee = platformFee;
        platformFee = _newFee;
        emit PlatformFeeUpdated(oldFee, _newFee);
    }
    
    /**
     * @notice Update treasury address
     * @param _newTreasury New treasury address
     */
    function updateTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid treasury");
        address oldTreasury = treasury;
        treasury = _newTreasury;
        emit TreasuryUpdated(oldTreasury, _newTreasury);
    }
}