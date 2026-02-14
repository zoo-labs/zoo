// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title ZooTimelock
 * @notice Timelock controller for Zoo governance execution
 * @dev Wraps OpenZeppelin TimelockController with Zoo-specific defaults
 *
 * Constraints:
 * - Minimum delay: 1 day (prevents rushed malicious proposals)
 * - Proposers: ZooGovernor contract only
 * - Executors: Open (anyone can execute after timelock)
 * - Admin: Renounced after setup (self-administered)
 */
contract ZooTimelock is TimelockController {
    /// @notice Default minimum delay for proposal execution
    uint256 public constant MIN_DELAY = 1 days;

    /**
     * @notice Deploy timelock with governor as sole proposer
     * @param governor Address of the ZooGovernor contract
     * @dev Executors array contains zero address = anyone can execute
     *      Admin is set to zero address = self-administered only
     */
    constructor(address governor)
        TimelockController(
            MIN_DELAY,
            _proposers(governor),
            _executors(),
            address(0) // No admin - self-administered
        )
    {}

    /**
     * @notice Create proposers array with governor as sole proposer
     */
    function _proposers(address governor) private pure returns (address[] memory) {
        address[] memory proposers = new address[](1);
        proposers[0] = governor;
        return proposers;
    }

    /**
     * @notice Create executors array allowing anyone to execute
     * @dev Zero address in executors = open execution
     */
    function _executors() private pure returns (address[] memory) {
        address[] memory executors = new address[](1);
        executors[0] = address(0);
        return executors;
    }
}
