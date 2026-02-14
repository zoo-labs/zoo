// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/governance/utils/IVotes.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title ZooGovernor
 * @notice On-chain governance for Zoo DAO
 * @dev Implements OpenZeppelin Governor with:
 *      - 4% quorum (of total supply at proposal snapshot)
 *      - 1 day voting delay (time to acquire tokens/delegate)
 *      - 1 week voting period
 *      - Token-weighted voting (1 token = 1 vote)
 *      - Timelock execution (1 day delay after passing)
 *
 * Invariants:
 * - Proposals require quorum to pass (prevents 1-vote attacks)
 * - Voting power is snapshot at proposal creation (prevents flash loans)
 * - All execution goes through timelock (allows emergency response)
 */
contract ZooGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    /// @notice Quorum percentage (4% of total supply)
    uint256 public constant QUORUM_PERCENTAGE = 4;

    /// @notice Voting delay in blocks (~1 day at 12s/block)
    uint256 public constant VOTING_DELAY_BLOCKS = 7200;

    /// @notice Voting period in blocks (~1 week at 12s/block)
    uint256 public constant VOTING_PERIOD_BLOCKS = 50400;

    /// @notice Proposal threshold (tokens needed to create proposal)
    uint256 public constant PROPOSAL_THRESHOLD_TOKENS = 0;

    /**
     * @notice Deploy ZooGovernor
     * @param token ERC20Votes token for voting power
     * @param timelock TimelockController for execution
     */
    constructor(IVotes token, TimelockController timelock)
        Governor("ZooGovernor")
        GovernorSettings(
            VOTING_DELAY_BLOCKS,  // 1 day delay
            VOTING_PERIOD_BLOCKS, // 1 week voting
            PROPOSAL_THRESHOLD_TOKENS
        )
        GovernorVotes(token)
        GovernorVotesQuorumFraction(QUORUM_PERCENTAGE)
        GovernorTimelockControl(timelock)
    {}

    // ============ Required Overrides ============

    /**
     * @notice Minimum votes needed for proposal creation
     */
    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    /**
     * @notice Voting delay before voting starts
     */
    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    /**
     * @notice Duration of voting period
     */
    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    /**
     * @notice Current quorum requirement
     * @param blockNumber Block number to check quorum for
     */
    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    /**
     * @notice Current state of a proposal
     * @param proposalId Proposal to check
     */
    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    /**
     * @notice Internal propose implementation
     */
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

    /**
     * @notice Execute a passed proposal
     */
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

    /**
     * @notice Cancel a proposal
     */
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

    /**
     * @notice Executor address (timelock)
     */
    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    /**
     * @notice Check if contract supports an interface
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
