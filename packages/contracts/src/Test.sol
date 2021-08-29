// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./console.sol";

contract Test {
    constructor() {
        bytes4 burn = bytes4(keccak256('burn(address, uint256)'));
        bytes4 mint = bytes4(keccak256('mint(address, uint256)'));
        console.logBytes4(burn ^ mint);
    }
}
