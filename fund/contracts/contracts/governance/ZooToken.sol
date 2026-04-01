// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ZooToken
 * @dev Simple governance token for Zoo DAOs
 * Anyone holding this token can create proposals (minimum 1 ZOO)
 */
contract ZooToken is ERC20, ERC20Votes, Ownable {
    uint256 public constant MIN_PROPOSAL_THRESHOLD = 1 ether; // 1 ZOO to create proposal

    constructor() ERC20("Zoo Token", "ZOO") ERC20Permit("Zoo Token") Ownable(msg.sender) {
        // Mint 1 billion tokens to deployer
        _mint(msg.sender, 1_000_000_000 ether);
    }

    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Check if address can create proposals
     */
    function canCreateProposal(address account) external view returns (bool) {
        return balanceOf(account) >= MIN_PROPOSAL_THRESHOLD;
    }

    // Required overrides for ERC20Votes
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._update(from, to, amount);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
