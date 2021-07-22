// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import { Market } from "./Market.sol";
import { AuctionHouse } from "./AuctionHouse.sol";

contract ZooAuction is AuctionHouse, Ownable {
    constructor(address _zoo, address _weth) AuctionHouse(_zoo, _weth) { }
}
