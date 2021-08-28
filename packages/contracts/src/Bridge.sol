// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IERC20Burnable } from "./interfaces/IERC20Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {

    IERC20Burnable public token;
    event Mint(address _to, uint256 _amount);
    event Burn(address _from, uint256 _amount);
    event Swap(address _from, address _to, uint256 _amount, string _chain);

    constructor(address tokenAddress) {
        token = IERC20Burnable(tokenAddress);
    }

    function swap(address _from, address _to, uint256 _amount, string memory _chain) public onlyOwner {
        require(_from != address(0));
        require(_to != address(0));
        require(_amount > 0);
        require(keccak256(abi.encodePacked(_chain)) == keccak256(abi.encodePacked(_chain)));

        burn(_from, _amount);
        emit Swap(_from, _to, _amount, _chain);
    }

    function burn(address _from, uint256 _amount) public onlyOwner {
        require(_from != address(0));
        require(_amount > 0);
        token.burnFrom(_from, _amount);
        emit Burn(_from, _amount);
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        require(_to != address(0));
        require(_amount > 0);
        token.mint(_to, _amount);
        emit Mint(_to, _amount);
    }
}
