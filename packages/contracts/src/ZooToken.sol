// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";


contract ZooToken is ERC20, ERC20Burnable, Ownable, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant BLACKLISTED = keccak256("BLACKLISTED");

    constructor () ERC20("Zoo", "ZOO") {  }

    function transfer(address _to, uint256 _value) public override returns (bool) {
        require(hasRole(BLACKLISTED, msg.sender) == false);
        require(hasRole(BLACKLISTED, _to) == false);
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool) {
        require(hasRole(BLACKLISTED, _to) == false);
        require(hasRole(BLACKLISTED, _from) == false);
        return super.transferFrom(_from, _to, _value);
    }

    function mint(address to, uint256 value) public onlyOwner {
        super._mint(to, value);
    }
}
