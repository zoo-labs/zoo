// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @title ZooDAO
 * @notice DAO governance for zoo.fund platform
 * @dev Decentralized governance model for community-driven funding
 */
contract ZooDAO is 
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    // Project categories for specialized funding pools
    enum ProjectCategory {
        DEFI,
        NFT,
        GAMING,
        INFRASTRUCTURE,
        SOCIAL,
        DAO_TOOLING,
        RESEARCH
    }
    
    // Project funding proposals
    struct FundingProposal {
        address project;
        uint256 amount;
        ProjectCategory category;
        string ipfsHash;
        bool executed;
    }
    
    mapping(uint256 => FundingProposal) public fundingProposals;
    mapping(ProjectCategory => uint256) public categoryAllocations;
    mapping(address => bool) public approvedProjects;
    
    uint256 public totalFundingAllocated;
    uint256 public constant MAX_FUNDING_PER_PROPOSAL = 1000000 ether;
    
    event ProjectFundingProposed(
        uint256 indexed proposalId,
        address indexed project,
        uint256 amount,
        ProjectCategory category
    );
    
    event ProjectFunded(
        address indexed project,
        uint256 amount,
        ProjectCategory category
    );
    
    event CategoryAllocationUpdated(
        ProjectCategory category,
        uint256 newAllocation
    );
    
    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("ZooDAO")
        GovernorSettings(
            1, // 1 block voting delay
            50400, // 1 week voting period (assuming 12s blocks)
            1000000e18 // 1M token proposal threshold
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {}
    
    /**
     * @notice Propose funding for a project
     */
    function proposeFunding(
        address _project,
        uint256 _amount,
        ProjectCategory _category,
        string memory _ipfsHash,
        string memory _description
    ) external returns (uint256) {
        require(_amount <= MAX_FUNDING_PER_PROPOSAL, "Amount exceeds max");
        require(_project != address(0), "Invalid project");
        
        address[] memory targets = new address[](1);
        uint256[] memory values = new uint256[](1);
        bytes[] memory calldatas = new bytes[](1);
        
        targets[0] = address(this);
        values[0] = 0;
        calldatas[0] = abi.encodeWithSignature(
            "executeFunding(address,uint256,uint8,string)",
            _project,
            _amount,
            _category,
            _ipfsHash
        );
        
        uint256 proposalId = propose(targets, values, calldatas, _description);
        
        fundingProposals[proposalId] = FundingProposal({
            project: _project,
            amount: _amount,
            category: _category,
            ipfsHash: _ipfsHash,
            executed: false
        });
        
        emit ProjectFundingProposed(proposalId, _project, _amount, _category);
        
        return proposalId;
    }
    
    /**
     * @notice Execute approved funding
     */
    function executeFunding(
        address _project,
        uint256 _amount,
        ProjectCategory _category,
        string memory _ipfsHash
    ) external onlyGovernance {
        require(!approvedProjects[_project], "Already funded");
        
        approvedProjects[_project] = true;
        totalFundingAllocated += _amount;
        categoryAllocations[_category] += _amount;
        
        // Transfer funds to project
        (bool success, ) = _project.call{value: _amount}("");
        require(success, "Transfer failed");
        
        emit ProjectFunded(_project, _amount, _category);
    }
    
    /**
     * @notice Update category allocation limits
     */
    function updateCategoryAllocation(
        ProjectCategory _category,
        uint256 _newAllocation
    ) external onlyGovernance {
        categoryAllocations[_category] = _newAllocation;
        emit CategoryAllocationUpdated(_category, _newAllocation);
    }
    
    /**
     * @notice Check if a project has been approved for funding
     */
    function isProjectApproved(address _project) external view returns (bool) {
        return approvedProjects[_project];
    }
    
    /**
     * @notice Get funding proposal details
     */
    function getFundingProposal(uint256 _proposalId) 
        external 
        view 
        returns (FundingProposal memory) 
    {
        return fundingProposals[_proposalId];
    }
    
    // Required overrides
    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    )
        public
        override(Governor, IGovernor)
        returns (uint256)
    {
        return super.propose(targets, values, calldatas, description);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    )
        internal
        override(Governor, GovernorTimelockControl)
    {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    )
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint256)
    {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    receive() external payable {}
}