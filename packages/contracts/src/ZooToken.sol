// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ZooToken is ERC20, ERC20Burnable, Ownable {
    using SafeERC20 for IERC20;

    constructor () ERC20("Zoo", "ZOO") {  }

    function mint(address to, uint256 value) public onlyOwner {
        super._mint(to, value);
    }
}
