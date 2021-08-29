// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./console.log";

contract Test {
    constructor() {
        bytes4 burn = Hash(bytes4(keccak256('burn(address, uint256)')));
        bytes4 mint = Hash(bytes4(keccak256('mint(address, uint256)')));
        console.log(burn ^ mint);
    }
}
