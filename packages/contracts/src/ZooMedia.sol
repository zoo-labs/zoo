// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import { Media } from "./Media.sol";

contract ZooMedia is Media, Ownable {
    constructor(string memory symbol, string memory name, address marketAddress) Media(symbol, name, marketAddress) { }

    // Should take drop configuration and add animals to ZOO
    function addDrop() public onlyOwner returns (bool) {
        // Enable new drop to mint it's set of animals
    }
}
