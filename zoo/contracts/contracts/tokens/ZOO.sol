// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ZOO
 * @dev Base ZOO token - used alongside KEEPER for staking into ZK governance token
 */
contract ZOO is ERC20, Ownable {
    constructor() ERC20("Zoo Token", "ZOO") {
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
     * @dev Burn tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
