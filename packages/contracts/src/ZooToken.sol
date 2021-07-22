// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ZooToken is ERC20, ERC20Burnable, Ownable {
    constructor () ERC20("ZooToken", "ZOO") { }

    function mint(address to, uint256 value) public onlyOwner {
        super._mint(to, value);
    }
}
