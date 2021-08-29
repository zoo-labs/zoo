// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IZoo } from "./IZoo.sol";

interface Swappable {
    function swap(uint chainID, address _to, uint256 _amount) external;
}
