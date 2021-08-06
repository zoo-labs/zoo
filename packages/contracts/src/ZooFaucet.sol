// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract ZooFaucet is Ownable {
    uint256 public rate = 1000;

    IERC20 token;

    event ZooSent(
        address indexed _to,
        uint256 indexed _amount
    );

    constructor(address zooAddress) {
        token = IERC20(zooAddress);
    }

    function getZoo(address to, uint256 amount) public returns (uint256) {
        require(amount > 0);
        amount = amount * rate;
        require(amount <= token.balanceOf(address(this)));
        token.transfer(to, amount);
        emit ZooSent(msg.sender, amount);
        return amount;
    }

    function withdraw() public onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }
}
