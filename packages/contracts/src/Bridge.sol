// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IERC20Burnable } from "./interfaces/IERC20Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {

    IERC20Burnable public token;
    event Mint(address to, uint256 amount);
    event Burn(address from, uint256 amount);
    event Swap(address from, address to, uint256 amount, string chainID);

    constructor(address tokenAddress) {
        token = IERC20Burnable(tokenAddress);
    }

    function getChainID() external view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    function swap(address _from, address _to, uint256 _amount, string memory _chainID) public onlyOwner {
        require(_from != address(0));
        require(_to != address(0));
        require(_amount > 0);
        require(keccak256(abi.encodePacked(_chainID)) == keccak256(abi.encodePacked(_chainID)));
        burn(_from, _amount);
        emit Swap(_from, _to, _amount, _chainID);
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
